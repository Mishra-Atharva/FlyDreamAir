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
    console.log(logged);
    if (logged)
    {
        document.getElementById("account").style.display = "none";
        document.getElementById("logout").style.display = "flex";
    }
    else {
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
    }
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
    console.log("Details are loaded!");
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
            window.location.replace("../profile/profile_summary.html");
        }

        // to see if info stored is there
        var info = JSON.parse(localStorage.getItem("user"));
        console.log(info);
    }
}

function logout() {
    localStorage.clear();
    window.location.replace("../index.html");
}