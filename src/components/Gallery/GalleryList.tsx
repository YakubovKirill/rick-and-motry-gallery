import { Pagination } from "@mui/material";
import { memo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { reselectCharacterByStatus } from "../../store/slices/characters";
import { setFilter } from "../../store/slices/galleryFilter";
import { Box, Gallery, GalleryInnerWrap, ListWrap, MyCollection, MyCollectionList, SmallHeader } from "./styled";
import { MessageWrap } from "../MessageWrap/MessageWrap";
import { LABEL } from "../../label";
import { SearchForm } from "./SearchForm/SearchForm";
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Draggable from "./Draggable";
import Droppable from "./Droppable";

interface Props {
    pagesCount: number,
    isFetching: boolean,
}

const GalleryList = ({ pagesCount = 10, isFetching }: Props) => {
    const filter = useAppSelector(( state ) => state.filter);
    const characters = useAppSelector(( state ) => reselectCharacterByStatus( state.characters, filter.status ));
    const dispatch = useAppDispatch();
    const [ myCollection, setItemToMyCollection ] = useState<{ myCollection: (string | number)[]}>({ myCollection: [] })

    const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setFilter({
            ...filter,
            page,
        }));
    }

    const onDrop = ({ active, over }: DragEndEvent) => {
        const isExistElement = myCollection.myCollection.find(( collectionId ) => collectionId === active.id) !== undefined;
        if ( active.id && over && over?.id !== LABEL.DELETE_ID && !isExistElement )
            setItemToMyCollection(prev => ({ myCollection: [...prev.myCollection, active.id] }))
        if ( over && over?.id === LABEL.DELETE_ID ) {
            setItemToMyCollection(prev => ({ myCollection: [...prev.myCollection.filter((personId) => personId !== Math.floor(Number(active.id)))]}))
        }
    }

    return (
        <>
            <Gallery>
                <Box><SearchForm /></Box>
                <Box>
                    <Pagination count={ pagesCount } variant="outlined" onChange={ changePage } page={ filter.page } />
                </Box>
                <GalleryInnerWrap>
                    <DndContext onDragEnd={ onDrop }>
                            <MyCollection>
                                    <SmallHeader>
                                        <h4>MyCollection</h4>
                                        <MyCollectionList>
                                            <Droppable id={ LABEL.DELETE_ID }>
                                                <DeleteOutlineIcon />
                                            </Droppable>
                                        </MyCollectionList>
                                    </SmallHeader>
                                <Droppable id="myCollection" customStyle={{ width: '100%', height: '100%', minHeight: 200 }}>
                                    <div>
                                        { myCollection.myCollection.map( charId => {
                                            const character = characters.find(({ id }) => charId === id)
                                            return character ? <Draggable  id={ character.id + Math.random() } character={ character } key={ character.id } isShort /> : null
                                        })}
                                    </div>
                                </Droppable>
                            </MyCollection>
                            {
                                isFetching ? <MessageWrap message={ LABEL.LOADING } /> :
                                    <ListWrap>
                                        { characters.map(( character ) => <Draggable id={ character.id } character={ character } key={ character.id } />) }
                                    </ListWrap>
                            }
                    </DndContext>
                </GalleryInnerWrap>
            </Gallery>
        </>
    )
}

export default memo(GalleryList);
