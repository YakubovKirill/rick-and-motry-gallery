import { styled } from "@mui/system";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { reselectCharacterByStatus } from "../../store/slices/characters";
import { setFilter } from "../../store/slices/galleryFilter";
import PersonCard from "./Card/PersonCard";
import { Gallery } from "./styled";

const Box = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
}))

const  GalleryList = () => {
    const filter = useAppSelector((state) => state.filter);
    const characters = useAppSelector((state) => reselectCharacterByStatus(state.characters, filter))
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(filter);
    }, [filter]);

    const handleFilterChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
        dispatch(setFilter(value))
    }

    return (
        <>
            <Gallery>
                <Box>
                    <h3 style={{ marginRight: 20, fontSize: 22 }} >Status filter</h3>
                    <ToggleButtonGroup
                        color="primary"
                        value={filter}
                        exclusive
                        onChange={handleFilterChange}
                        aria-label="Filter"
                    >
                        <ToggleButton value="Alive">Alive</ToggleButton>
                        <ToggleButton value="Dead">Dead</ToggleButton>
                        <ToggleButton value="All">All</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <>
                    { characters.map((character) => <PersonCard key={character.id} person={ character } />)}
                </>
            </Gallery>
        </>
    )
}

export default memo(GalleryList);
