"use strict"

const frontCameraConstraints = {
    audio: true,
    video: {
        width: { min: 640, max: 1280 },
        height: { min: 480, max: 720 },
        facingMode: { exact: "user" }
    }
};

const backCameraConstraints = {
    audio: true,
    video: {
        width: { min: 640, max: 1280 },
        height: { min: 480, max: 720 },
        facingMode: { exact: "environment" }
    }
};


// Video element where stream will be placed.
const frontCamera = document.getElementById('front-camera');
const backCamera = document.getElementById('back-camera');

// Local stream that will be reproduced on the video.
let frontCameraStream;
let backCameraStream;

// Handles success by adding the MediaStream to the video element.
function gotLocalFrontMediaStream(mediaStream) {
    frontCameraStream = mediaStream;
    frontCamera.srcObject = mediaStream;
}

function gotLocalBackMediaStream(mediaStream) {
    backCameraStream = mediaStream;
    backCamera.srcObject = mediaStream;
}

// Handles error by logging a message to the console with the error message.
function handleLocalMediaStreamError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

// Initializes media stream.
navigator.mediaDevices.getUserMedia(frontCameraConstraints)
    .then(gotLocalFrontMediaStream).catch(handleLocalMediaStreamError);

navigator.mediaDevices.getUserMedia(backCameraConstraints)
    .then(gotLocalBackMediaStream).catch(handleLocalMediaStreamError);