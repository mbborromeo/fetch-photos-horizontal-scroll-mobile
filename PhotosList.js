import React, { useState , useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, Button, Alert, ActivityIndicator, Dimensions } from 'react-native';
import PhotosService from './PhotosService';

function PhotosList( props ) {
    //State variables
    const [ photos, setPhotos ] = useState( undefined );
    const {width} = Dimensions.get('window'); // https://cmichel.io/how-to-get-the-size-of-a-react-native-view-dynamically
    console.log("photos", photos);

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
    
    // TO DO: put this in separate utils.js file
    // Fisher-Yates shuffle algorithm from https://javascript.info/task/shuffle
    const shuffle = (array) => {
        console.log("START Fisher-Yates shuffle array...");
        let newArray = [...array]; // array.slice()

        for (let i = newArray.length - 1; i > 0; i--) {
            //console.log("i", i);
            let j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        console.log("END Fisher-Yates shuffle array.");
        return newArray;
    }

    const onPressHandler = useCallback(
        () => {
            const temp = shuffle( photos );
            setPhotos( temp );        
        },
        [] // photos
    );

    const keyExtractorHandler = useCallback(
        (item) => {
            item.id.toString();
        },
        []
    );

    const renderItemHandler = useCallback(
        ({item}) => {
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
            { photos===undefined ?
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />  
                </View> :    
                <View>
                    <Text style={ styles.header }>
                        Photos from Typicode API call
                    </Text>               

                    <FlatList
                        data={ photos }
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