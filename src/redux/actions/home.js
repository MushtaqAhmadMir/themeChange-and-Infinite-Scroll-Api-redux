import { GET_USERS, SEARCH_USER} from "../../config/urls";
import { apiGet, apiPost } from "../../utils/utils";
import store from "../store";
import types from "../types";

const {dispatch}=store
export function getInfiniteItems(data = {}){
  return apiPost(GET_USERS, data)

}

export function getSearchItems(search){
  console.log(search)
return apiGet(SEARCH_USER+`?name=`+search)
}
export function getNearbySearchItems(lat,long){
  console.log(lat,long,"in action")
 return apiGet(SEARCH_USER+`?coordinates=["${lat}","${long}"]`)
}

export  function themeChange(data) {
  console.log(data)
  dispatch({
    type :types.THEME_CHANGE,
    payload:data
  })
  
}
