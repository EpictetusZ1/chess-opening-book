import * as S from "./TypographyController.styles"
import {useState} from "react";

const TypographyController = () => {
    // TODO: Pass in which typography settings are currently in use.
    // TODO: Add font family options?

    const small = {
        headerSize: 29,
        subHeaderSize: 18,
        pSize: 12,
        accentTextSize: 10
    }

    const normal = {
        headerSize: 44,
        subHeaderSize: 28,
        pSize: 19,
        accentTextSize: 16
    }

    const large = {
        headerSize: 59,
        subHeaderSize: 38,
        pSize: 26,
        accentTextSize: 22
    }

    const extraLarge = {
        headerSize: 74,
        subHeaderSize: 48,
        pSize: 33,
        accentTextSize: 28
    }

    const [currentSize, setCurrentSize] = useState(normal)

    return (
        <S.TypographyController>
            <div>
                <label htmlFor="fontScaleSize" aria-label={"Font Scale Size"}>
                    Choose a font size:
                </label>
                <select name="font scale" id="fontScaleSize">
                    <option value="normal">Normal</option>
                    <option value="small">Small</option>
                    <option value="large">Large</option>
                    <option value="extraLarge">Extra Large</option>
                </select>
            </div>

            <h4>Preview</h4>
            <hr/>

            <S.TypographyPreview pSize={currentSize.pSize}
                                 headerSize={currentSize.headerSize}
                                 subHeaderSize={currentSize.subHeaderSize}
                                 accentTextSize={currentSize.accentTextSize}
            >
                <p className={"header"}>Header</p>
                <p className={"subHeader"}>Sub Header</p>
                <p className={"p"}>Paragraph</p>
                <p className={"accentText"}>Accent Text</p>
            </S.TypographyPreview>


        </S.TypographyController>
    );
};

export default TypographyController;