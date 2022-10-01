import * as S from "./TypographyController.styles"
import {useState} from "react";


type TTypographyController = {
    dispatch: any
}

const TypographyController = ({dispatch}: TTypographyController) => {
    // TODO: Replace with theme property after
    const [fontFamily, setFontFamily] = useState("Tahoma")


    const handleTypographyChange = (e: any) => {
        const font = e.target.value
        setFontFamily(font)

        // TODO: Extract into save button
        return dispatch({type: "TYPOGRAPHY_CHANGE", payload: {fontFamily: font}})
    }

    return (
        <S.TypographyController>
            <div>
                <label htmlFor="typographyFamily" aria-label={"Change Typography"}>
                    Change typography:
                </label>
                <select name="font scale" id="typographyFamily"
                        onChange={handleTypographyChange}
                >
                    <option value="Tahoma">Tahoma</option>
                    <option value="Open Dyslexic">Open Dyslexic</option>
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                </select>
            </div>

            <h4>Preview</h4>
            <hr/>

            <S.fontPreview fontName={fontFamily} className="typographyPreview">
                the quick brown fox jumps over the lazy dog
            </S.fontPreview>

        </S.TypographyController>
    );
};

export default TypographyController;