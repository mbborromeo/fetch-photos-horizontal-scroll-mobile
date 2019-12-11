import React, { useState , useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, Button, Alert, ActivityIndicator, Dimensions } from 'react-native';
import PhotosService from './PhotosService';
import * as Utils from './utils';

function PhotosList( props ) {
    //State variables
    const [ photos, setPhotos ] = useState( undefined );
    const [ shuffledPhotos, setShuffledPhotos ] = useState( undefined );
    const {width} = Dimensions.get('window'); // https://cmichel.io/how-to-get-the-size-of-a-react-native-view-dynamically
    
    // useMemo will save a memoized copy of the function for re-use, instead of creating a new function each time    
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

        imageContainer: {
            width: width, // 375, don't want to hardcode this
            height: 'auto',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around', // main-axis
            alignItems: 'center', // cross-axis
        },
      
        imageBackground: { // positioned absolute by default, so ignores border properties
            width: '100%', 
            height: 'auto', 
            resizeMode: 'contain',
            aspectRatio: 1, 
            flex: 1,
            justifyContent: 'center',
            shadowColor: 'black',
            shadowOffset: { width:0, height:3 },
            shadowOpacity: 1,
            shadowRadius: 2,        
        },

        innerImage: { // needed to override border properties of imageBackground
            borderRadius: 16, 
            borderColor: 'black', 
            borderWidth: 1,
        },

        titleWrapper: {
            marginTop: 'auto',
            marginBottom: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
        },

        title: {
            fontSize: 24,
            color: 'black',
            backgroundColor: 'white',
            opacity: 0.7,
            padding: 16,
            borderColor: 'grey',
            borderWidth: 1,
            transform: [{ rotate: '-45deg' }],
            textAlign: 'left',
        },

        /*
        button: {
          backgroundColor: '#000033',
        }
        */
    });
    
    const onPressHandler = useCallback(
        () => {
            console.log("onPressHandler");
            const temp = Utils.shuffle( photos );
            setShuffledPhotos( temp );        
        },
        [photos]
    );

    const keyExtractorHandler = useCallback(
        (item) => {
            console.log("keyExtractorHandler"); //, item.id.toString() 
            return item.id.toString();            
        },
        []
    );
    
    const renderItemHandler = useCallback(
        ({item}) => {
            console.log("renderItemHandler");
            return (  
              <View style={ styles.imageContainer }>                      
                  <ImageBackground  
                      source={{ 
                          uri: item.url,
                          cache: 'force-cache',
                      }}  
                      style={ styles.imageBackground } 
                      imageStyle={ styles.innerImage }
                      resizeMode={ 'contain' }                       
                      // loadingIndicatorSource={[ require('./assets/loading_icons8com_2.gif') ]}
                      // loadingIndicatorSource={{ uri: require('./assets/loading_icons8com_2.gif') }}
                      // loadingIndicatorSource={ require('./assets/loading_icons8com_2.gif') }
                      /*
                      defaultSource={{ 
                          uri: require('./assets/loading_icons8com_2.gif'),
                          width: 60,
                          height: 60,
                      }}
                      */
                      defaultSource={ require('./assets/loading_icons8com_16.gif') }
                  >
                      <View style={ styles.titleWrapper }>
                          <Text style={ styles.title }>{ item.title }</Text>
                      </View>
                  </ImageBackground>
              </View>
            );  
        },
        [styles.imageBackground, styles.imageContainer, styles.innerImage, styles.title, styles.titleWrapper]
    );

    return (
        <View style={ styles.viewLayout }>
            { shuffledPhotos===undefined ?
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