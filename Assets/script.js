var hours = ["9am", "10am", "11am", "Noon", "1pm", "2pm", "3pm", "4pm", "5pm"];
var calendarBody = $(".calendar-body");

//Create Calendar blocks. Date/Input/Save button

for (var i = 0; i < hours.length; i++) {
  var timeOfDay = $("<h1>");
  timeOfDay.text(hours[i]);
  calendarBody.append(timeOfDay);

  var eventInput = $("<input>");
  calendarBody.append(eventInput);

  var saveButton = $("<button>");
  saveButton.text("Save");
  calendarBody.append(saveButton);
}
