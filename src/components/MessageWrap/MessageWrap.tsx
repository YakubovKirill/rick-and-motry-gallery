import { ContentBox } from "./styled";
interface Props {
    message: string,
}

export const MessageWrap = ({ message }: Props) => (
    <ContentBox>
        <h2>{ message }</h2>
    </ContentBox>
);