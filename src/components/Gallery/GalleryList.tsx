import { Pagination } from "@mui/material";
import { memo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { reselectCharacterByStatus } from "../../store/slices/characters";
import { setFilter } from "../../store/slices/galleryFilter";
import PersonCard from "./Card/PersonCard";
import { Box, Gallery, GalleryInnerWrap, ListWrap, MyCollection, SmallHeader } from "./styled";
import { MessageWrap } from "../MessageWrap/MessageWrap";
import { LABEL } from "../../label";
import { SearchForm } from "./SearchForm/SearchForm";

import { DndContext, DragEndEvent, useDndContext, useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { maxWidth } from "@mui/system";
import PersonShortCard from "./Card/PersonShortCard";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Props {
    pagesCount: number,
    isFetching: boolean,
}

export function Droppable(props: any) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        width: 'auto',
        height: 'auto',
    };

    return (
        <div ref={setNodeRef} style={props.customStyle || style}>
            {props.children}
        </div>
    );
}

function Draggable(props: any) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        // zIndex: 100,
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.isShort ? <PersonShortCard person={props.character} /> : <PersonCard person={props.character} />}
        </div>
    );
}

const GalleryList = ({ pagesCount = 10, isFetching }: Props) => {
    const filter = useAppSelector((state) => state.filter);
    const characters = useAppSelector((state) => reselectCharacterByStatus(state.characters, filter.status));
    const dispatch = useAppDispatch();
    const [myCollection, setItemToMyCollection] = useState<{ myCollection: (string | number)[]}>({myCollection: []})

    const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setFilter({
            ...filter,
            page,
        }));
    }

    const onDrop = ({ active, over }: DragEndEvent) => {
        const isExistElement = myCollection.myCollection.find((collectionId) => collectionId === active.id) !== undefined;
        if (active.id && over && over?.id !== 'delete' && !isExistElement) setItemToMyCollection(prev => ({myCollection: [...prev.myCollection, active.id]}))
        if (over && over?.id === 'delete') {
            // console.log(active, over, myCollection.myCollection.filter((personId) => personId !== active.id));
            console.log(active, over, myCollection.myCollection);

            setItemToMyCollection(prev => ({ myCollection: [...prev.myCollection.filter((personId) => personId !== Math.floor(Number(active.id)))]}))
        }
    }

    return (
        <>
            <Gallery>
                <Box><SearchForm /></Box>
                <Box>
                    <Pagination count={pagesCount} variant="outlined" onChange={changePage} page={filter.page} />
                </Box>
                <GalleryInnerWrap>
                    <DndContext onDragEnd={onDrop}>
                            <MyCollection>
                                    <SmallHeader>
                                        <h4>MyCollection</h4>
                                        <div style={{
                                            width: 30,
                                            height: 30,
                                            cursor: 'pointer',
                                            borderRadius: 20,
                                            backgroundColor: '#8080806b',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Droppable id="delete">
                                                <DeleteOutlineIcon />
                                            </Droppable>
                                        </div>
                                    </SmallHeader>
                                <Droppable id="myCollection" customStyle={{ width: '100%', height: '100%', minHeight: 200, }}>
                                    <div>
                                        { myCollection.myCollection.map(charId => {
                                            const character = characters.find(({ id }) => charId === id)
                                            return character ? <Draggable  id={character.id + Math.random()} character={character} key={character.id} isShort /> : null
                                        })}
                                    </div>
                                </Droppable>
                            </MyCollection>
                            {
                                isFetching ? <MessageWrap message={LABEL.LOADING} /> :
                                    <ListWrap>
                                        {characters.map((character) => <Draggable id={character.id} character={character} key={character.id} />)}
                                    </ListWrap>
                            }
                    </DndContext>
                </GalleryInnerWrap>
                
            </Gallery>
        </>
    )
}

export default memo(GalleryList);
