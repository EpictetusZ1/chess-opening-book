import * as S from "./TypographyController.styles"
import {MutableRefObject, useState} from "react";

type TTypographyController = {
    currFontFamily: MutableRefObject<string>
}

const TypographyController = ({currFontFamily}: TTypographyController) => {
    const [fontFamily, setFontFamily] = useState(currFontFamily.current)

    const handleTypographyChange = (e: any) => {
        const font = e.target.value
        setFontFamily(font)
        currFontFamily.current = font
    }

    return (
        <S.TypographyController>
            <div>
                <label htmlFor="typographyFamily" aria-label={"Change Typography"}>
                    Change typography:
                </label>
                <select name="font scale" id="typographyFamily"
                        onChange={handleTypographyChange}
                        value={fontFamily}
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