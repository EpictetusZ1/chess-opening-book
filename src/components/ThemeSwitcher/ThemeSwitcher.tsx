import * as S from "./ThemeSwitcher.styles"
import Image from "next/image";
import a11YSettingsIcon from "/public/icons/a11ySettingsIcon.png";
import closeIcon from "/public/icons/closeIcon.png"
import paletteIcon from "../../../public/icons/paletteIcon.png"
import fontSizeIcon from "../../../public/icons/fontSizeIcon.png"
import typographyIcon from "../../../public/icons/typographyIcon.png"
import {ReactNode, useState, useRef} from "react";
import FontSizeController from "./FontSizeController/FontSizeController";
import TypographyController from "./TypographyController/TypographyController";
import PrimaryBtn from "../Inputs/PrimaryBtn/PrimaryBtn";
import {ITheme} from "../../types/Main.types";
// Reducer
import { setDefaultDark, setDefaultLight, setDefaultColorBlind, setCurrFontFamily, setCurrTypography } from "../../Theme/themeActions";

type TProps = {
    dispatch: any
    theme: ITheme
}

type TPrefGroupProps = {
    header: string
    description: string
    icon: any
    iconBG: string
    children: ReactNode
}


const ThemeSwitcher = ({dispatch, theme}: TProps) => {
    const [showThemeSwitcher, setShowThemeSwitcher] = useState<boolean>(false)
    // const [themeColors, setThemeColors] = useState(theme.colors.name)
    const themeColors = useRef(theme.colors.name)
    const fontRef = useRef(theme.fontFamily)
    const fontSizeRef = useRef(theme.typography)

    const applyTheme = () => {
        // Update theme colors
        switch (themeColors.current) {
            default:
                break
            case "DEFAULT_DARK":
                dispatch(setDefaultDark())
                break
            case "DEFAULT_LIGHT":
                dispatch(setDefaultLight())
                break
            case "DEFAULT_COLORBLIND":
                dispatch(setDefaultColorBlind())
                break
        }

        // Update font family
        dispatch(setCurrFontFamily(fontRef.current))

        // Font scaling
        dispatch(setCurrTypography(fontSizeRef.current))

        setShowThemeSwitcher(false)
    }

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
                                   defaultChecked={true}
                                   onChange={() => themeColors.current = "DEFAULT_DARK"}
                            />
                            <label htmlFor="defaultDark">Default Dark</label>
                        </div>
                        <div className="optionGroup">
                            <input type="radio"
                                   id="DEFAULT_LIGHT"
                                   name="theme"
                                   value="DEFAULT_LIGHT"
                                   // checked={themeColors.current === "DEFAULT_LIGHT"}
                                   onChange={() => themeColors.current = "DEFAULT_LIGHT"}
                            />
                            <label htmlFor="DEFAULT_LIGHT">Light</label>
                        </div>
                        <div className="optionGroup">
                            <input type="radio"
                                   id="DEFAULT_COLORBLIND"
                                   name="theme"
                                   value="DEFAULT_COLORBLIND"
                                   // checked={themeColors.current === "DEFAULT_COLORBLIND"}
                                   onChange={() => themeColors.current = "DEFAULT_COLORBLIND"}
                            />
                            <label htmlFor="DEFAULT_COLORBLIND">Color Blind</label>
                        </div>
                    </PrefGroup>
                    <PrefGroup header={"Font Scaling"}
                               description={"Scale the font sizes until you can see everything crystal clear"}
                               icon={fontSizeIcon}
                               iconBG={"#FF8C42"}
                    >
                        <FontSizeController currFontSize={fontSizeRef} />
                    </PrefGroup>

                    <PrefGroup header={"Typography"}
                               description={"Choose a font that helps you see better"}
                               icon={typographyIcon}
                               iconBG={"#8CBCB9"}
                    >
                        <TypographyController currFontFamily={fontRef} />
                    </PrefGroup>


                    <div className="saveThemeContainer">
                        <PrimaryBtn text={"apply settings"}
                                    onClick={applyTheme}
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