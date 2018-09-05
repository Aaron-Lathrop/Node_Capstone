const Dialog_Flow_Key = process.env.Dialog_Flow_Key;
const APIAI_SESSION_ID= process.env.APIAI_SESSION_ID;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const socket = io();
const apiai = require('apiai');
const app = apiai(process.env.Dialog_Flow_Key);

recongnition.lang ='en-US';




// try {
//   var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   var recognition = new SpeechRecognition();
// }
// catch(e) {
//   console.error(e);
//   $('.no-browser-support').show();
//   $('.app').hide();
// }

// recognition.onstart = function( {
//   instructions.text(`Voice recognition activated. Try speaking into the microphone.`);
// });

// recognition.addEventListener('result', (e) => {
//     let last = e.results.length - 1;
//     let text = e.results[last][0].transcript;

//     console.log(`Confidene: ${e.results[0][0].confidence}`);

//     //Use Socket.IO here later
// });


// socket.emit('chat message', text);

// io.on('connection', function(socket) {
//     socket.on('chat message', (text) => {
  
//       // Get a reply from API.AI
  
//       let apiaiReq = apiai.textRequest(text, {
//         sessionId: process.env.APIAI_SESSION_ID
//       });
  
//       apiaiReq.on('response', (response) => {
//         let aiText = response.result.fulfillment.speech;
//         socket.emit('bot reply', aiText); // Send the result back to the browser!
//       });
  
//       apiaiReq.on('error', (error) => {
//         console.log(error);
//       });
  
//       apiaiReq.end();
  
//     });
//   });

//   function synthVoice(text) {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance();
//     utterance.text = text;
//     synth.speak(utterance);
//   }

//   socket.on('bot reply', function(replyText) {
//     synthVoice(replyText);

//     if(replyText =='') {replyText = '(No answer...)'};
//     outputBot.textContent = replyText;
//   });