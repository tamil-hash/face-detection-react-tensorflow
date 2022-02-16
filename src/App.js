import {useState,useEffect} from "react"
import './App.css';
import Tensorflow from "./Tensorflow";
import LoadingGif from "./loading.gif";
function App() {
  const [loading,setLoading] = useState(false);


  useEffect(()=>{
    setLoading(true);

    setTimeout(()=>{
      setLoading(false);
    },10000);
  },[])

  return (
    <div className="container">
      <h1>Face detection using TensorFlow.js</h1>
      {loading ? <img src={LoadingGif} alt="loading" /> : <Tensorflow />}
    </div>
  );
}

export default App;
