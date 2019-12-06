import React, { useState , useEffect } from 'react'; //
import { StyleSheet, Text, View } from 'react-native';
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
      { loading ?
        <Text>
          loading photos...      
        </Text> :
        <Text>
          Horizontal scrollable photos...
          { photos[0].title }
        </Text>
      }
    </View>
  );
}

export default PhotosList;