import React, { useState } from 'react';
import axios from "axios";
import Webcam from "react-webcam";


// const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

export const WebcamCapture = () => {

    const [image, setImage] = useState('');
    const [view, setView] = useState('');
    const webcamRef = React.useRef(null);

    
    const capture = React.useCallback(
        () => {
            // const imageSrc = webcamRef.current.getScreenshot();
            setImage(webcamRef.current.getScreenshot());
        });
    
    console.log(image);
    
    const viewImage = () => {
        axios.get("http://localhost:3010/api/camera").then((response) => {
            setView(response.data.data);
        });
    }

    const saveImage = () => {
        axios.post("http://localhost:3010/api/camera", {
            cam: image
        });
    }

    return (
        <div className="webcam-container">
            <div className="webcam-img">

                {image == '' ? <Webcam
                    audio={false}
                    height={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                /> : <img src={image} />}
            </div>
            <div>
                {image != '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Capture</button>
                }
            </div>
            <button onClick={viewImage}>View Image</button>
            <button onClick={saveImage}>Save Image</button>
            <img src={view} alt="selfie image" />
        </div>
    );
};
