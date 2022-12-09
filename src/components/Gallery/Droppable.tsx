import { useDroppable } from "@dnd-kit/core";
import { memo } from "react";

function Droppable( props: any ) {
    const { setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        width: 'auto',
        height: 'auto',
    };

    return (
        <div ref={ setNodeRef } style={ props.customStyle || style }>
            { props.children }
        </div>
    );
}

export default memo( Droppable );