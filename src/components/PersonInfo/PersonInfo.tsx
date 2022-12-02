import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { selectCharacterById } from "../../store/slices/characters";
import { MessageWrap } from "../MessageWrap/MessageWrap";
import PersonCard from "../Gallery/Card/PersonCard";
import { LABEL } from "../../label";
import { Person } from "./styled";
import { memo } from "react";

const PersonInfo = () => {
    const { id } = useParams();
    const person = useAppSelector((state) => selectCharacterById(state.characters, Number(id)));

    if (person) {
        return (
            <Person>
                <PersonCard person={ person }></PersonCard>
            </Person>
        );
    }

    return (<MessageWrap message={ LABEL.PAGE_NOT_FOUND } />)
}

export default memo(PersonInfo);
