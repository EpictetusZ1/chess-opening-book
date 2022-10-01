import { IA11yContext, ITypographyContext } from "../types/Main.types";


export const TypographyNormal: ITypographyContext = {
    fontFamily: "Tahoma, Geneva, sans-serif",
    headerSize: "2.5rem",
    pSize: "1.5rem",
    subheaderSize: "1.75rem",
}

export const DefaultLight: IA11yContext = {
    // COLOR
    primary: "#003B49",
    secondary: "#D6D2C4",
    tertiary: "#5d3754",
    
    // HIGHLIGHT
    highlightPrimary: "#00E099",
    highlightSecondary: "#EE6352",

    // BUTTON
    btnPrimary: "#B0413E",
    btnSecondary: "#210124",
    buttonClose: "#255F85",

    // MODAL
    modalPrimary: "#94A596",
    modalText: "#2F2F2F",

    // TEXT
    textPrime: "#000",
    btnText: "#F7F0F0",
}

export const DefaultDark: IA11yContext = {
    // COLOR
    primary: "#253137",
    secondary: "#558B6E",
    tertiary: "#C1666B",

    // HIGHLIGHT
    highlightPrimary: "#00E099",
    highlightSecondary: "#EE6352",

    // BUTTON
    btnPrimary: "#B0413E",
    btnSecondary: "#37023C",
    buttonClose: "#255F85",

    // MODAL
    modalPrimary: "#94A596",
    modalText: "#000",

    // TEXT
    textPrime: "#E4FFF2",
    btnText: "#F7F0F0",
}
