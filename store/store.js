var login_div = document.getElementById("cover");
var email = document.getElementById("email");
var password = document.getElementById("password");
var remember = document.getElementById("remember");
var details;
var user;

function login_show() {
    login_div.style.display = "flex";
    email.value = "";
    password.value = "";
    remember.checked = false;
}

document.getElementById("close").addEventListener("click", () => {
    login_div.style.display = "none";
    email.value = "";
    password.value = "";
    remember.checked = false;
});

window.onload = function() {
    document.body.style.visibility = 'visible';
    var logged = localStorage.getItem("logged in");
    if (logged)
    {
        document.getElementById("account").style.display = "none";
        document.getElementById("logout").style.display = "flex";
        document.getElementById("cart").style.display = "inline";
    } 

    // creates an XMLHttpRequest
    var xhttp = new XMLHttpRequest();

    // creates an handler for the readyState change
    xhttp.onreadystatechange = function () {

        // Calling readSateChangeHandler function
        readyStateChangeHandler(xhttp);
    };

    // Gets JSON file
    xhttp.open("GET", "../user.json", true);
    xhttp.send();
};

function readyStateChangeHandler(xhttp) {
    // Checks if the status is success or failure
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            handleStatusSuccess(xhttp);
        } else {
            handleStatusFailure(xhttp);
        }
    }
}

// If failure display error
function handleStatusFailure(xhttp) {
    console.log("XMLHttpRequest failed: status " + xhttp.status);
}

// If success
function handleStatusSuccess(xhttp) {
    var jsonText = xhttp.responseText;
    
    details = JSON.parse(jsonText);
}

function login() {

    for (var i = 0; i < details.length; ++i)
    {
        if (email.value == details[i]["email"])
        {
            user = details[i];
            break;
        }
    }

    if (user)
    {
        if (password.value == user["password"]) {
            localStorage.setItem("logged in", true);
            localStorage.setItem("user", JSON.stringify(user));
            login_div.style.display = "none";
            email.value = "";
            password.value = "";
            remember.checked = false;
            window.location.replace("store.html");
        }
    }
}

function logout() {
    localStorage.clear();
    window.location.replace("../index.html");
}











// BUY
const flight_buttons = document.querySelectorAll(".flight_btn");
const hotel_buttons = document.querySelectorAll(".hotel_btn");
const product_buttons = document.querySelectorAll(".product_btn");
var cart;

flight_buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        const item = event.target.closest("#card");

        if (item)
        {
            const destination = item.getAttribute('data-destination');
            const quantity = item.getAttribute('data-quantity');
            const price = item.getAttribute('data-price');
            const points = item.getAttribute('data-points');
            const image = item.getAttribute('data-image');
    
            cart = {
                "item": destination,
                "quantity": quantity,
                "price": price,
                "points": points,
                "image": image
            };
            updatefile();
        }
    });
});

hotel_buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        const item = event.target.closest("#card");

        if (item) 
        {
            const destination = item.getAttribute('data-destination');
            const quantity = item.getAttribute('data-quantity');
            const price = item.getAttribute('data-price');
            const points = item.getAttribute('data-points');
            const image = item.getAttribute('data-image');
    
            cart = {
                "item": destination,
                "quantity": quantity,
                "price": price,
                "points": points,
                "image": image
            };
            updatefile();
        }
    });
});

product_buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        const item = event.target.closest("#card");
        
        if (item) 
        {
            const product = item.getAttribute('data-product');
            const quantity = item.getAttribute('data-quantity');
            const price = item.getAttribute('data-price');
            const points = item.getAttribute('data-points');
            const image = item.getAttribute('data-image');
    
            cart = {
                "item": product,
                "quantity": quantity,
                "price": price,
                "points": points,
                "image": image
            };
            updatefile();
        }
    });
});

function updatefile() {
    var name = JSON.parse(localStorage.getItem("user"));
    name = name["name"];
    
    for (var i = 0; i < details.length; ++i) {
        if (details[i]["name"] == name)
        {
            details[i]["cart"].push(cart);
        }
    }

    var jsonData = JSON.stringify(details, null, 2);
    
    // NEW
    var server = new XMLHttpRequest();
    server.open("POST", "http://127.0.0.1:5000/update_data", true);
    server.setRequestHeader("Content-Type", "application/json");  // Set the content type to JSON

    server.onreadystatechange = function () {
        if (server.readyState === XMLHttpRequest.DONE) {
            if (server.status === 200) {
                console.log("Updated");
                console.log(JSON.parse(server.responseText)); // Log response if needed
            } else {
                console.error("Error updating data:", server.status, server.statusText);
            }
        }
    };
    
    server.send(JSON.stringify(jsonData));
}