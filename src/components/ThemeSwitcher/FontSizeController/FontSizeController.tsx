import * as S from "./FontSizeController.styles"
import {MutableRefObject, useState} from "react";


type TFontSizeController = {
    currFontSize: MutableRefObject<any>
}

const FontSizeController = ({currFontSize}: TFontSizeController) => {
    const small = {
        fontScaling: "SMALL",
        headerSize: "29px",
        subHeaderSize: "18px",
        pSize: "12px",
        accentTextSize: "10px"
    }

    const normal = {
        fontScaling: "NORMAL",
        headerSize: "25px",
        subHeaderSize: "21px",
        pSize: "19px",
        accentTextSize: "16px"
    }

    const large = {
        fontScaling: "LARGE",
        headerSize: "50px",
        subHeaderSize: "38px",
        pSize: "26px",
        accentTextSize: "22px"
    }

    const extraLarge = {
        fontScaling: "EXTRA_LARGE",
        headerSize: "74px",
        subHeaderSize: "48px",
        pSize: "33px",
        accentTextSize: "28px"
    }

    const [currentSize, setCurrentSize] = useState(currFontSize.current)

    const handleFontChange = (e: any) => {
        const size = e.target.value
        switch (size) {
            case "SMALL":
                setCurrentSize(small)
                currFontSize.current = small
                break
            case "NORMAL":
                setCurrentSize(normal)
                currFontSize.current = normal
                break
            case "LARGE":
                setCurrentSize(large)
                currFontSize.current = large
                break
            case "EXTRA_LARGE":
                setCurrentSize(extraLarge)
                currFontSize.current = extraLarge
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
                        value={currentSize.fontScaling}
                >
                    <option value="SMALL">Small</option>
                    <option value="NORMAL">Normal</option>
                    <option value="LARGE">Large</option>
                    <option value="EXTRA_LARGE">Extra Large</option>
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