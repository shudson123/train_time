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
    console.log("firstTime: "+firstTime);

    var firstTimeConverted = moment(inputTime, "HH:mm").subtract(1, "years");
    console.log("This is the firstTimeConvert: "+firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
     
    
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var tArrivalTime = moment(nextTrain).format("hh:mm")
    console.log("ARRIVAL TIME: "+tArrivalTime);
    
    var tFrequency = $('#frequency').val();
    
    if ((tName == 0) || (tDestination == 0) || (inputTime == 0) || (tFrequency == 0)) {
        alert("Please complete all fields");
        $('#trainName').val("");
        $('#destination').val("");
        $('#trainTime').val("");
        $('#frequency').val("");          
      }
      else {
          
       // $('#trainTable').append('<tr><td>'+tName+'</td><td>'+tDestination+'</td><td>'+tFrequency+'</td><td>'+tArrivalTime+'</td><td>'+tMinutesTillTrain+'</td>');
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
  
//   <tr>
//                             <th scope="row">1</th>
//                             <td>Mark</td>
//                             <td>Otto</td>
//                             <td>@mdo</td>
//                             <td>hey</td>
//                           </tr>
// var tFrequency = 3;

//     // Time is 3:30 AM
//     var firstTime = "03:30";

//     // First Time (pushed back 1 year to make sure it comes before current time)
//     var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
//     console.log(firstTimeConverted);

//     // Current Time
//     var currentTime = moment();
//     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//     // Difference between the times
//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     console.log("DIFFERENCE IN TIME: " + diffTime);

//     // Time apart (remainder)
//     var tRemainder = diffTime % tFrequency;
//     console.log(tRemainder);

//     // Minute Until Train
//     var tMinutesTillTrain = tFrequency - tRemainder;
//     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//     // Next Train
//     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));