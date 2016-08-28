var recognizer = new SpeechRecognizer({
  ws: '',
  model: 'WatsonModel'
});
 
recognizer.onresult = function(data) {
 
    //get the transcript from the service result data
    var result = data.results[data.results.length-1];
    var transcript = result.alternatives[0].transcript;
 
    // do something with the transcript
    search( transcript, result.final );
}