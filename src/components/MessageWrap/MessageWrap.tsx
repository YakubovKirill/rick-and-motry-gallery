import { styled } from "@mui/joy";

const MessageComponent = styled('div')(({ theme }) => ({
    width: '80%',
    backgroundColor: '#fff',
    boxShadow: '0px 10px 10px #e3e3e3bd',
    maxWidth: 1200,
    minWidth: 400,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 50,
    color: 'black',
}))

interface Props {
    message: string,
}

export const MessageWrap = ({ message }: Props) => (
    <MessageComponent>
        <h2>{ message }</h2>
    </MessageComponent>
);