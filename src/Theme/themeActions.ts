import { ITypography } from "../types/Main.types";

export const SET_FONT_FAMILY = "SET_FONT_FAMILY"
export const SET_TYPOGRAPHY = "SET_TYPOGRAPHY"

// TODO: Add quick dispatches to set theme to pre defined themes.


export type ActionTypes =
    | { type: typeof SET_FONT_FAMILY; payload: string }
    | { type: typeof SET_TYPOGRAPHY; payload: ITypography }


export const setCurrFontFamily = (fontFamily: string): ActionTypes => ({
    type: SET_FONT_FAMILY,
    payload: fontFamily
})

export const setCurrTypography = (typography: ITypography): ActionTypes => ({
    type: SET_TYPOGRAPHY,
    payload: typography
})