import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../components/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: verticalScale(70),
    width: horizontalScale(150),
  },
  header: {
    marginTop: moderateScale(30),
    marginBottom: moderateScale(15),
    backgroundColor: '#0e8b8b',
    flexDirection: 'row',
    height: verticalScale(55)
  },
  footer: {
    marginTop: moderateScale(150),
    backgroundColor: '#0e8b8b',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: moderateScale(23),
    textAlign: 'center',
    margin: moderateScale(10),
  },
  text: {
    color: '#070000',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
    textAlign: 'center',
    margin: moderateScale(0),
  },
  text2: {
    color: '#070000',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
    textAlign: 'center',
    margin: moderateScale(0),
  },
  toptentext: {
    color: '#0e8b8b',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
    textAlign: 'center',
    margin: moderateScale(0),
  },
  textinput: {
    borderWidth: 2,
    margin: moderateScale(5),
    padding: moderateScale(5),
    borderRadius: 10
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: moderateScale(15),
    textAlign: 'center',
    margin: moderateScale(10),
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: moderateScale(20),
    marginTop: moderateScale(10)
  },
  row: {
    marginTop: moderateScale(20),
    padding: moderateScale(10)
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: moderateScale(10),
    flexDirection: "row",
    padding: moderateScale(10),
    backgroundColor: "#73CED6",
    width: horizontalScale(100),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: moderateScale(20)
  },
  buttonContainer: {
    backgroundColor: '#73CED6',
    padding: moderateScale(5),
    width: horizontalScale(75),
    alignSelf: 'center',
    borderRadius: 15,
    margin: moderateScale(10)
},
icon: {
  alignSelf: 'center',
  felx: 1,
  flexDirection: "row",
},
buttonContainer2: {
  backgroundColor: '#73CED6',
  padding: moderateScale(5),
  width: horizontalScale(150),
  alignSelf: 'center',
  borderRadius: 15,
  margin: moderateScale(10),
},
});