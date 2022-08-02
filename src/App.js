import './App.css';
import Hello from './components/hello/Hello';
import { Counter } from './features/counter/Counter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <Hello name="Adriano"/>
         <Counter />
      </header>
    </div>
  );
}

export default App;
