import { Pagination, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { reselectCharacterByStatus } from "../../store/slices/characters";
import { setFilter } from "../../store/slices/galleryFilter";
import PersonCard from "./Card/PersonCard";
import { Box, Gallery } from "./styled";
import { setCurrentPage } from "../../store/slices/currentPage";
import { MessageWrap } from "../MessageWrap/MessageWrap";
import { LABEL } from "../../label";
import { PERSON_STATUS } from "../../types";

interface Props {
    pagesCount: number,
    isFetching: boolean,
}

const  GalleryList = ({ pagesCount=10, isFetching }: Props) => {
    const filter = useAppSelector((state) => state.filter);
    const characters = useAppSelector((state) => reselectCharacterByStatus(state.characters, filter))
    const page = useAppSelector((state) => state.currentPage);

    const dispatch = useAppDispatch();

    const handleFilterChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
        dispatch(setCurrentPage(1));
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
                        {Object.values(PERSON_STATUS).map((status) => <ToggleButton value={ status } key={ status }>{ status }</ToggleButton>)}
                    </ToggleButtonGroup>
                </Box>
                <Box>
                    <Pagination count={ pagesCount } variant="outlined" onChange={changePage} page={page} />
                </Box>
                {
                    isFetching ? <MessageWrap message={ LABEL.LOADING } />:
                    <>
                        { characters.map((character) => <PersonCard key={character.id} person={ character } />)}
                    </>
                }
            </Gallery>
        </>
    )
}

export default memo(GalleryList);
