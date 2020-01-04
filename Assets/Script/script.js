var hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
var calendarBody = $(".calendar-body");
var calendarEvent;
var userEvents = {};
var viewEvent;
var today = moment().format("MMMM Do YYYY");
// var time =
//   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

//Make sure the correct info displays on refresh
if (localStorage.getItem("Event") === null) {
  userEvents = {};
} else {
  userEvents = JSON.parse(localStorage.getItem("Event"));
}

$(".today").text(today);
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
  var target = $(this);
  var eventName = target.siblings("input").val();
  var selectedTimeSlot = target.siblings("h1").text();
  userEvents[selectedTimeSlot] = eventName;

  localStorage.setItem("Event", JSON.stringify(userEvents));
}

//Retrieve stored Event
function displayEvent() {
  viewEvent = JSON.parse(localStorage.getItem("Event"));
  // console.log(viewEvents);
  for (var i = 0; i < hours.length; i++) {
    var objectValue = viewEvent[hours[i]];

    if (objectValue === undefined) {
    }
    var timeSlot = $("#" + hours[i]).siblings("input");
    timeSlot.attr("value", objectValue);
  }
}

//Change color of input based on time

function setCalendarColor() {
  var localTime = moment().hour();
  var hoursEl = $("h1");
  var inputAreas = $("input");

  for (var i = 0; i < hoursEl.length; i++) {
    if (localTime > $(hoursEl[i]).attr("data-time")) {
      $(inputAreas[i]).css("background-color", "#6f6f6f");
    }
    if (localTime < $(hoursEl[i]).attr("data-time")) {
      $(inputAreas[i]).css("background-color", "#5f674a");
    }
  }
}

setCalendarColor();
displayEvent();
$("button").on("click", saveEvent);
