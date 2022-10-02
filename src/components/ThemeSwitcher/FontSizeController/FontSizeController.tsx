import * as S from "./FontSizeController.styles"
import { useState } from "react";

const FontSizeController = () => {
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
    const handleFontChange = (e: any) => {
        const size = e.target.value
        switch (size) {
            case "small":
                setCurrentSize(small)
                break
            case "normal":
                setCurrentSize(normal)
                break
            case "large":
                setCurrentSize(large)
                break
            case "extraLarge":
                setCurrentSize(extraLarge)
                break
        }
    }

    return (
        <S.FontSizeController>
            <div>
                <label htmlFor="fontScaleSize" aria-label={"Font Scale Size"}>
                    Choose a font size:
                </label>
                <select name="font scale" id="fontScaleSize"
                        onChange={handleFontChange}
                >
                    <option value="normal">Normal</option>
                    <option value="small">Small</option>
                    <option value="large">Large</option>
                    <option value="extraLarge">Extra Large</option>
                </select>
            </div>

            <h4>Preview</h4>
            <hr/>

            <S.FontSizePreview pSize={currentSize.pSize}
                               headerSize={currentSize.headerSize}
                               subHeaderSize={currentSize.subHeaderSize}
                               accentTextSize={currentSize.accentTextSize}
            >
                <p className={"header"}>Header</p>
                <p className={"subHeader"}>Sub Header</p>
                <p className={"p"}>Paragraph</p>
                <p className={"accentText"}>Accent Text</p>
            </S.FontSizePreview>

        </S.FontSizeController>
    );
};

export default FontSizeController;