import { ITypography } from "../types/Main.types";

export const SET_FONT_FAMILY = "SET_FONT_FAMILY"
export const SET_TYPOGRAPHY = "SET_TYPOGRAPHY"
export const SET_DEFAULT_DARK = "SET_DEFAULT_DARK"
export const SET_DEFAULT_LIGHT = "SET_DEFAULT_LIGHT"
export const SET_DEFAULT_COLORBLIND = "SET_DEFAULT_COLORBLIND"


export type ActionTypes =
    | { type: typeof SET_FONT_FAMILY; payload: string }
    | { type: typeof SET_TYPOGRAPHY; payload: ITypography }
    | { type: typeof SET_DEFAULT_DARK }
    | { type: typeof SET_DEFAULT_LIGHT }
    | { type: typeof SET_DEFAULT_COLORBLIND }


export const setCurrFontFamily = (fontFamily: string): ActionTypes => ({
    type: SET_FONT_FAMILY,
    payload: fontFamily
})

export const setCurrTypography = (typography: ITypography): ActionTypes => ({
    type: SET_TYPOGRAPHY,
    payload: typography
})

export const setDefaultDark = (): ActionTypes => ({
    type: SET_DEFAULT_DARK
})

export const setDefaultLight = (): ActionTypes => ({
    type: SET_DEFAULT_LIGHT
})

export const setDefaultColorBlind = (): ActionTypes => ({
    type: SET_DEFAULT_COLORBLIND
})