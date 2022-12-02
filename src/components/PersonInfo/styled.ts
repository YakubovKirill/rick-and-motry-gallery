import { styled } from "@mui/joy";

export const Person = styled('div')(({ theme }) => ({
    width: '80%',
    backgroundColor: '#fff',
    boxShadow: '0px 10px 10px #e3e3e3bd',
    maxWidth: 1200,
    minWidth: 400,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 50,
}));
