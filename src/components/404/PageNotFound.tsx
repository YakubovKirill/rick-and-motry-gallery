import { styled } from "@mui/joy";

const ErrorComponent = styled('div')(({ theme }) => ({
    width: '80%',
    backgroundColor: '#fff',
    boxShadow: '0px 10px 10px #e3e3e3bd',
    maxWidth: 1200,
    minWidth: 400,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 50,
    color: 'red',
}))

export const PageNotFound = () => (
    <ErrorComponent>
        <h2>404 Page not found</h2>
    </ErrorComponent>
);