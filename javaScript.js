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
        box.innerHTML = `
            <h3>Room ${i}</h3>
            <label>Name:</label> <input type="text" id="name${i}" placeholder="Enter name"><br>
            <label>Phone:</label> <input type="tel" id="phone${i}" placeholder="Enter phone"><br>
            <label>From:</label> <input type="date" id="time${i}"><br>
            <label>To:</label> <input type="date" id="time${i}"><br>
            <label>Paid:</label>
            <select id="paid${i}">
                <option value="Not Paid">Not Paid</option>
                <option value="Paid">Paid</option>
            </select><br>
        `;
        boxContainer.appendChild(box);
    }
}
let userDetails = JSON.parse(localStorage.getItem("userDetails")) || {}; 
function signup() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    if (name && email && password) {
        userDetails = { name, email, password };
        localStorage.setItem("userDetails", JSON.stringify(userDetails)); 
        document.getElementById("signupmsg").textContent = "Sign up successful!";
        console.log("User signed up:", userDetails);
    } else {
        alert("All fields are required for sign-up.");
    }
}
window.onload = function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        document.getElementById("1bh").style.display = "block";
        document.getElementById("2bh").style.display = "block";
        document.getElementById("3bh").style.display = "block";
        document.getElementById("authContainer").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
    }
};
function signin() {
    const email = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-password").value.trim();
    const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {}; 

    if (!userDetails.email || !userDetails.password) {
        alert("No user found. Please sign up first.");
        return;
    }

    if (email === userDetails.email && password === userDetails.password) {
        localStorage.setItem("isLoggedIn", "true");  
        window.location.href = "index.html";
    } else {
        alert("Incorrect email or password.");
    }
}
function logout() {
    localStorage.removeItem("isLoggedIn"); 
    window.location.href = "index.html"; 
}
