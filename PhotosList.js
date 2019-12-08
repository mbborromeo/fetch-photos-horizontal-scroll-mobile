import React, { useState , useEffect } from 'react'; //
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
// import PhotosService from './PhotosService';

function PhotosList( props ) {
  //State variables
  const [ loading, setLoading ] = useState( true ); // false
  const [ photos, setPhotos ] = useState( [] );

  useEffect(
    () => {
        // setLoading( true );
       
        fetch('https://jsonplaceholder.typicode.com/photos')
          .then( response => response.json() )
            .then( json => {
              console.log( json );
              setPhotos( json );
              setLoading( false );
            })
      
    },
    [ ]
  );

  return (
    <View>
      { loading && photos ?
        <Text>
          loading photos...      
        </Text> :
        <ScrollView>
          { photos.map( photo => 
              <View key={photo.id}>
                <Text>Title: {photo.title}</Text>
                <Image source={{ uri: photo.url }} style={{width: 80, height: 80}}  />
              </View>
            )
          }
        </ScrollView>
      }
    </View>
  );
}

export default PhotosList;