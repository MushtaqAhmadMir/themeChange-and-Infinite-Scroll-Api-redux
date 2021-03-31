
import { UPLOAD_IMAGE } from "../../config/urls";
import { apiPost } from "../../utils/utils";
import store from "../store";
import types from '../types'
const{dispatch}=store

export function uploadImage(data={}){
    const headers = {'Content-Type': 'multipart/form-data'};
    return apiPost(UPLOAD_IMAGE,data,headers);
 }
 
 