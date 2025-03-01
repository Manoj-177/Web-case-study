function verification2BHK() {
    var numRooms = document.getElementById("num2").value;
    if (numRooms === "" || isNaN(numRooms) || numRooms <= 0) {
        alert("Please enter a valid number of rooms.");
        return;
    }

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        loggedInUser.numRooms2BHK = numRooms;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        updateUserData(loggedInUser);
    }

    displayRooms2BHK(numRooms);
}

// Function to display 2BHK rooms
function displayRooms2BHK(numRooms) {
    let boxContainer = document.getElementById("boxContainer2BHK");
    boxContainer.innerHTML = "";

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    let savedData = loggedInUser.roomData2BHK || {};

    for (let i = 1; i <= numRooms; i++) {
        let roomData = savedData[i] || {};
        let box = document.createElement("div");
        box.className = "box";
        box.style.backgroundColor = roomData.submitted ? "red" : "white";

        box.innerHTML = `
            <h3>2BHK Room ${i}</h3>
            <label>Name:</label> <input type="text" id="name2${i}" value="${roomData.name || ""}" placeholder="Enter name"><br>
            <label>Phone:</label> <input type="tel" id="phone2${i}" value="${roomData.phone || ""}" placeholder="Enter phone"><br>
            <label>From:</label> <input type="date" id="from2${i}" value="${roomData.from || new Date().toISOString().split('T')[0]}" min="${new Date().toISOString().split('T')[0]}"><br>
            <label>To:</label> <input type="date" id="to2${i}" value="${roomData.to || new Date().toISOString().split('T')[0]}" min="${new Date().toISOString().split('T')[0]}"><br>
            <label>Paid:</label>
            <select id="paid2${i}">
                <option value="Not Paid" ${roomData.paid === "Not Paid" ? "selected" : ""}>Not Paid</option>
                <option value="Paid" ${roomData.paid === "Paid" ? "selected" : ""}>Paid</option>
            </select><br>
            <button onclick="submitRoom2BHK(${i})">Submit</button>
        `;
        boxContainer.appendChild(box);
    }
}

// Function to handle 2BHK room submission
function submitRoom2BHK(roomNum) {
    let name = document.getElementById(`name2${roomNum}`).value;
    let phone = document.getElementById(`phone2${roomNum}`).value;
    let from = document.getElementById(`from2${roomNum}`).value;
    let to = document.getElementById(`to2${roomNum}`).value;
    let paid = document.getElementById(`paid2${roomNum}`).value;

    if (!name || !phone || !from || !to) {
        alert("Please fill all fields.");
        return;
    }

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    loggedInUser.roomData2BHK = loggedInUser.roomData2BHK || {};
    loggedInUser.roomData2BHK[roomNum] = { name, phone, from, to, paid, submitted: true };
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    updateUserData(loggedInUser);

    document.querySelector(`.box:nth-child(${roomNum})`).style.backgroundColor = "red";
}

// Function to update user data across sessions
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
    if (loggedInUser && loggedInUser.numRooms2BHK) {
        displayRooms2BHK(loggedInUser.numRooms2BHK);
    }
};
