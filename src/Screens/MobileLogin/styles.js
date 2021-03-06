import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import commonStyles from "../../styles/commonStyles";
import fontFamily from "../../styles/fontFamily";
export default StyleSheet.create({
    textInput: {
      ...commonStyles.mediumFont16,
      borderBottomWidth: 2,
      borderRadius: 5,
      // fontSize: 18,
      padding: 10,
      // borderRadius:20
      borderBottomColor: colors.themeColor,
    },
    btnStyle: {
      // backgroundColor: colors.themeColor,
      width: 400,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    btnStyle2: {
      // backgroundColor: colors.themeColor,
      width: 300,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    socialRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    hyphen: {
      width: 130,
      height: 1,
      backgroundColor: colors.textGrey,
      opacity: 0.6,
    },
    orText: {
      ...commonStyles.mediumFont14,
      lineHeight: 24,
      textAlign: 'center',
      fontFamily: fontFamily.medium,
      opacity: 0.6,
      marginTop: 0,
      marginHorizontal: 16,
    },
    socialIconView: {
      marginTop: 50,
      flexDirection: 'row',
      marginVertical: 10,
      paddingHorizontal: 20,
      justifyContent: 'space-between',
    },
    iconView: {
      flexDirection: 'row',
      borderWidth: 1,
      padding: 5,
      borderColor: colors.btnABlue,
      borderRadius: 5,
      marginRight: 20,
      width: 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconView2: {
      flexDirection: 'row',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.orange,
      borderRadius: 5,
      width: 150,
      padding: 5,
    },
    textFacebook: {height: 30, width: 30, marginRight: 3},
    textGoogle: {height: 30, width: 30, marginRight: 10},
    bottomContainer: {
      // flex: 1,
      // justifyContent: 'flex-end',
      marginBottom: 30,
    },
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFiledRoot: {marginTop: 20},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: '#00000030',
      textAlign: 'center',
    },
    focusCell: {
      borderColor: '#000',
    },
    newUser:{
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 75,
    }
  });