import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useGetStatusFilteredCharactersByPageQuery } from './API';
import { MessageWrap } from './components/MessageWrap/MessageWrap';
import { Content } from './components/Content/Content';
import { useAppDispatch, useAppSelector } from './store';
import { addCharacters, clearCharacters } from './store/slices/characters';
import './test.scss';
import { LABEL } from './label';
import { ROUTE } from './route';
import NavBar from './components/NavBar/NavBar';

const GalleryList = lazy(() => import('./components/Gallery/GalleryList'));
const PersonInfo = lazy(() => import('./components/PersonInfo/PersonInfo'));

function App() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => state.filter);
  const currentPage = useAppSelector((state) => state.currentPage);
  const { data, isFetching } = useGetStatusFilteredCharactersByPageQuery({page: currentPage, status: filter});

  useEffect(() => {
    dispatch(clearCharacters());
    dispatch(addCharacters(data?.results || []));
  }, [data, currentPage, filter, dispatch]);
 
  return (
    <div className="App">
      <NavBar message='Rick and Morty gallery' />
      <Content>
        <Suspense fallback={ <MessageWrap message={ LABEL.LOADING } /> }>
          <Routes>
            <Route path={ ROUTE.HOME } element={ <GalleryList pagesCount={ data?.info.pages || 10 } isFetching={ isFetching } /> } />
            <Route path={ ROUTE.PERSON_INFO } element={ <PersonInfo /> } />
            <Route path={ ROUTE.ALL_ROUTES } element={ <MessageWrap message={ LABEL.PAGE_NOT_FOUND } /> } />
          </Routes>
        </Suspense>
      </Content>
    </div>
  );
}

export default App;
