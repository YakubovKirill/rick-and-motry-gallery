import { styled } from "@mui/system";

type InnerComponentProps = {
    active: boolean;
}

export const InnerComponent = styled('div')<InnerComponentProps>(({theme, active}) => ({
    border: `1px solid ${active ? theme.palette.primary.main : theme.palette.secondary.main}`,
    width: 'max-content',
}))