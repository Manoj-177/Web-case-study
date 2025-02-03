function verification() {
    var numRooms = document.getElementById("num1").value;
    if (numRooms === "" || isNaN(numRooms) || numRooms <= 0) {
        alert("Please enter a valid number of rooms.");
        return false;
    }
    let form = document.getElementById("form");
    form.style.display = "none";
    let boxContainer = document.getElementById("boxContainer");
    boxContainer.innerHTML = "";
    for (let i = 1; i <= numRooms; i++) {
        let box = document.createElement("div");
        box.className = "box";
        box.innerHTML = 
           ` <h3>Room ${i}</h3>
            <label>Name:</label> <input type="text" id="name${i}" placeholder="Enter name"><br>
            <label>Phone:</label> <input type="tel" id="phone${i}" placeholder="Enter phone"><br>
            <label>From:</label> <input type="date" id="time${i}"><br>
            <label>To:</label> <input type="date" id="time${i}"><br>
            <label>Paid:</label>
            <select id="paid${i}">
                <option value="Not Paid">Not Paid</option>
                <option value="Paid">Paid</option>
            </select><br>
            <input type="submit"></input>`
        ;
        boxContainer.appendChild(box);
    }
}
function displayRooms(numRooms) {
    let boxContainer = document.getElementById("boxContainer");
    boxContainer.innerHTML = "";  // Clear previous content

    for (let i = 1; i <= numRooms; i++) {
        let box = document.createElement("div");
        box.className = "box";
        box.innerHTML = 
           `<h3>Room ${i}</h3>
            <label>Name:</label> <input type="text" id="name${i}" placeholder="Enter name"><br>
            <label>Phone:</label> <input type="tel" id="phone${i}" placeholder="Enter phone"><br>
            <label>From:</label> <input type="date" id="from${i}"><br>
            <label>To:</label> <input type="date" id="to${i}"><br>
            <label>Paid:</label>
            <select id="paid${i}">
                <option value="Not Paid">Not Paid</option>
                <option value="Paid">Paid</option>
            </select><br>
            <input type="submit"></input>`;
        boxContainer.appendChild(box);
    }
}
window.onload = function () {
    if (localStorage.getItem("loggedInUser")) {
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        document.getElementById("1bh").style.display = "block";
        document.getElementById("2bh").style.display = "block";
        document.getElementById("3bh").style.display = "block";
        document.getElementById("authContainer").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
        console.log("Logged in user:", loggedInUser);
    }
};

let users = JSON.parse(localStorage.getItem("users")) || [];  // Retrieve stored users

function signup() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!name || !email || !password) {
        alert("All fields are required for sign-up.");
        return;
    }

    // Check if user already exists
    if (users.some(user => user.email === email)) {
        alert("Email already registered. Please sign in.");
        return;
    }

    // Store new user
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("signupmsg").textContent = "Sign up successful!";
    alert("Sign-up successful. You can now log in.");
    window.location.href = "Sign-in.html"; // Redirect to sign-in page
}
function signin() {
    const email = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-password").value.trim();

    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    let user = storedUsers.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));  // Store logged-in user session
        localStorage.setItem("isLoggedIn", "true");  
        alert("Login successful!");
        window.location.href = "index.html";  // Redirect to home page
    } else {
        alert("Incorrect email or password.");
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");    
    localStorage.removeItem("loggedInUser");  // Remove only session data, not users
    alert("Logged out successfully.");
    window.location.href = "index.html"; 
}

