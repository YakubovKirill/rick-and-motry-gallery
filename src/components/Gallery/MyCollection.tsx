import { memo } from "react"
import { LABEL } from "../../label";
import { MyCollectionList, MyCollectionWrap, SmallHeader } from "./styled";
import { ICharacter } from "../../store/slices/characters";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Droppable from "./Droppable";
import Draggable from "./Draggable";

interface MyCollectionProps {
    characters: ICharacter[],
    myCollection: (string | number)[],
}

const MyCollection = ({ characters, myCollection }: MyCollectionProps) => {
    return (
        <MyCollectionWrap>
            <SmallHeader>
                <h4>MyCollection</h4>
                <MyCollectionList>
                    <Droppable id={ LABEL.DELETE_ID }>
                        <DeleteOutlineIcon />
                    </Droppable>
                </MyCollectionList>

                <Droppable id="myCollection" customStyle={{ width: '100%', height: '100%', minHeight: 200 }}>
                    <div>
                        { myCollection.map( charId => {
                            const character = characters.find(({ id }) => charId === id)
                            return character ? <Draggable  id={ character.id + Math.random() } character={ character } key={ character.id } isShort /> : null
                        })}
                    </div>
                </Droppable>
            </SmallHeader>
        </MyCollectionWrap>
    )
}

export default memo( MyCollection );
