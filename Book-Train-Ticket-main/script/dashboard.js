const dashboard = JSON.parse(localStorage.getItem("dashboard")) || [];
const booking = JSON.parse(localStorage.getItem("booking")) || [];

let newDashboardArr = dashboard;

let tBody = document.querySelector("tbody");

function renderDashboard(data) {
  // Function to render the dashboard data.
  tBody.innerHTML = ""; // Clear the existing table body.

  data.forEach((object, index) => {
    // Loop through each object in the dashboard array.
    let tRow = document.createElement("tr"); // Create a new table row for each object.

    // Create table cells for each data field.
    let userID = createTableCell(object.userID);
    let userName = createTableCell(object.userName);
    let ageInput = createTableCell(object.ageInput);
    let fromInput = createTableCell(object.fromInput);
    let toInput = createTableCell(object.toInput);
    let dateInput = createTableCell(object.dateInput);
    let seatTypeInput = createTableCell(object.seatTypeInput);

    // Create Reject button.
    let rejectButtonRow = document.createElement("td");
    let rejectButton = document.createElement("button");
    rejectButton.setAttribute("class", "reject-btn");
    rejectButton.innerText = "Reject";
    rejectButtonRow.appendChild(rejectButton);

    // Attach click event listener to reject button.
    rejectButton.addEventListener("click", () => {
      let confirmAction = confirm("Remove this user from Dashboard?");
      if (confirmAction) {
        data.splice(index, 1); // Remove the corresponding object from the array.
        localStorage.setItem("dashboard", JSON.stringify(data)); // Update the localStorage with the modified dashboard array
        renderDashboard(data); // Render the dashboard again to reflect the changes.
      }
    });

    // Create Confirm button.
    let confirmButtonRow = document.createElement("td");
    let confirmButton = document.createElement("button");
    confirmButton.setAttribute("class", "confirm-btn");
    confirmButton.innerText = "Confirm";
    confirmButtonRow.appendChild(confirmButton);

    // Attach click event listener to confirm button.
    confirmButton.addEventListener("click", (event) => {
      let userInput = prompt(`Enter your OTP`);
      if (object.otp == userInput) {
        alert(`Added ${object.userName} to waiting list!`);
        /* Promise to handle asynchronous operation of adding user to waiting list and confirming booking. */
        new Promise((resolve, reject) => {
          setTimeout(() => {
            alert(`${object.userName}, Your ticket is booking.`);
            resolve();
          }, 5000);
        }).then(() => {
          setTimeout(() => {
            alert(
              `Congratulations ${object.userName}!\n\nYour ticket is booked from '${object.fromInput}' to '${object.toInput}' on '${object.dateInput}'.`
            );
            booking.push(object);
            localStorage.setItem("booking", JSON.stringify(booking));
            data.splice(index, 1); // Remove the corresponding object from the array.
            localStorage.setItem("dashboard", JSON.stringify(data)); // Update the localStorage with the modified dashboard array.
            renderDashboard(data); // Render the dashboard again to reflect the changes.
          }, 5000);
        });
      } else if (userInput == null) {
        return;
      } else {
        return alert(`Invalid OTP :(`);
      }
    });

    // Append all table cells to the table row.
    tRow.append(
      userID,
      userName,
      ageInput,
      fromInput,
      toInput,
      dateInput,
      seatTypeInput,
      rejectButtonRow,
      confirmButtonRow
    );

    tBody.appendChild(tRow); // Append the table row to the table body.
  });
}
// Function to create a table cell with given text content
function createTableCell(text) {
  let cell = document.createElement("td");
  cell.innerText = text;
  return cell;
}

// Render the dashboard initially.
renderDashboard(dashboard);

/* Sort and Filter Section */
// Filter by Seats.
let seatType = document.querySelector("#filter-by-seat");
seatType.addEventListener("change", (event) => {
  newDashboardArr = dashboard.filter(
    (object) => event.target.value === object.seatTypeInput
  );
  renderDashboard(newDashboardArr);

  if (event.target.value === "All") renderDashboard(dashboard);
});

// Sort by Age: Ascending/Descending.
let sortByAge = document.querySelector("#sort-by-age");
sortByAge.addEventListener("change", (event) => {
  let sortedArr = [];

  if (event.target.value === "descending") {
    sortedArr = newDashboardArr.sort(function (a, b) {
      return Number(b.ageInput) - Number(a.ageInput);
    });
  } else {
    sortedArr = newDashboardArr.sort(function (a, b) {
      return Number(a.ageInput) - Number(b.ageInput);
    });
  }
  renderDashboard(sortedArr);
});

// Sort by Date: Ascending/Descending.
let sortByDate = document.querySelector("#sort-by-date");
sortByDate.addEventListener("change", (event) => {
  let sortedArr = [];

  if (event.target.value === "descending") {
    sortedArr = newDashboardArr.sort(function (a, b) {
      return (Number(b.dateInput.replace("-", "").replace("-", "")) - Number(a.dateInput.replace("-", "").replace("-", ""))
      );
    });
  } else {
    sortedArr = newDashboardArr.sort(function (a, b) {
      return (Number(a.dateInput.replace("-", "").replace("-", "")) - Number(b.dateInput.replace("-", "").replace("-", "")));
    });
  }
  renderDashboard(sortedArr);
});
