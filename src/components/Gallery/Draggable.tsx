import { useDraggable } from "@dnd-kit/core";
import { LABEL } from "../../label";
import { CSS } from '@dnd-kit/utilities';
import { memo } from "react";

import PersonCard from "./Card/PersonCard";
import PersonShortCard from "./Card/PersonShortCard";

function Draggable( props: any ) {
    const { attributes, listeners, setNodeRef, transform, over, isDragging } = useDraggable({
        id: props.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div ref={ setNodeRef } style={ style } { ...listeners } { ...attributes }>
            {
                props.isShort ?
                    <PersonShortCard
                        person={ props.character }
                        isDeleteProcess={ over?.id === LABEL.DELETE_ID && isDragging }
                    />
                    : <PersonCard person={ props.character } />
            }
        </div>
    );
}

export default memo( Draggable );
