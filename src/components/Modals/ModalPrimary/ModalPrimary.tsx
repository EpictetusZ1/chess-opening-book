import * as S from "./ModalPrimary.styles";
import React, {ReactNode} from "react";
import CloseBtn from "../../Inputs/CloseBtn/CloseBtn";

type ModalPrimaryProps = {
    children: ReactNode
    closeModal: () => void
}



const ModalPrimary = ({children, closeModal}: ModalPrimaryProps) => {
    return (
        <S.ModalPrimaryCont>
            <S.ModalPrimary>
                <CloseBtn ariaLabel={"close"}
                          onClick={closeModal}
                />
                {children}
            </S.ModalPrimary>
        </S.ModalPrimaryCont>
    );
};

export default ModalPrimary;