$(document).ready(function() {
  // show day and month
  function updateCurrentDay() {
    var currentDay = dayjs().format("dddd, MMMM D");
    $("#currentDay").text("Today is " + currentDay);
  }
  // make it automatically update to current day
  updateCurrentDay();
});
$(document).ready(function() {
  // function to update the color of time blocks based on current time
  function updateColors() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      // remove any preexisting colors
      $(this).removeClass("past present future");
      // add color based on current hour
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }
  updateColors();
  // function to save user input to local storage
  $(".saveBtn").on("click", function() {
    var userValue = $(this).siblings(".description").val();
    var currHour = $(this).parent().attr("id").split("-")[1];
    localStorage.setItem("hour-" + currHour, userValue);
  });

  // function to load saved events from local storage onto each element
  function loadEvents() {
    $(".time-block").each(function() {
      var blockHour = $(this).attr("id").split("-")[1];
      var savedEvent = localStorage.getItem("hour-" + blockHour);
      if (savedEvent !== null) {
        $(this).children(".description").val(savedEvent);
      }
    });
  }
  loadEvents();
});
