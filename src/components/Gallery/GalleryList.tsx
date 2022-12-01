import { styled } from "@mui/system";
import { Pagination, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { reselectCharacterByStatus } from "../../store/slices/characters";
import { setFilter } from "../../store/slices/galleryFilter";
import PersonCard from "./Card/PersonCard";
import { Gallery } from "./styled";
import { setCurrentPage } from "../../store/slices/currentPage";

const Box = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
}))

interface Props {
    pagesCount: number,
}

const  GalleryList = ({ pagesCount }: Props) => {
    const filter = useAppSelector((state) => state.filter);
    const characters = useAppSelector((state) => reselectCharacterByStatus(state.characters, filter))
    const dispatch = useAppDispatch();

    const handleFilterChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
        dispatch(setFilter(value))
    }

    const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setCurrentPage(page));
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
                        <ToggleButton value="unknown">Unknown</ToggleButton>
                        <ToggleButton value="All">All</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box>
                    <Pagination count={ pagesCount } variant="outlined" onChange={changePage} />
                </Box>
                <>
                    { characters.map((character) => <PersonCard key={character.id} person={ character } />)}
                </>
            </Gallery>
        </>
    )
}

export default memo(GalleryList);
