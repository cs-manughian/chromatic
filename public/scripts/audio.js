var recorder, gumStream;
var recordButton = document.getElementById("btn-record");
var recordIndicator = document.getElementById("record-indicator");
var recordContainer = document.getElementById("record-container");
recordButton.addEventListener("click", toggleRecording);

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
