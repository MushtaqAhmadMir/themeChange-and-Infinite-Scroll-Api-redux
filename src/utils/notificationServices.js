import messaging from '@react-native-firebase/messaging';

export default checkPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
  }
};

getFcmToken = async () => {
  const fcmToken = await messaging().getToken();

  if (fcmToken) {
    console.log(fcmToken, 'fcm token');

    this.showAlert('Your Firebase Token is:', fcmToken);
  } else {
    this.showAlert('Failed', 'No token received');
  }
};
