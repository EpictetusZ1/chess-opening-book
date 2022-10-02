import {
    ActionTypes,
    SET_TYPOGRAPHY,
    SET_FONT_FAMILY
} from "./themeActions"
import {ITheme} from "../types/Main.types"
import {DefaultDark, TypographyNormal} from "../styles/Theme";




export const themeReducer = (state: ITheme, action: ActionTypes) => {
    switch (action.type) {
        default:
            return state
        case SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.payload
            }
        case SET_TYPOGRAPHY:
            return {
                ...state,
                typography: action.payload
            }
    }
}

