
const API_BASE_URL = 'http://192.168.99.194:8002';
const NEW_API_BASE_URL='https://api.talktier.com'
const getApiUrl = (endpoint) => API_BASE_URL + endpoint;
const getNewApiUrl=(endpoint)=>NEW_API_BASE_URL+endpoint
export const LOGIN = getApiUrl('/user/loginUser');
export const SIGNUP = getApiUrl('/user/registerUser');
export const LATEST_DEALS = getApiUrl('/latest/deals');
export const UPLOAD_IMAGE=getApiUrl('/common/uploadFile')
export const MOBILE_VERIFY=getNewApiUrl('/user/v1/loginSignupOtp')
export const OTP_VERIFY=getNewApiUrl('/user/v1/verifyOtp')
 export const GET_USERS=getNewApiUrl('/user/v1/getUserSearch')
 export const SEARCH_USER=getNewApiUrl('/user/v1/getUserNearMe')
 export const CHATLIST=getNewApiUrl('/user/v1/getAllConversations?')
export const GET_CONVERSATIONS= getNewApiUrl('/user/v1/getConversationMessages')


 