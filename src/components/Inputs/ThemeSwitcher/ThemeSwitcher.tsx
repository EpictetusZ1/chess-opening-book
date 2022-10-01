import * as S from "./ThemeSwitcher.styles"
import {DefaultDark, DefaultLight, TypographyNormal} from "../../../styles/Theme";
import { DefaultTheme } from "styled-components";
import Image from "next/image";
import a11YSettingsIcon from "/public/icons/a11ySettingsIcon.png";
import closeIcon from "/public/icons/closeIcon.png"
import paletteIcon from "../../../../public/icons/paletteIcon.png"
import fontSizeIcon from "../../../../public/icons/fontSizeIcon.png"
import typographyIcon from "../../../../public/icons/typographyIcon.png"
import {ReactNode, useState, useReducer} from "react";
import FontSizeController from "./FontSizeController/FontSizeController";
import TypographyController from "./TypographyController/TypographyController";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import {IA11yContext, ITypographyContext} from "../../../types/Main.types";

type TProps = {
    setTheme: (theme: DefaultTheme) => void
}

type TPrefGroupProps = {
    header: string
    description: string
    icon: any
    iconBG: string
    children: ReactNode
}

// TODO: Put these in their own file, See Jack Herrington vid to remember how to do this.

enum ThemeActionKind {
    TYPOGRAPHY_CHANGE = "TYPOGRAPHY_CHANGE",
}

interface ThemeAction {
    type: ThemeActionKind
    payload: any
}

interface ThemeContext {
    theme: IA11yContext,
    typography: ITypographyContext
}

const initialState = {
    theme: DefaultDark,
    typography: TypographyNormal,
}

function reducer(state: ThemeContext, action: ThemeAction) {
    switch (action.type) {
        case ThemeActionKind.TYPOGRAPHY_CHANGE:
            console.log("Dispatched typography change")
            return {
                ...state,
                typography: {
                    ...state.typography,
                    fontFamily: action.payload.fontFamily
                }
            }
        default:
            return state;
    }
}



const ThemeSwitcher = ({setTheme}: TProps) => {
    const [themePreferences, setThemePreferences] = useState("DEFAULT_DARK")
    const [showThemeSwitcher, setShowThemeSwitcher] = useState<boolean>(false)
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log("state", state)



    const PrefGroup = ({header, description, icon, iconBG, children}: TPrefGroupProps) => {
        return (
            <S.PrefGroup iconBgColor={iconBG}>
                <div className="prefHeader">
                    <div className="iconBackground">
                        <Image src={icon} alt={header}
                               width={48}
                               height={48}
                        />
                    </div>
                    <div className="prefText">
                        <p className={"prefTitle"}>{header}</p>
                        <p className={"prefDesc"}>{description}</p>
                    </div>
                </div>

                <div className="prefBody">
                    {children}
                </div>
            </S.PrefGroup>
        )
    }

    const ThemeController = () => {
        return (
            <S.ThemeControllerContainer>
                <S.ThemeController>
                    <div className="btnContainer">
                        <button className={"closeThemeSwitcher"}
                                onClick={() => setShowThemeSwitcher(false)}
                        >
                            <Image src={closeIcon} alt="Close theme switcher"/>
                        </button>
                    </div>

                    <h2>Customize your accessibility settings</h2>

                    <PrefGroup header={"Color Palette"}
                               description={"Choose a color palette that helps you see better"}
                               icon={paletteIcon}
                               iconBG={"#8D6A9F"}
                    >
                        <div className="optionGroup">
                            <input type="radio"
                                   id="defaultDark"
                                   name="theme"
                                   value="DEFAULT_DARK"
                                   checked={themePreferences === "DEFAULT_DARK"}
                                   onChange={() => setThemePreferences("DEFAULT_DARK")}
                            />
                            <label htmlFor="defaultDark">Default Dark</label>
                        </div>
                        <div className="optionGroup">
                            <input type="radio"
                                   id="light"
                                   name="theme"
                                   value="LIGHT"
                                   checked={themePreferences === "LIGHT"}
                                   onChange={() => setThemePreferences("LIGHT")}
                            />
                            <label htmlFor="light">Light</label>
                        </div>
                    </PrefGroup>
                    <PrefGroup header={"Font Scaling"}
                               description={"Scale the font sizes until you can see everything crystal clear"}
                               icon={fontSizeIcon}
                               iconBG={"#FF8C42"}
                    >
                        <FontSizeController/>
                    </PrefGroup>

                    <PrefGroup header={"Typography"}
                               description={"Choose a font that helps you see better"}
                               icon={typographyIcon}
                               iconBG={"#8CBCB9"}
                    >
                        <TypographyController dispatch={dispatch}/>
                    </PrefGroup>


                    <div className="saveThemeContainer">
                        <PrimaryBtn text={"apply settings"}

                                    />
                    </div>

                </S.ThemeController>
            </S.ThemeControllerContainer>
        )
    }


    // /* CSS HEX */
    // --french-lilac: #8d6a9fff;
    // --silver-sand: #c5cbd3ff;
    // --opal: #8cbcb9ff;
    // --sunray: #dda448ff;
    // #FF8C42 mango tango?
    // --international-orange-golden-gate-bridge: #bb342fff;


    return (
        <S.ThemeSwitcherBtn>
            { showThemeSwitcher ?
                <ThemeController />
                :
                <div className={"a11yBtnContainer"}>
                    <S.OpenBtn>
                        <Image
                            alt={"accessibility options"}
                            src={a11YSettingsIcon}
                            layout={"responsive"}
                            width={95}
                            height={95}
                            onClick={() => setShowThemeSwitcher(true)}
                        />
                    </S.OpenBtn>
                </div>
            }
        </S.ThemeSwitcherBtn>
    );
};

export default ThemeSwitcher;