function verification3BHK() {
    var numRooms = document.getElementById("num3").value;
    if (numRooms === "" || isNaN(numRooms) || numRooms <= 0) {
        alert("Please enter a valid number of rooms.");
        return false;
    }

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        loggedInUser.numRooms3BHK = numRooms;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        updateUserData(loggedInUser);
    }

    displayRooms3BHK(numRooms);
}

function displayRooms3BHK(numRooms) {
    let boxContainer = document.getElementById("boxContainer3BHK");
    boxContainer.innerHTML = "";

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    let savedData = loggedInUser.roomData3BHK || {};

    for (let i = 1; i <= numRooms; i++) {
        let roomData = savedData[i] || {};

        let box = document.createElement("div");
        box.className = "box";
        box.style.backgroundColor = roomData.paid === "Not Paid" ? "yellow" : roomData.submitted ? "red" : "white";

        box.innerHTML = `
            <h3>3BHK Room ${i}</h3>
            <label>Name:</label> <input type="text" id="name3${i}" value="${roomData.name || ""}" placeholder="Enter name"><br>
            <label>Phone:</label> <input type="tel" id="phone3${i}" value="${roomData.phone || ""}" placeholder="Enter phone"><br>
            <label>From:</label> 
            <input type="date" id="from3${i}" value="${roomData.from || new Date().toISOString().split('T')[0]}" min="${new Date().toISOString().split('T')[0]}"><br>

            <label>To:</label> 
            <input type="date" id="to3${i}" value="${roomData.to || new Date().toISOString().split('T')[0]}" min="${new Date().toISOString().split('T')[0]}"><br>
            <label>Paid:</label>
            <select id="paid3${i}" onchange="updatePaymentStatus3BHK(${i})">
                <option value="Not Paid" ${roomData.paid === "Not Paid" ? "selected" : ""}>Not Paid</option>
                <option value="Paid" ${roomData.paid === "Paid" ? "selected" : ""}>Paid</option>
            </select><br>
            <button onclick="submitRoom3BHK(${i})">Submit</button>
        `;
        boxContainer.appendChild(box);
    }
}

function submitRoom3BHK(roomNum) {
    let name = document.getElementById(`name3${roomNum}`).value;
    let phone = document.getElementById(`phone3${roomNum}`).value;
    let from = document.getElementById(`from3${roomNum}`).value;
    let to = document.getElementById(`to3${roomNum}`).value;
    let paid = document.getElementById(`paid3${roomNum}`).value;

    if (!name || !phone || !from || !to) {
        alert("Please fill all fields.");
        return;
    }

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    loggedInUser.roomData3BHK = loggedInUser.roomData3BHK || {};
    loggedInUser.roomData3BHK[roomNum] = { name, phone, from, to, paid, submitted: true };
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    updateUserData(loggedInUser);
    updatePaymentStatus3BHK(roomNum);
}

function updatePaymentStatus3BHK(roomNum) {
    let paid = document.getElementById(`paid3${roomNum}`).value;
    let box = document.querySelector(`.box:nth-child(${roomNum})`);
    box.style.backgroundColor = paid === "Not Paid" ? "yellow" : "red";
}

// Update user data in localStorage
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
    if (loggedInUser && loggedInUser.numRooms3BHK) {
        displayRooms3BHK(loggedInUser.numRooms3BHK);
    }
};
