import types from '../types'
import colors from '../../styles/colors'
import { color } from 'react-native-reanimated'
initialState={
   themeColor:colors.themeColor
}
export default function(state=initialState,action)
{
    switch(action.type)
    {
        case types.THEME_CHANGE:{
            return{
                ...state
            }
        }
        default:
            return{
                state
            }
    }
}