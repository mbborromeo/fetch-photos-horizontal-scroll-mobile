import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';

function Photo({ item }) {
    // console.log("Photo!!!!");

    // State variables
    const [ photoLoaded, setPhotoLoaded ] = useState( false );   
    const {width} = Dimensions.get('window'); // get initial window dimensions

    const styles = StyleSheet.create({
        imageContainer: {
            width: width, // dynamically gets window width, so app will work on all iOS phones
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
    });

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
                defaultSource={ require('./assets/loading_icons8com_16.gif') }
                onLoadEnd={ () => setPhotoLoaded(true) }
            >
                { photoLoaded && 
                    <View style={ styles.titleWrapper }>
                        <Text style={ styles.title }>{ item.title }</Text>
                    </View>
                }
            </ImageBackground>
        </View>
    );  
}


export default Photo;
