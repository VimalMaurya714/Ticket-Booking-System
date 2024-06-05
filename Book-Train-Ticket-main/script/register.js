const dashboard = JSON.parse(localStorage.getItem("dashboard")) || []; // If 'dashboard' not found in localStorage then set empty array as value.

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const idInput = document.getElementById("id");
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const fromInput = document.getElementById("from");
  const toInput = document.getElementById("to");
  const dateInput = document.getElementById("date");
  const seatTypeInput = document.getElementById("seat-type");

  let userData = {
    userID: idInput.value,
    userName: nameInput.value,
    ageInput: ageInput.value,
    fromInput: fromInput.value,
    toInput: toInput.value,
    dateInput: formatDate(dateInput.value),
    seatTypeInput: seatTypeInput.value,
    otp: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
  };

  validateUserData(userData);
});

// Validating User Data function definition.
function validateUserData(userData) {
  // Validating Unique User ID.
  for (let i = 0; i < dashboard.length; i++) {
    if (userData.userID === dashboard[i].userID) {
      alert(`Please Enter Unique User ID.`);
      return (document.getElementById("id").value = "");
    }
  }

  // Validating Destination Choice.
  const fromInput = document.getElementById("from");
  const toInput = document.getElementById("to");

  if (fromInput.value === toInput.value) {
    return alert(
      `Choose Different Destination!\nYour Destination can't be same MAN...`
    );
  }

  // Validating Date.
  const today = new Date();
  let userDate = userData.dateInput.replace("-", "").replace("-", "").split("").slice(0, 2).join("");
  let userMonth = userData.dateInput.replace("-", "").replace("-", "").split("").slice(2, 4).join("");
  let userYear = userData.dateInput.replace("-", "").replace("-", "").split("").slice(-4).join("");

  if (today > Number(userDate)) {
    if (today.getFullYear() > Number(userYear)) {
      return alert("Invalid Year!");
    } else if (today.getMonth() > Number(userMonth)) {
      return alert("Invalid Month!");
    } else if (today.getDate() > Number(userDate)) {
      return alert("Invalid Date!");
    }
  }

  // अंतिम पग.
  dashboard.push(userData); // Pushing object in array.
  localStorage.setItem("dashboard", JSON.stringify(dashboard)); // Saving data into the Local Storage.
  alert(`Your OTP is ${userData.otp}\n\nYour form is submitted successfully.`);
  form.reset();
}

function formatDate(dateString) {
  // let newDate = dateString.replace("-", "").replace("-", "").split("");
  // let day = newDate.slice(-2).join("");
  // let month = newDate.slice(4, 6).join("");
  // let year = newDate.slice(0, 4).join("");
  // return `${day}-${month}-${year}`;
  // return `${newDate.slice(-2).join("")}-${newDate.slice(4, 6).join("")}-${newDate.slice(0, 4).join("")}`;
  return `${dateString.replace("-", "").replace("-", "").split("").slice(-2).join("")}-${dateString.replace("-", "").replace("-", "").split("").slice(4, 6).join("")}-${dateString.replace("-", "").replace("-", "").split("").slice(0, 4).join("")}`;
}

// Attach click event listener to Delete DB button.
document.getElementById("delete-db-btn").addEventListener("click", () => {
  if (confirm("Do you want to delete entire Local Storage?")) {
    localStorage.clear();
    alert("All Data has been deleted!");
  }
});