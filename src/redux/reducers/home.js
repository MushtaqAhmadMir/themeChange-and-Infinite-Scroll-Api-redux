
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import types from '../types';
initialState = {
  users:[],
  themeColor:{newThemeColor:'#0087F7'}
}; 

export default function (state = initialState, action) {
  
  switch (action.type) {
    case types.USERS:{
      // console.log(action.payload,"users in reducers")
      // const user={...action.payload}


            return {
              ...state,
              users:[...state.users,action.payload]
            }
    }
    case types.THEME_CHANGE:
      {
        const themeColor={...action.payload}
           console.log(themeColor,"colors in reducer")

        return {...state,themeColor:themeColor}
      }

    default: {
      return {...state};
    }
  }
}
