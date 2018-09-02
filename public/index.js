const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recongnition.lang ='en-US';

recognition.addEventListener('result', (e) => {
    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;

    console.log(`Confidene: ${e.results[0][0].confidence}`);

    //Use Socket.IO here later
});

const socket = io();
socket.emit('chat message', text);