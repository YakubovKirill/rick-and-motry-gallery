import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const PersonCard = () => {
    return (
        <Card sx={{ maxWidth: 300 }} style={{ marginBottom: 30 }}>
            <CardActionArea>
                <CardHeader
                    title="This is some card"
                    subheader="Date od card"
                />
                <CardMedia
                    component="img"
                    height="200"
                    image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                    alt="Some card image"
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
    );
}