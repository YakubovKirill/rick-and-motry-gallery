import { styled } from "@mui/joy";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { reselectCharacterById } from "../../store/slices/characters";
import { PageNotFound } from "../404/PageNotFound";
import { PersonCard } from "../Gallery/Card/PersonCard";

const Person = styled('div')(({ theme }) => ({
    width: '80%',
    backgroundColor: '#fff',
    boxShadow: '0px 10px 10px #e3e3e3bd',
    maxWidth: 1200,
    minWidth: 400,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 50,
}))

export const PersonInfo = () => {
    const { id } = useParams();
    const person = useAppSelector((state) => reselectCharacterById(state.characters, Number(id)));

    if (person) {
        return (
            <Person>
                <PersonCard person={ person }></PersonCard>
            </Person>
        );
    }

    return (<PageNotFound />)
}