import { lazy, Suspense, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useGetCharactersQuery } from './API';
import { MessageWrap } from './components/MessageWrap/MessageWrap';
import { Content } from './components/Content/Content';
import { useAppDispatch } from './store';
import { addCharacters } from './store/slices/characters';
import './test.scss';
import { LABEL } from './label';
import { ROUTE } from './route';

const GalleryList = lazy(() => import('./components/Gallery/GalleryList'));
const PersonInfo = lazy(() => import('./components/PersonInfo/PersonInfo'));

interface INavBarProps {
  message: string,
}

const NavBar = ({ message }: INavBarProps) => {
  return (
    <div className="nav-bar f-c">
      <div className="m-w-1200 f-c">
        <Link to="/"><h1>{ message }</h1></Link>
      </div>
    </div>
  );
}

function App() {
  const dispatch = useAppDispatch()
  const { data } = useGetCharactersQuery();
  useEffect(() => {
    dispatch(addCharacters(data));
    console.log(data);
  }, [data, dispatch]);
 
  return (
    <div className="App">
      <NavBar message='Rick and Morty gallery' />
      <Content>
        <Suspense fallback={ <MessageWrap message={ LABEL.LOADING } /> }>
          <Routes>
            <Route path={ ROUTE.HOME } element={ <GalleryList /> } />
            <Route path={ ROUTE.PERSON_INFO } element={ <PersonInfo /> } />
            <Route path={ ROUTE.ALL_ROUTES } element={ <MessageWrap message={ LABEL.PAGE_NOT_FOUND } /> } />
          </Routes>
        </Suspense>
      </Content>
    </div>
  );
}

export default App;
