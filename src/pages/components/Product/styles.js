import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: 'column',
    alignContent: 'space-between',
    flex: 1,
  },
  SubTitle: {
    marginBottom: 5,
    fontSize: 22,
    color: '#031f30',
    paddingVertical: 7,
    borderRadius: 3,
    borderBottomWidth: 2,
    borderBottomColor: '#a9d046',
  },
  priceText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#031f30',
  },
  mutedText: {
    color: '#999999',
  },
  bodyText: {
    fontSize: 18,
    color: '#031f30',
  },
  Text: {
    color: '#bdbfc1',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  extras: {
    flexDirection: 'column',
  },
  Title: {
    fontSize: 22,
    width: '50%',
    color: '#031f30',
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputs: {
    marginLeft: 12,
    borderBottomColor: '#FFFFFF',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',

    borderRadius: 5,
    marginTop: 40,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  loginButton: {
    backgroundColor: '#a9d046',
    alignSelf: 'center',
  },
  loginText: {
    fontFamily: '[z] Arista Light',
    color: 'white',
  },
});
