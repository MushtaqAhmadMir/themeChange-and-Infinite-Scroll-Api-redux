import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fontFamily from "../../styles/fontFamily";

export default StyleSheet.create({
    textInput: {
      borderBottomWidth: 2,
      // width: 380,
      //  backgroundColor: '#4DB8BA',
      borderRadius: 5,
      fontSize: 18,
      padding: 10,
      // borderRadius:20
      borderBottomColor: colors.themeColor,
    },
  
    alreadyText: {
      color: colors.themeColor,
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: fontFamily.lobester,
    },
  
    btnStyle: {
      // backgroundColor: colors.themeColor,
      width: 400,
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
  
    mobileLogBtn: {
      alignItems: 'center',
      backgroundColor: colors.themeColor,
      height: 20,
      borderRadius: 20,
      width: 100,
      alignSelf: 'flex-end',
      marginRight: 15,
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
  });