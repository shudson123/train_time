
var config = {
    apiKey: "AIzaSyDsIYulBHlka4guGLBiCuNzK3YSuYB3fPw",
    authDomain: "train-time-6b6aa.firebaseapp.com",
    databaseURL: "https://train-time-6b6aa.firebaseio.com",
    projectId: "train-time-6b6aa",
    storageBucket: "",
    messagingSenderId: "1085778248231"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#button").on('click', function trainInput(){
    
    event.preventDefault();

    var tName = $('#trainName').val();
    var tDestination = $('#destination').val();
    var tFrequency = $('#frequency').val();
    var inputTime = $('#trainTime').val();
    var firstTime = moment(inputTime,"HH:mm");
    
    var firstTimeConverted = moment(inputTime, "HH:mm").subtract(1, "years");
    
    var currentTime = moment();
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    var tRemainder = diffTime % tFrequency;
    
    var tMinutesTillTrain = tFrequency - tRemainder;
      
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
    var tArrivalTime = moment(nextTrain).format("hh:mm")
      
    var tFrequency = $('#frequency').val();
    
    if ((tName == 0) || (tDestination == 0) || (inputTime == 0) || (tFrequency == 0)) {
        alert("Please complete all fields");
        $('#trainName').val("");
        $('#destination').val("");
        $('#trainTime').val("");
        $('#frequency').val("");          
      }
      else {
        database.ref().set({
            name:tName,
            destination:tDestination,
            frequency:tFrequency,
            arrivalTime:tArrivalTime,
            minutesTillTrain:tMinutesTillTrain,
        })
        $('#trainName').val("");
        $('#destination').val("");
        $('#trainTime').val("");
        $('#frequency').val("");
        
      }
  })
 
  $(document).ready(function(){
      database.ref().on("value", function(snapshot){
      $('#trainTable').append('<tr><td>'+(snapshot.val().name)+'</td><td>'+(snapshot.val().destination)+'</td><td>'+(snapshot.val().frequency)+'</td><td>'+(snapshot.val().arrivalTime)+'</td><td>'+(snapshot.val().minutesTillTrain)+'</td>');
  });
})
  
