import { useEffect } from 'react';
import { useGetCharactersQuery } from './API';
import { ComponentA } from './components/component-a';
import { useAppDispatch } from './store';
import { addCharacters } from './store/slices/characters';
import './test.scss';

interface INavBarProps {
  message: string,
}

const NavBar = ({ message }: INavBarProps) => {
  return (
      <div className="nav-bar f-c">
        <div className="m-w-1200">
          <h1>{ message }</h1>
          <ComponentA />
        </div>
      </div>
  );
}

function App() {
  const dispatch = useAppDispatch()
  const { data} = useGetCharactersQuery();
  useEffect(() => {
    dispatch(addCharacters(data));
  }, [data, dispatch]);

  return (
    <div className="App">
      <NavBar message='Hello from some component' />
    </div>
  );
}

export default App;
