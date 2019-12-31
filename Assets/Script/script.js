var hours = [
  "9 am",
  "10 am",
  "11 am",
  "12 pm",
  "1 pm",
  "2 pm",
  "3 pm",
  "4 pm",
  "5 pm"
];
var calendarBody = $(".calendar-body");
var calendarEvent;
var userEvents = {};
var viewEvent;
var today = new Date();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

//Make sure the correct info displays on refresh
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
  timeOfDay.attr("data-time", i + 9);
  timeSlot.append(timeOfDay);

  var eventInput = $("<input>");
  timeSlot.append(eventInput);

  var saveButton = $("<button>");
  saveButton.text("Save");
  timeSlot.append(saveButton);

  calendarBody.append(timeSlot);
}

//Store Input to local storage
function saveEvent() {
  console.log(userEvents, "first call");
  var target = $(this);
  var eventName = target.siblings("input").val();
  var selectedTimeSlot = target.siblings("h1").text();
  userEvents[selectedTimeSlot] = eventName;
  console.log(userEvents, "called in function");
  localStorage.setItem("Event", JSON.stringify(userEvents));
}

//Retrieve stored Event
function displayEvent() {
  viewEvent = JSON.parse(localStorage.getItem("Event"));
  // console.log(viewEvents);
  for (var i = 0; i < hours.length; i++) {
    var objectValue = viewEvent[hours[i]];
    console.log(objectValue, "p am value");
    if (objectValue === undefined) {
      console.log("nothing here");
    }
    var timeSlot = $("#" + hours[i]).siblings("input");
    timeSlot.attr("value", objectValue);
    console.log(timeSlot, objectValue, "input filed");
  }
}

//Change color of input based on time

function setCalendarColor() {
  var localTime = moment().hour();
  var hoursEl = $("h1");
  var inputAreas = $("input");
  console.log($(hoursEl[0]).attr("data-time"), localTime);

  for (var i = 0; i < hoursEl.length; i++) {
    if (localTime > $(hoursEl[i]).attr("data-time")) {
      $(inputAreas[i]).css("background-color", "red");
    }
    if (localTime < $(hoursEl[i]).attr("data-time")) {
      $(inputAreas[i]).css("background-color", "yellow");
    }
  }
}

setCalendarColor();
displayEvent();
$("button").on("click", saveEvent);

// // get the text
// var text = $("#test").text();

// // set the item in localStorage
// localStorage.setItem("test", text);

// // alert the value to check if we got it
// alert(localStorage.getItem("test"));
