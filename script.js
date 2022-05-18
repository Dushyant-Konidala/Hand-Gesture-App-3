 var toSpeak = "";
Webcam.set({
    width : 350 ,
    height : 325 ,
    image_format : "png" ,
    png_quality : 90 
    
});

camera = document.getElementById("camera");
Webcam.attach("#camera");



function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
        });
}
console.log("ml5.version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/3-ZOSHpNc/model.json",modelLoaded);
function modelLoaded(){
    console.log("model loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = toSpeak; 
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error , result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label
        gesture = result[0].label;
        
        if(gesture == "Victory"){
            toSpeak = "That Was A Marvelous Victory";
            document.getElementById("result_emoji").innerHTML = "&#9996;";
        }
        if(gesture == "Best"){
            toSpeak = "All The Best"
            document.getElementById("result_emoji").innerHTML = "&#128077;";
        }
        if(gesture == "Amazing"){
            toSpeak = "This Is Looking Amazing"
            document.getElementById("result_emoji").innerHTML = "&#128076;";
        }
        speak();
    }
}