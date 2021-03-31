import {LOGIN, SIGNUP,MOBILE_VERIFY, OTP_VERIFY} from '../../config/urls';
import {apiPost, setItem, setUserData} from "../../utils/utils"
import store from '../store';
import types from '../types';
const {dispatch}=store;


export function saveUserData(data){
  console.log(data, "otp  User Data in Actoins")
  dispatch({
    type:types.LOGIN,
    payload:data
  })
}

export function deleteUserData(){
  // console.log(data, "otp  User Data in Actoins")
  dispatch({
    type:types.DELETE_USERDATA,
    payload:null
  })
}


export function login(data = {}) {
  return new Promise((resolve,reject)=>
  {
    apiPost(LOGIN, data).then(res=>
      {
        
        setUserData(res.data).then(suc=>{
        //  saveUserData(res.data);
        })
        console.log(JSON.stringify(res.data)+"asyncStorage")
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
  })
}
export function mobileVerify(data = {}){
  return new Promise((resovle,reject)=>
  {
    apiPost(MOBILE_VERIFY, data).then(res=>{
      setUserData(res.data);
      resovle(res)
    }).catch(error=>
    {
  reject(error)
    })
  })

}
export function signup(data = {}){
  return new Promise((resovle,reject)=>
  {
    apiPost(SIGNUP, data).then(res=>{
      setUserData(res.data);
      resovle(res)
    }).catch(error=>
    {
  reject(error)
    })
  })

}

export function verifyOtp(data = {}){
  return new Promise((resovle,reject)=>
  {
    apiPost(OTP_VERIFY, data).then(res=>{
       setUserData(res.data);
       saveUserData(res.data)
      resovle(res)
    }).catch(error=>
    {
  reject(error)
    })
  })

}


