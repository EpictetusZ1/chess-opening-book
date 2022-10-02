import {
    ActionTypes,
    SET_TYPOGRAPHY,
    SET_FONT_FAMILY,
    SET_DEFAULT_DARK,
    SET_DEFAULT_LIGHT,
    SET_DEFAULT_COLORBLIND,
} from "./themeActions"
import {ITheme} from "../types/Main.types"
import {DefaultDark, DefaultLight, DefaultColorBlind, TypographyNormal} from "../styles/Theme";


export const themeReducer = (state: ITheme, action: ActionTypes) => {
    switch (action.type) {
        default:
            return state
        case SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: `${action.payload}, sans-serif`
            }
        case SET_TYPOGRAPHY:
            return {
                ...state,
                typography: {
                    fontScaling: action.payload.fontScaling,
                    headerSize: action.payload.headerSize,
                    subHeaderSize: action.payload.subHeaderSize,
                    pSize: action.payload.pSize,
                    accentTextSize: action.payload.accentTextSize,
                }
            }
        case SET_DEFAULT_DARK:
            return {
                ...state,
                colors: DefaultDark
            }
        case SET_DEFAULT_LIGHT:
            return {
                ...state,
                colors: DefaultLight
            }
        case "SET_DEFAULT_COLORBLIND":
            return {
                ...state,
                colors: DefaultColorBlind
            }
    }
}

