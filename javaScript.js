window.onload = function () {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        document.getElementById("1bh").style.display = "block";
        document.getElementById("2bh").style.display = "block";
        document.getElementById("3bh").style.display = "block";
        document.getElementById("authContainer").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
        document.getElementById("notificationBtn").style.display = "inline-block";

        if (loggedInUser.numRooms) {
            displayRooms(loggedInUser.numRooms);
        }
    }
};

function signup() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!name || !email || !password) {
        alert("All fields are required for sign-up.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === email)) {
        alert("Email already registered. Please sign in.");
        return;
    }

    users.push({ name, email, password, numRooms: 0, roomData: {} });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign-up successful! Please sign in.");
    window.location.href = "Sign-in.html";
}

function signin() {
    const email = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-password").value.trim();

    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    let user = storedUsers.find(user => user.email === email && user.password === password);
    
    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Incorrect email or password.");
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully.");
    window.location.href = "index.html";
}
function checkRoomToDateNotifications(roomData) {
    const today = new Date().toISOString().split('T')[0];

    for (let roomId in roomData) {
        if (roomData.hasOwnProperty(roomId)) {
            let room = roomData[roomId];
            if (room.to === today) {
                addNotification(`Room ${roomId} is expiring today.`);
            }
        }
    }
}
