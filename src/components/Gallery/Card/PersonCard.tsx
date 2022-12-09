import Button from "@mui/material/Button";
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

const PersonCard = ({ person }: IPersonCardProps) => {
    return (
            <Card sx={{ maxWidth: 250 }} style={{ marginBottom: 30 }}>
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
                    <CardContent>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography color={person.status === 'Alive' ? "primary" : "secondary"}>
                                { person.status }
                            </Typography>
                            <Link to={`/${ person.id }`}>
                                <Button>More</Button>
                            </Link>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
    );
}

export default memo(PersonCard);