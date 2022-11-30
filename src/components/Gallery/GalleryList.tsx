import { useAppSelector } from "../../store";
import { PersonCard } from "./Card/PersonCard";
import { Gallery } from "./styled";

export const GalleryList = () => {
    const characters = useAppSelector((state) => state.characters)
    return (
        <Gallery>
            { characters.map((character) => <PersonCard key={character.id} person={ character } />)}
        </Gallery>
    )
}