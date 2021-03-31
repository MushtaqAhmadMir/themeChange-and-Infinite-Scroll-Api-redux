import { clearUserData } from "../../utils/utils";
import types from "../types";

const initialState={
    userData:{
    
    }
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
    

        default:{
            return {...state}
        }

       }
        
}