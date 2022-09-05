import * as S from "./PrimaryBtn.styles"

type TBtn = {
    className?: string
    onClick?: () => void
    text: string
}

const PrimaryBtn = ({ className, onClick, text}: TBtn) => {
    return (
        <S.PrimaryBtnCont>
            <S.PrimaryBtn
                className={className}
                onClick={onClick}
            >
                {text}
            </S.PrimaryBtn>
        </S.PrimaryBtnCont>
    );
};

export default PrimaryBtn;