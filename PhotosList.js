import React, { useState , useEffect, useMemo, useCallback } from 'react'; //
import { StyleSheet, Text, View, ImageBackground, FlatList, Button, Alert, ActivityIndicator, Dimensions } from 'react-native';
import PhotosService from './PhotosService';

function PhotosList( props ) {
    //State variables
    const [ originalPhotos, setOriginalPhotos ] = useState( undefined );
    const [ shuffledPhotos, setShuffledPhotos ] = useState( undefined );
    let {width, height} = Dimensions.get('window'); // https://cmichel.io/how-to-get-the-size-of-a-react-native-view-dynamically
    console.log("originalPhotos", originalPhotos);
    console.log("shuffledPhotos", shuffledPhotos);

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
                    setOriginalPhotos(responseJson);
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
    
    // Fisher-Yates shuffle algorithm from https://javascript.info/task/shuffle
    const shuffle = useCallback(
        (array) => {
            console.log("START Fisher-Yates shuffle array...");
            for (let i = array.length - 1; i > 0; i--) {
                //console.log("i", i);
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            console.log("END Fisher-Yates shuffle array.");
            return array;
            //setShuffledPhotos( array );
        },
        []   
    )
    /*
    const shuffle = (array) => {
        console.log("Fisher-Yates shuffle array...");
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    */
    /*
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    */

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
                        renderItem={ ({item}) => 
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
                        }
                        keyExtractor={ (item) => item.id.toString() }
                        horizontal={ true }
                        // pagingEnabled={ true }
                        initialNumToRender={ 5 }
                    />        
                    
                    <Button
                        title="Re-order photos"
                        onPress={
                            //shuffle( originalPhotos )
                            () => {
                                const temp = shuffle( originalPhotos );
                                setShuffledPhotos( temp );
                            }
                        }
                    />                   
                </View>
            }
        </View>
    );
}

export default PhotosList;