import React, { useState , useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, Button, Alert, ActivityIndicator } from 'react-native';
import PhotosService from './PhotosService';
import Photo from './Photo';
import * as Utils from './utils';

function PhotosList( props ) {
    //State variables
    const [ photos, setPhotos ] = useState( undefined );
    const [ shuffledPhotos, setShuffledPhotos ] = useState( undefined );

    // useMemo will save a memoized copy of the function for re-use, 
    // instead of creating a new function each time    
    const photosService = useMemo(
        () => new PhotosService(), 
        []
    );

    useEffect(
        () => {       
            photosService.getPhotos()
                .then( response => response.json() )
                .then( responseJson => {
                    setPhotos(responseJson);
                    setShuffledPhotos(responseJson);
                })
                .catch( (error) => {
                    console.error(error);
                });      
        },
        [photosService]
    );

    const styles = StyleSheet.create({
        header: {
            fontWeight: 'bold', 
            height: 36, 
            lineHeight: 36, 
            textAlign: 'center', 
            borderWidth: 1, 
            borderColor: 'black',
        },

        viewLayout: {
            // flex: 1,
            // flexDirection: 'row',
            // justifyContent: 'center'
        },

        /*
        button: {
          backgroundColor: '#000033',
        }
        */
    });
    
    const onPressHandler = useCallback(
        () => {
            //console.log("onPressHandler");
            const temp = Utils.shuffle( photos );
            setShuffledPhotos( temp );        
        },
        [photos]
    );

    const keyExtractorHandler = useCallback(
        (item) => {
            //console.log("keyExtractorHandler");
            return item.id.toString();            
        },
        []
    );
    
    const renderItemHandler = useCallback(
        ({item}) => {
            //console.log("renderItemHandler");
            return ( 
              <Photo item={ item } />
            );  
        },
        []
    );

    return (
        <View style={ styles.viewLayout }>
            { shuffledPhotos === undefined ?
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View> :    
                <View>
                    <Text style={ styles.header }>
                        Photos from Typicode API call
                    </Text>               

                    <FlatList
                        data={ shuffledPhotos }
                        renderItem={ renderItemHandler }
                        keyExtractor={ keyExtractorHandler }
                        horizontal={ true }
                        // pagingEnabled={ true }
                        initialNumToRender={ 5 }
                    />        
                    
                    <Button
                        title="Re-order photos"
                        onPress={ onPressHandler }
                    />                   
                </View>
            }
        </View>
    );
}

export default PhotosList;
