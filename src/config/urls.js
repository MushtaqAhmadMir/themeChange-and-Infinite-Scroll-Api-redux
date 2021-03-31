const API_BASE_URL = 'http://192.168.99.194:8002';
const getApiUrl = (endpoint) => API_BASE_URL + endpoint;
export const LOGIN = getApiUrl('/user/loginUser');
export const SIGNUP = getApiUrl('/user/registerUser');
export const LATEST_DEALS = getApiUrl('/latest/deals');
export const UPLOAD_IMAGE=getApiUrl('/common/uploadFile')
export const MOBILE_VERIFY='https://api.talktier.com/user/v1/loginSignupOtp'
export const OTP_VERIFY='https://api.talktier.com/user/v1/verifyOtp'
 export const GET_USERS='https://api.talktier.com/user/v1/getUserSearch'