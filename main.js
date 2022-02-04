// https://teachablemachine.withgoogle.com/models/ijNGB15Oq/
prediction = "";

quote = "";

Webcam.set({
    width:360,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result_div").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version = ', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ijNGB15Oq/model.json', model_loaded);

function model_loaded(){
    console.log('Model Loaded');
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, got_result);
}

function speak(){
    synth = window.speechSynthesis;
    speak_data = quote;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function got_result(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        prediction = results[0].label;
        document.getElementById("prediction_1").innerHTML = prediction;
        if(prediction == "Victory"){
            document.getElementById("emoji_1").innerHTML = '&#9996;';
            quote = 'That was an marvelous victory!'; 
        }else if(prediction == "Amazing"){
            document.getElementById("emoji_1").innerHTML = '&#128076;';
            quote = 'This is very amazing!'; 
        }else if(prediction == "Bye"){
            document.getElementById("emoji_1").innerHTML = '&#128075;';
            quote = 'Goodbye!'; 
        }else if(prediction == "Thumbs Up"){
            document.getElementById("emoji_1").innerHTML = '&#128077;';
            quote = 'Best of luck!'; 
        }else{
            document.getElementById("emoji_1").innerHTML = '&#128078;';
            quote = 'Worst of luck!'; 
        }
    }
    speak();
}