login_div = document.getElementById("cover");
email = document.getElementById("email");
password = document.getElementById("password");
remember = document.getElementById("remember");

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
};


function makeAJAXQuery() {

    // creates an XMLHttpRequest
    var xhttp = new XMLHttpRequest();

    // creates an handler for the readyState change
    xhttp.onreadystatechange = function () {

        // Calling readSateChangeHandler function
        readyStateChangeHandler(xhttp);
    };

    // Gets JSON file
    xhttp.open("GET", "user.json", true);
    xhttp.send();
}

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
    var display = document.getElementById("display");
    display.innerHTML = "XMLHttpRequest failed: status " + xhttp.status;
}

// If success
function handleStatusSuccess(xhttp) {
    var jsonText = xhttp.responseText;

    var details = JSON.parse(jsonText);

    displayDetails(details);
}