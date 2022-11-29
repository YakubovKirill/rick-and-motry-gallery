import { positions } from '@mui/system';
import { useEffect } from 'react';
import { useGetCharactersQuery } from './API';
import { ComponentA } from './components/component-a';
import { useAppDispatch } from './store';
import { addCharacters } from './store/slices/characters';
import './test.scss';

interface INavBarProps {
  message: string,
}

type Position = {
  title: string,
  from: string,
  to: string | null,
}

type User = {
  id: number,
  name: string,
  positions: Position[],
}

const NavBar = ({ message }: INavBarProps) => {
  return (
    <div className="nav-bar f-c">
      <div className="m-w-1200">
        <h1>{message}</h1>
        <ComponentA />
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

  const dataArr = [{
    id: 1,
    name: 'Alex Smith',
    positions: [{
      title: 'Accountant',
      from: '2014-10-12',
      to: '2017-02-10'
    }, {
      title: 'Main Accountant',
      from: '2017-04-22',
      to: '2018-12-10'
    }, {
      title: 'Lead Accountant',
      from: '2019-01-05',
      to: null
    }]
  }, {
    id: 2,
    name: 'Maria Brown',
    positions: [{
      title: 'HR Manager',
      from: '2015-01-01',
      to: '2017-05-14'
    }, {
      title: 'Office Manager',
      from: '2017-07-20',
      to: '2019-03-21'
    }, {
      title: 'Lead Office Manager',
      from: '2019-03-22',
      to: '2020-04-21'
    }]
  }, {
    id: 3,
    name: 'John Doe',
    positions: [{
      title: 'Security Officer',
      from: '2015-10-12',
      to: null
    }]
  }, {
    id: 4,
    name: 'Jessica Brown',
    positions: [{
      title: 'Junior Frontend Developer',
      from: '2016-01-09',
      to: '2016-09-14'
    }, {
      title: 'Middle Frontend Developer',
      from: '2016-09-15',
      to: '2017-08-22'
    }, {
      title: 'Middle Frontend Developer',
      from: '2020-08-22',
      to: null
    }]
  }, {
    id: 5,
    name: 'Martin Stark',
    positions: [{
      title: 'System Administrator',
      from: '2014-01-04',
      to: '2016-01-14'
    }, {
      title: 'Security Administrator',
      from: '2016-09-12',
      to: '2018-01-17'
    }, {
      title: 'System Administrator',
      from: '2020-04-14',
      to: null
    }]
  }];

  const getWorkDaysSum = (users: User[]) => users.map(({ positions, name }) => ({
    name, totalWorkDays: positions.reduce((totalDays, { from, to }) => {
      const dateFrom = Number(new Date(from));
      const dateTo = Number(new Date(to || new Date()));
      return totalDays + Math.ceil((dateTo - dateFrom) / 86400000);
    }, 0)
  })).sort((a, b) => b.totalWorkDays - a.totalWorkDays)

  // [2, 4, 6, 10]

  const processor = (sample: number[]): number[] => {
    const summ = sample.reduce((acc, element) => acc + element, 0);
    return sample.map((element) => summ - element);
  }
  
  useEffect(() => {
    // console.log(getWorkDaysSum(dataArr));
    console.log(processor([1,2,3,4,5]));
  }, []);
 
  return (
    <div className="App">
      <NavBar message='Hello from some component' />
    </div>
  );
}

export default App;
