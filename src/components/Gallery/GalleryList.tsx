import { Pagination } from "@mui/material";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { reselectCharacterByStatus } from "../../store/slices/characters";
import { setFilter } from "../../store/slices/galleryFilter";
import PersonCard from "./Card/PersonCard";
import { Box, Gallery } from "./styled";
import { MessageWrap } from "../MessageWrap/MessageWrap";
import { LABEL } from "../../label";
import { SearchForm } from "./SearchForm/SearchForm";

interface Props {
    pagesCount: number,
    isFetching: boolean,
}

const  GalleryList = ({ pagesCount=10, isFetching }: Props) => {
    const filter = useAppSelector((state) => state.filter);
    const characters = useAppSelector((state) => reselectCharacterByStatus(state.characters, filter.status))

    const dispatch = useAppDispatch();

    const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setFilter({
            ...filter,
            page,
        }));
    }

    return (
        <>
            <Gallery>
                <Box><SearchForm /></Box>
                <Box>
                    <Pagination count={ pagesCount } variant="outlined" onChange={changePage} page={filter.page} />
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
