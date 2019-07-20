var recorder, gumStream;

var recordButton = document.getElementById("btn-record");
var playAllButton = document.getElementById("btn-play-all");
var removeAllButton = document.getElementById("btn-remove-all");

var recordIndicator = document.getElementById("record-indicator");
var recordContainer = document.getElementById("record-container");

recordButton.addEventListener("click", toggleRecording);
playAllButton.addEventListener("click", playAllClips);
removeAllButton.addEventListener("click", removeAllClips);

function toggleRecording() {
    if (recorder && recorder.state == "recording") {
        recorder.stop();
        gumStream.getAudioTracks()[0].stop();
        recordIndicator.classList.add("hide");
    } else {
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(function(stream) {
            gumStream = stream;
            recorder = new MediaRecorder(stream);
            recordIndicator.classList.remove("hide");
            recorder.ondataavailable = function(e) {
                var url = URL.createObjectURL(e.data);
                var preview = document.createElement('audio');
                preview.controls = true;
                preview.src = url;
                recordContainer.appendChild(preview);
            };
            recorder.start();
        });
    }
}

function playAllClips() {
    let clips = recordContainer.getElementsByTagName("audio");
    for (var i = 0; i < clips.length; i++) {
        clip = clips[i];
        clip.play();
    }
}

function removeAllClips() {
    let clips = recordContainer.getElementsByTagName("audio");
    // The way dynamic HTMLCollection removes elements requires 
    // backwards iteration to properly remove all of the elements at once 
    for (var i = clips.length - 1; i >= 0; i--) {
        clip = clips[i];
        clip.parentNode.removeChild(clip);
    }
}

function seekBySecond() {

}