import { styled } from "@mui/system";

export const Gallery = styled('div')(({ theme }) => ({
    width: '90%',
    backgroundColor: '#fff',
    boxShadow: '0px 10px 10px #e3e3e3bd',
    maxWidth: 1200,
    minWidth: 400,
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingTop: 30,
}));

export const Box = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
}));

export const MyCollectionWrap = styled('div')((theme) => ({
    width: 220,
    minHeight: 200,
    maxHeight: 500,
    backgroundColor: '#d0d0d0',
    borderRadius: 10,
    padding: 10,
    position: 'sticky',
    top: 0,
    left: 0,
    overflow: 'hidden',
}));

export const FlexGalleryWrap = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: 'fit-content',
    maxWidth: 800,
}));

export const ListWrap = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: 'fit-content',
    maxWidth: 800,
}));

export const GalleryInnerWrap = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 20,
}));

export const SmallHeader = styled('div')(({ theme }) => ({
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

export const MyCollectionList = styled('div')(({ theme }) => ({
    width: 30,
    height: 30,
    cursor: 'pointer',
    borderRadius: 20,
    backgroundColor: '#8080806b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
