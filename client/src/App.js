
import './App.scss';
import CreateJob from './components/CreateJob';
import ShowJobs from './components/ShowJobs';
import Navbar from './components/Navbar';
import Note from "./components/Note";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="box">
      <CreateJob />
      <ShowJobs />
      <Note />
      </div>
    </div>
  );
}

export default App;
