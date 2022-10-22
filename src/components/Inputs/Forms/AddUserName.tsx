import * as S from "./AddUserName.styles"
import FormBtn from "../Buttons/FormBtn/FormBtn";
import React, {useState} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";

type TAddUserName = {
    provider: "liChess" | "chessCom"
    userName: string
    proceed: () => void
}

const AddUserName = ({provider, userName, proceed}: TAddUserName) => {
    const { data: session, status } = useSession()
    const [newUserName, setNewUserName] = useState<string>(userName)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const addUserName = await axios.post(`/api/userProfile/userName/${session?.user?.id}`,
            {
                isSetting: true,
                provider: provider,
                userName: newUserName,
            }
        )
        if (addUserName) proceed()
    }

    return (
        <S.AddUserName>
            <h2>Enter your {provider} username </h2>
            <form id={`get${provider}`} onSubmit={handleSubmit}>
                <input type="text"
                       id={`${provider}Id`}
                       name={`${provider}Id`}
                       aria-label={`enter your ${provider} user name`}
                       required={true}
                       onChange={(e) => setNewUserName(e.target.value)}
                />

                <FormBtn text={"Add User Name"}
                         form={`get${provider}`}
                         onClick={handleSubmit}
                         aria-label={`add ${provider} user name`}
                />
            </form>
        </S.AddUserName>
    );
};

export default AddUserName;