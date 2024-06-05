const booking = JSON.parse(localStorage.getItem("booking")) || [];
let newBookingArr = booking;

let tBody = document.querySelector("tbody");

// Function to render the dashboard data
function renderBooking(data) {
  tBody.innerHTML = ""; // Clear the existing table body

  // Loop through each object in the dashboard array
  data.forEach((object) => {
    let tRow = document.createElement("tr"); // Create a new table row for each object

    // Create table cells for each data field
    let userID = createTableCell(object.userID);
    let userName = createTableCell(object.userName);
    let ageInput = createTableCell(object.ageInput);
    let fromInput = createTableCell(object.fromInput);
    let toInput = createTableCell(object.toInput);
    let dateInput = createTableCell(object.dateInput);
    let seatTypeInput = createTableCell(object.seatTypeInput);

    // Append all table cells to the table row
    tRow.append(
      userID,
      userName,
      ageInput,
      fromInput,
      toInput,
      dateInput,
      seatTypeInput
    );

    tBody.appendChild(tRow); // Append the table row to the table body
  });
}

// Function to create a table cell with given text content
function createTableCell(text) {
  let cell = document.createElement("td");
  cell.innerText = text;
  return cell;
}

renderBooking(booking); // Render the bookings initially.

/* Sort and Filter Section */
// Filter by Seats.
let seatType = document.querySelector("#filter-by-seat");
seatType.addEventListener("change", (event) => {
  newBookingArr = booking.filter(
    (object) => event.target.value === object.seatTypeInput
  );
  renderBooking(newBookingArr);
  if (event.target.value === "All") renderBooking(booking);
});

// Sort by Age: Ascending/Descending.
let sortedArr = [];
let sortByAge = document.querySelector("#sort-by-age");
sortByAge.addEventListener("change", (event) => {

  if (event.target.value === "descending") {
    sortedArr = newBookingArr.sort(function (a, b) {
      return Number(b.ageInput) - Number(a.ageInput);
    });
  } else {
    sortedArr = newBookingArr.sort(function (a, b) {
      return Number(a.ageInput) - Number(b.ageInput);
    });
  }
  renderBooking(sortedArr);
});

// Sort by Date: Ascending/Descending.
let sortByDate = document.querySelector("#sort-by-date");
sortByDate.addEventListener("change", (event) => {
  if (event.target.value === "descending") {
    sortedArr = newBookingArr.sort(function (a, b) {
      return (Number(b.dateInput.replace("-", "").replace("-", "")) - Number(a.dateInput.replace("-", "").replace("-", ""))
      );
    });
  } else {
    sortedArr = newBookingArr.sort(function (a, b) {
      return (Number(a.dateInput.replace("-", "").replace("-", "")) - Number(b.dateInput.replace("-", "").replace("-", "")));
    });
  }
  renderBooking(sortedArr);
});
