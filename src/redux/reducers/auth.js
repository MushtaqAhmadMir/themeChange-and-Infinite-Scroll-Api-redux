import { clearUserData } from "../../utils/utils";
import types from "../types";

const initialState={
    userData:{},
    facebookData:{}
}


export default function (state=initialState,action) {
    

    switch (action.type){

        case types.LOGIN:{
            console.log(action.payload,"user data in login function")
            const userData={...action.payload}


            return {...state,userData}
        }
        case types.DELETE_USERDATA:{
           clearUserData()
            const data={...action.payload}
            return {...state,
                userData:data
            }
        }
    
        case types.FACEBOOK_LOGIN:
            {
                console.log(action.payload,"facebok details iN REDUCER")
                const data={...action.payload}
               return{
                 ...state,
                 facebookData:data
               }
            }

        default:{
            return {...state}
        }

       }
        
}