import { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useGetCharactersQuery } from './API';
import { PageNotFound } from './components/404/PageNotFound';
import { ComponentA } from './components/component-a';
import { Content } from './components/Content/Content';
import { GalleryList } from './components/Gallery/GalleryList';
import { PersonInfo } from './components/PersonInfo/PersonInfo';
import { useAppDispatch } from './store';
import { addCharacters } from './store/slices/characters';
import './test.scss';

interface INavBarProps {
  message: string,
}

const NavBar = ({ message }: INavBarProps) => {
  return (
    <div className="nav-bar f-c">
      <div className="m-w-1200 f-c">
        <Link to="/"><h1>{message}</h1></Link>
        {/* <ComponentA /> */}
      </div>
    </div>
  );
}

function App() {
  const dispatch = useAppDispatch()
  const { data } = useGetCharactersQuery();
  useEffect(() => {
    dispatch(addCharacters(data));
  }, [data, dispatch]);
 
  return (
    <div className="App">
      <NavBar message='Rick and Morty gallery' />
      <Content>
        <Routes>
          <Route path='/' element={ <GalleryList /> } />
          <Route path='/:id' element={ <PersonInfo /> } />
          <Route path='*' element={ <PageNotFound /> } />
        </Routes>
      </Content>
    </div>
  );
}

export default App;
