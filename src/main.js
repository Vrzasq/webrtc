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
const video = document.getElementById('video-stream');

// Local stream that will be reproduced on the video.
let cameraStream;
let isFront = true;

// Handles success by adding the MediaStream to the video element.
function gotLocalMediaStream(mediaStream) {
    cameraStream = mediaStream;
    video.srcObject = mediaStream;
}


// Handles error by logging a message to the console with the error message.
function handleLocalMediaStreamError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

// Initializes media stream.
initMedia(backCameraConstraints);

function changeCamera() {
    if (isFront) {
        isFront = false;
        initMedia(backCameraConstraints);
    } else {
        isFront = true;
        initMedia(frontCameraConstraints)
    }
}

function initMedia(cameraConstraints) {
    navigator.mediaDevices.getUserMedia(cameraConstraints)
        .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
}