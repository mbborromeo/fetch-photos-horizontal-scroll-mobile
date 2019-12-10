import React, { useState , useEffect, useMemo } from 'react'; //
import { StyleSheet, Text, View, ImageBackground, FlatList, Button, Alert, ActivityIndicator, Dimensions } from 'react-native';
import PhotosService from './PhotosService';

function PhotosList( props ) {
    //State variables
    const [ photos, setPhotos ] = useState( undefined );
    let {width, height} = Dimensions.get('window'); // https://cmichel.io/how-to-get-the-size-of-a-react-native-view-dynamically
    
    // useMemo will save a memoized copy of the function for re-use, instead of creating a new function each time    
    const photosService = useMemo(
        () => new PhotosService(), 
        []
    );

    useEffect(
        () => {       
            photosService.getPhotos()
                .then( response => response.json() )
                .then( responseJson => setPhotos(responseJson) )
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
        // height: 600, // 667
        // borderColor: 'red',
        // borderWidth: 1,
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
        //alignItems: 'center',

        // // https://medium.com/the-react-native-log/tips-for-react-native-images-or-saying-goodbye-to-trial-and-error-b2baaf0a1a4d
        // alignSelf: 'stretch',
        // width: undefined,
        // height: undefined,
        
        shadowColor: 'black',
        shadowOffset: { width:0, height:3 },
        shadowOpacity: 1,
        shadowRadius: 2,        
      },

      innerImage: {
        borderRadius: 16, 
        borderColor: 'black', 
        borderWidth: 1,
      },

      titleWrapper: {
        //borderColor: 'yellow',
        //borderWidth: 1,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',

        //height: 70,
      },

      title: {
        // width: 375,
        fontSize: 24,
        //textTransform: 'capitalize',
        //lineHeight: 16,
        // flex: 1,        

        color: 'black',
        backgroundColor: 'white',
        opacity: 0.7,
        padding: 16,
        borderColor: 'grey',
        borderWidth: 1,
        //whiteSpace: 'nowrap',
        //overflow: 'hidden',
        //textOverflow: 'ellipsis',
        // flex: 1,
        // flexDirection: 'row',
        // alignItems: 'center',
        //position: 'relative',
        //top: 0, //'50%'
        transform: [{ rotate: '-45deg' }],
        textAlign: 'left',
        //textAlignVertical: 'center',
      },

      button: {
        backgroundColor: '#000033',
      }

    });

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
                          () => Alert.alert('Button pressed')
                        }
                    />                   
                </View>
            }
        </View>
    );
}

export default PhotosList;