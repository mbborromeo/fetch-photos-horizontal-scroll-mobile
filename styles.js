import { StyleSheet } from 'react-native';

// export default const styles = StyleSheet.create({ 
// export default styles = StyleSheet.create({ 
export default StyleSheet.create({ 
  // App
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },

  // PhotosList
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

  // Photo
  /*
  imageContainer: {
      width: width, // dynamically gets window width, so app will work on all iOS phones
      height: 'auto',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around', // main-axis
      alignItems: 'center', // cross-axis
  },
  */

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