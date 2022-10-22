import * as S from "./CloseBtn.styles"

type CloseBtn = {
    ariaLabel: string
    onClick: () => void
}

const CloseBtn = ({ariaLabel, onClick}: CloseBtn) => {
    return (
        <S.CloseBtnCont>
           <S.CloseBtn
                aria-label={ariaLabel}
                onClick={onClick}
           >
              X
           </S.CloseBtn>
        </S.CloseBtnCont>
    );
};

export default CloseBtn;