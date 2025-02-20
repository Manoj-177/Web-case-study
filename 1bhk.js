// Function to verify and display rooms
function verification1BHK() {
    var numRooms = document.getElementById("num1").value;
    if (numRooms === "" || isNaN(numRooms) || numRooms <= 0) {
        alert("Please enter a valid number of rooms.");
        return false;
    }

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        loggedInUser.numRooms1BHK = numRooms;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        updateUserData(loggedInUser);
    }

    displayRooms1BHK(numRooms);
}

// Function to display rooms
function displayRooms1BHK(numRooms) {
    let boxContainer = document.getElementById("boxContainer"); // Corrected ID
    boxContainer.innerHTML = "";

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let savedData = loggedInUser?.roomData1BHK || {};

    for (let i = 1; i <= numRooms; i++) {
        let roomData = savedData[i] || {};

        let box = document.createElement("div");
        box.className = "box";
        box.style.backgroundColor = roomData.submitted ? "red" : "white";

        box.innerHTML = `
            <h3>1BHK Room ${i}</h3>
            <label>Name:</label> <input type="text" id="name1${i}" value="${roomData.name || ""}" placeholder="Enter name"><br>
            <label>Phone:</label> <input type="tel" id="phone1${i}" value="${roomData.phone || ""}" placeholder="Enter phone"><br>
            <label>From:</label> 
            <input type="date" id="from1${i}" value="${roomData.from || new Date().toISOString().split('T')[0]}" min="${new Date().toISOString().split('T')[0]}"><br>
            <label>To:</label> 
            <input type="date" id="to1${i}" value="${roomData.to || new Date().toISOString().split('T')[0]}" min="${new Date().toISOString().split('T')[0]}"><br>
            <label>Paid:</label>
            <select id="paid1${i}">
                <option value="Not Paid" ${roomData.paid === "Not Paid" ? "selected" : ""}>Not Paid</option>
                <option value="Paid" ${roomData.paid === "Paid" ? "selected" : ""}>Paid</option>
            </select><br>
            <button onclick="submitRoom1BHK(${i})">Submit</button>
        `;
        boxContainer.appendChild(box);
    }
}


// Function to handle room submission
function submitRoom1BHK(roomNum) {
    let name = document.getElementById(`name1${roomNum}`).value;
    let phone = document.getElementById(`phone1${roomNum}`).value;
    let from = document.getElementById(`from1${roomNum}`).value;
    let to = document.getElementById(`to1${roomNum}`).value;
    let paid = document.getElementById(`paid1${roomNum}`).value;

    if (!name || !phone || !from || !to) {
        alert("Please fill all fields.");
        return;
    }

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    loggedInUser.roomData1BHK = loggedInUser.roomData1BHK || {};
    loggedInUser.roomData1BHK[roomNum] = { name, phone, from, to, paid, submitted: true };
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    updateUserData(loggedInUser);

    document.querySelector(`.box:nth-child(${roomNum})`).style.backgroundColor = "red";
}

// Function to update user data in localStorage
function updateUserData(updatedUser) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userIndex = users.findIndex(user => user.email === updatedUser.email);

    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
    }
}

// Load data on page load
window.onload = function () {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.numRooms1BHK) {
        displayRooms1BHK(loggedInUser.numRooms1BHK);
    }
};
