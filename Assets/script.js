var hours = ["9am", "10am", "11am", "Noon", "1pm", "2pm", "3pm", "4pm", "5pm"];
var calendarBody = $(".calendar-body");
var calendarEvent;
var userEvents = {};
var viewEvent;

if (localStorage.getItem("Event") === null) {
  userEvents = {};
} else {
  userEvents = JSON.parse(localStorage.getItem("Event"));
}
//Create Calendar blocks. Date/Input/Save button

for (var i = 0; i < hours.length; i++) {
  var timeSlot = $("<div>");

  var timeOfDay = $("<h1>");
  timeOfDay.text(hours[i]);
  timeOfDay.attr("id", hours[i]);
  timeSlot.append(timeOfDay);

  var eventInput = $("<input>");
  timeSlot.append(eventInput);

  var saveButton = $("<button>");
  saveButton.text("Save");
  timeSlot.append(saveButton);

  calendarBody.append(timeSlot);
  //   console.log(timeOfDay);
}

//Store Input to local storage

function saveEvent() {
  console.log(userEvents);
  var target = $(this);
  var eventName = target.siblings("input").val();
  var selectedTimeSlot = target.siblings("h1").text();
  userEvents[selectedTimeSlot] = eventName;
  console.log(userEvents);
  localStorage.setItem("Event", JSON.stringify(userEvents));
}

//Retrieve stored Event
function displayEvent() {
  viewEvent = JSON.parse(localStorage.getItem("Event"));
  console.log(viewEvent);
  for (var i = 0; i < hours.length; i++) {
    var objectValue = viewEvent[hours[i]];
    console.log(objectValue);
    if (objectValue === undefined) {
      console.log("nothing here");
    }
    var timeSlot = $("#" + hours[i]).siblings("input");
    console.log(timeSlot);
    timeSlot.val(objectValue);
  }
}

displayEvent();
$("button").on("click", saveEvent);

// // get the text
// var text = $("#test").text();

// // set the item in localStorage
// localStorage.setItem("test", text);

// // alert the value to check if we got it
// alert(localStorage.getItem("test"));
