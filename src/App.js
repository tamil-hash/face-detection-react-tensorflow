import {useState} from "react"
import './App.css';
import Tensorflow from "./Tensorflow";
import LoadingGif from "./loading.gif";
function App() {
  const [loading,setLoading] = useState(false);


  return (
    <div className="container">
      <h1>Face detection using TensorFlow.js</h1>
      {loading ? <img src={LoadingGif} alt="loading" /> : <Tensorflow setLoading={setLoading}/>}
    </div>
  );
}

export default App;
