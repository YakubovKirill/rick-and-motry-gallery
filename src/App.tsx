import { useEffect } from 'react';
import { useGetCharactersQuery } from './API';
import { ComponentA } from './components/component-a';
import { Content } from './components/Content/Content';
import { GalleryList } from './components/Gallery/GalleryList';
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
        <h1>{message}</h1>
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
    console.log(data);
  }, [data, dispatch]);

  // [2, 4, 6, 10]

  const processor = (sample: number[]): number[] => {
    const summ = sample.reduce((acc, element) => acc + element, 0);
    return sample.map((element) => summ - element);
  }
 
  return (
    <div className="App">
      <NavBar message='Hello from some component' />
      <Content>
        <GalleryList />
      </Content>
    </div>
  );
}

export default App;
