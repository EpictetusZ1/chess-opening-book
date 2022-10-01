import * as S from "./ThemeSwitcher.styles"
import {DefaultDark, DefaultLight} from "../../../styles/Theme";
import { DefaultTheme } from "styled-components";
import Image from "next/image";
import a11YSettingsIcon from "/public/icons/a11ySettingsIcon.png";
import closeIcon from "/public/icons/closeIcon.png"
// import paletteIcon from "/public/icons/paletteIcon.svg"
import paletteIcon from "../../../../public/icons/paletteIcon.png"

import {ReactNode, useState} from "react";

type TProps = {
    setTheme: (theme: DefaultTheme) => void
}

// TODO: Remember, theme switching might be computationally expensive,
// so I should only do it on "SAVE" click of this modal.

const ThemeSwitcher = ({setTheme}: TProps) => {
    const [themePreferences, setThemePreferences] = useState("DEFAULT_DARK")
    const [showThemeSwitcher, setShowThemeSwitcher] = useState<boolean>(false)
    // TODO: Define the normal init theme state, then later add a function to
    // check if the user has a stored theme preference
    // Every prefGroup should have a header, and a small description below it explaining the option

    type TPrefGroupProps = {
        header: string
        description: string
        icon: any
        iconBG: string
    }

    const PrefGroup = ({header, description, icon, iconBG}: TPrefGroupProps) => {
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
                {/*    Figure out children after*/}
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

                </div>
            </S.PrefGroup>
        )
    }

    // /* CSS HEX */
    // --french-lilac: #8d6a9fff;
    // --silver-sand: #c5cbd3ff;
    // --opal: #8cbcb9ff;
    // --sunray: #dda448ff;
    // --international-orange-golden-gate-bridge: #bb342fff;


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
                    />


                </S.ThemeController>
            </S.ThemeControllerContainer>
        )
    }



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