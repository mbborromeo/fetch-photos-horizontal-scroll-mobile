import React, { useState , useEffect, useMemo } from 'react'; //
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';
import PhotosService from './PhotosService';

function PhotosList( props ) {
    //State variables
    const [ photos, setPhotos ] = useState( undefined );
    console.log("photos - ", photos);

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
      viewLayout: {
        // flex: 1,
        // flexDirection: 'row',
      },

      imageContainer: {
        width: 375,
        height: 600, // 667
        borderColor: 'red',
        borderWidth: 1,
        //flex: 1,
      },

      text: {
        width: 300,
      },

      image: {
        width: 'auto', 
        height: '100%', 
        resizeMode: 'contain',
        // aspectRatio: 1
        //flex: 1,
        borderRadius: 16,
        borderColor: 'green',
        borderWidth: 1,
        // blurRadius: 10, 
        shadowColor: 'black',
        shadowOffset: { width:3, height:3 },
        shadowOpacity: 1,
        shadowRadius: 6
      }
    });

    return (
        <View style={ styles.viewLayout }>
            { photos===undefined ?
                <Text>
                    loading photos...      
                </Text> :                
                <FlatList
                  data={ photos }
                  renderItem={ ({item}) => 
                    <View style={ styles.imageContainer }>
                      <Text style={ styles.text }>{ item.title }</Text>
                      <Image 
                        style={ styles.image }
                        source={{ uri: item.url }}                             
                      />
                    </View>
                  }
                  keyExtractor={ (item) => item.id.toString() }
                  horizontal={ true }
                  // pagingEnabled={ true }
                />        
            }
        </View>
    );
}

export default PhotosList;