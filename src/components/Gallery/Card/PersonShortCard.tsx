import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import { Link } from "react-router-dom";
import { ICharacter } from "../../../store/slices/characters";

interface IPersonCardProps {
    person: ICharacter
}

const PersonShortCard = ({ person }: IPersonCardProps) => {
    return (
            <Card sx={{ width: 200 }} style={{ marginBottom: 10, fontSize: '1.2rem' }}>
                <CardActionArea>
                    <CardHeader
                        title={ person.name }
                    />
                </CardActionArea>
            </Card>
    );
}

export default memo(PersonShortCard);