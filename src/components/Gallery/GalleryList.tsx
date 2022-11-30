import { PersonCard } from "./Card/PersonCard";
import { Gallery } from "./styled";

export const GalleryList = () => {
    const labe = 'This is gallery !';
    return (
        <Gallery>
            <PersonCard />
            <PersonCard />
            <PersonCard />
            <PersonCard />
        </Gallery>
    )
}