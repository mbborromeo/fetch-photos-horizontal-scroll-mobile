import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Text, View, FlatList, Button, ActivityIndicator } from 'react-native';
import PhotosService from './PhotosService';
import Photo from './Photo';
import * as Utils from './utils';
import styles from './styles';

function PhotosList(props) {
    // State variables
    const [photos, setPhotos] = useState(undefined);
    const [shuffledPhotos, setShuffledPhotos] = useState(undefined);

    // save a memoized copy of the function for re-use instead of creating a new function each time
    const photosService = useMemo( 
        () => new PhotosService(),
        []
    );

    useEffect( 
        () => {
            photosService
                .getPhotos()
                .then(response => response.json())
                .then(responseJson => {
                    setPhotos(responseJson);
                    setShuffledPhotos(responseJson);
                })
                .catch(error => {
                    console.error(error);
                });
        }, 
        [photosService]
    );

    const onPressHandler = useCallback( 
        () => {
            // console.log("onPressHandler");
            const temp = Utils.shuffle(photos);
            setShuffledPhotos(temp);
        },
        [photos]
    );

    const keyExtractorHandler = useCallback( 
        (item) => {
            // console.log("keyExtractorHandler");
            return item.id.toString();
        },
        []
    );

    const renderItemHandler = useCallback(
        ({ item }) => {
        // console.log("renderItemHandler");
            return <Photo item={item} />;
        },
        []
    );

    return (
        <View style={styles.viewLayout}>
            {shuffledPhotos === undefined ? (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View>
                    <Text style={styles.header}>Photos from Typicode API call</Text>

                    <FlatList
                        data={shuffledPhotos}
                        renderItem={renderItemHandler}
                        keyExtractor={keyExtractorHandler}
                        horizontal
                        // pagingEnabled={ true }
                        initialNumToRender={5}
                    />

                    <Button title="Re-order photos" onPress={onPressHandler} />
                </View>
            )}
        </View>
    );
}

export default PhotosList;
