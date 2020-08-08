import {StyleSheet, Platform} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: 'QUICKSAND-LIGHT',
  },
  container1Title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  container2Title: {
    fontSize: 15,
    color: '#d3e38c',
  },
  container4: {
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 10,
  },

  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  imagenes: {
    resizeMode: 'cover',
  },

  menutab: {
    flex: 1,
  },
});
