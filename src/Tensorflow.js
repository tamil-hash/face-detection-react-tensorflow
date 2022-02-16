import { useEffect,useRef } from "react";

const blazeface = require("@tensorflow-models/blazeface");

const Tensorflow = ({setLoading})=>{
  let model;
  const canvas = useRef(null);
  const video = useRef(null);


  const draw = async (video, context, width, height) => {
    console.log("draw function");
    context.drawImage(video.current, 0, 0, width, height);
    if (!model) model = await blazeface.load();
    const returnTensors = false;
    const predictions = await model.estimateFaces(video.current, returnTensors);
    if (predictions.length > 0) {
      for (let i = 0; i < predictions.length; i++) {
        const start = predictions[i].topLeft;
        const end = predictions[i].bottomRight;
        var probability = predictions[i].probability;
        const size = [end[0] - start[0], end[1] - start[1]];
        context.beginPath();
        context.strokeStyle = "green";
        context.lineWidth = "4";
        context.rect(start[0], start[1], size[0], size[1]);
        context.stroke();
        var prob = (probability[0] * 100).toPrecision(5).toString();
        var text = prob + "%";
        context.fillStyle = "red";
        context.font = "13pt sans-serif";
        context.fillText(text, start[0] + 5, start[1] + 20);
      }
    }
    setTimeout(draw, 250, video, context, width, height);
  };


  const getVideo = ()=>{
    setLoading(true);
    const context = canvas.current.getContext("2d");
    navigator.getMedia =navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    navigator.getMedia(
      {
        video: true,
        audio: false,
      },
      function (stream) {
        video.current.srcObject = stream;
      },
      function (error) {
        console.log(error);
      }
      );
      setLoading(false);
 
      draw(video, context,640,480);
    }
    
    
    useEffect(()=>{
    getVideo();
  },[]);

  return (
    <div className="videoContainer">
      <video ref={video} className="webcam" autoPlay></video>
      <canvas ref={canvas} className="canvas" width="640" height="480"></canvas>
    </div>
  );
}

export default Tensorflow;