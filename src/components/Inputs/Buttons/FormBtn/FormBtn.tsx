import * as S from "./FormBtn.styles"

type TFormBtn = {
    text: string
    onClick?: any
    ariaLabel?: string
    form: string
}

const FormBtn = ({text, onClick, ariaLabel, form}: TFormBtn) => {
    return (
        <S.FormBtn
            role={"button"}
            onClick={onClick}
            type={"submit"}
            aria-label={ariaLabel}
            form={form}
        >
            {text}
        </S.FormBtn>
    );
};

export default FormBtn;