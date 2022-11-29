import './test.scss';

interface ISomeComponenProps {
  message: string,
}

const SomeComponent = ({ message }: ISomeComponenProps) => {
  return (
    <>
      <h1>{ message }</h1>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <div className="nav-bar f-c">
        <div className="m-w-1200">
          <SomeComponent message='Hello from some component' />
        </div>
      </div>
    </div>
  );
}

export default App;
