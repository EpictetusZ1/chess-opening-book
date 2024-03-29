import * as S from "../../styles/pageStyles/analysis.styles"
import {Session} from "next-auth";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";
import OpeningExplorer from "../../components/OpeningExplorer/OpeningExplorer";


type Props = {
    session: Session | null
}

const Analysis = ({session}: Props) => {

    return (
        <S.AnalysisCont>
            <h2>Meaningful insights about your chess games</h2>
            {/* @ts-ignore */}
            <OpeningExplorer role={"main"} aria-roledescription={"meaningful insights about your chess games"} />
        </S.AnalysisCont>
    );
};

export default Analysis;


export const getServerSideProps: GetServerSideProps<{
    session: Session | null
}> = async (context) => {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {
            session: session,
        },
    }
}
