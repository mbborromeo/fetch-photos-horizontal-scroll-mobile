import React, { useState, useCallback } from 'react';
import { Text, View, ImageBackground, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const { width } = Dimensions.get('window'); // get initial window dimensions

function Photo({ item }) {
    // State variables
    const [photoLoaded, setPhotoLoaded] = useState(false);

    const onLoadEndHandler = useCallback( 
        () => {
            setPhotoLoaded(true);
        },
        []
    );

    return (
        <View
            style={{
                width: width, // dynamically gets window width, so app will work on all iOS phones
                height: 'auto',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}
        >
            <ImageBackground
                source={{
                    uri: item.url,
                    cache: 'force-cache',
                }}
                style={styles.imageBackground}
                imageStyle={styles.innerImage}
                resizeMode="contain"
                defaultSource={require('./assets/loading_icons8com_16.gif')}
                onLoadEnd={onLoadEndHandler}
            >
                {photoLoaded && (
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                )}
            </ImageBackground>
        </View>
    );
}

Photo.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string, // .isRequired
        url: PropTypes.string, // .isRequired
    }).isRequired,
};

export default React.memo(Photo);
