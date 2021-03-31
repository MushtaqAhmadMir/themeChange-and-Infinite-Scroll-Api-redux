import { GET_USERS} from "../../config/urls";
import { apiPost } from "../../utils/utils";
import store from "../store";
import types from "../types";

const {dispatch}=store

export function addData(data){
  
  dispatch({
    type: types.ADD_DATA,
    payload:data
  
  })
    
    
}
export function deleteItem(id){
  dispatch({
    type:types.DELETE_ITEM,
    payload:id
  
  })
    
}

export function changeValue(id){
  console.log("id in actions", id)
  dispatch({
    type:types.CHANGE_VALUE,
    payload:id
  })
}
export function decrementValue(id){
  console.log("id in actions", id)
  dispatch({
    type:types.DECREMENT_VALUE,
    payload:id
  })
}
export function totalPrice(id){
  console.log("id in actions", id)
  dispatch({
    type:types.TOTAL_PRICE,
    payload:id
  })
}
export function getInfiniteItems(data = {}){
  return new Promise((resovle,reject)=>
  {
    apiPost(GET_USERS, data).then(res=>{
      resovle(res)
      // console.log(res.data,'in home actions')
      dispatch({
        type:types.USERS,
        payload:res.data
      })
    }).catch(error=>
    {
  reject(error)
    })
  })

}

export  function themeChange(data) {
  console.log(data)
  dispatch({
    type :types.THEME_CHANGE,
    payload:data
  })
  
}
