import React, { useState , useEffect } from 'react'; //
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

    return (
        <View>
            { photos===undefined ?
                <Text>
                    loading photos...      
                </Text> :                
                <FlatList
                  data={ photos }
                  renderItem={ ({item}) => 
                    <View key={item.id}>
                      <Text>Title: {item.title}</Text>
                      <Image source={{ uri: item.url }} style={{width: 80, height: 80}}  />
                    </View>
                  }
                  // keyExtractor={ (photo, index) => index }
                />        
            }
        </View>
    );
}

export default PhotosList;