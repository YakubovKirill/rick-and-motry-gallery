import { memo } from "react";
import { ICharacter } from "../../../store/slices/characters";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";

interface IPersonCardProps {
    person: ICharacter,
    isDeleteProcess?: Boolean,
}

const PersonShortCard = ({ person, isDeleteProcess }: IPersonCardProps) => {
    return (
            <Card sx={{ width: 200 }} style={{ marginBottom: 10, fontSize: '1rem', backgroundColor: isDeleteProcess ? '#ff8e8e96': '#fff' }}>
                <CardActionArea>
                    <CardHeader
                        title={ person.name }
                    />
                </CardActionArea>
            </Card>
    );
}

export default memo(PersonShortCard);