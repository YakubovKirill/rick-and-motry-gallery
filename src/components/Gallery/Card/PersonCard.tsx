import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { ICharacter } from "../../../store/slices/characters";

interface IPersonCardProps {
    person: ICharacter
}

export const PersonCard = ({ person }: IPersonCardProps) => {
    return (
        <Link to={`/${ person.id }`}>
            <Card sx={{ maxWidth: 300 }} style={{ marginBottom: 30 }}>
                <CardActionArea>
                    <CardHeader
                        title={ person.name }
                        subheader={ new Date(person.created).toDateString() }
                    />
                    <CardMedia
                        component="img"
                        height="200"
                        image={ person.image }
                        alt={ `${person.name} image` }
                    />
                    <CardContent>
                        <Typography>
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}