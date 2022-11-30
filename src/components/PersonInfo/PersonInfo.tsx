import { styled } from "@mui/joy";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { ICharacter } from "../../store/slices/characters";
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
    const person = useSelector((state: RootState) => {
        if (id) {
            const persons = state.characters.filter((character) => character.id === Number(id))
            return persons.length > 0 ? persons[0] : undefined
        }
        return undefined;
    });
    
    if (person) {
        return (
            <Person>
                <PersonCard person={ person }></PersonCard>
            </Person>
        );
    }
    
    return (<PageNotFound />)
    
}