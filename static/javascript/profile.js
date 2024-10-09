var login_div = document.getElementById("cover");
var email = document.getElementById("email");
var password = document.getElementById("password");
var remember = document.getElementById("remember");
var details;
var user;
var percent;
var gold = 500000;
var silver = 150000;
var logged;

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

function get_data() {
    var server = new XMLHttpRequest();

    server.open("GET", "/get_data", true);
    server.onload = function() {
        if (server.status == 200) {
            details = JSON.parse(server.responseText);
            logged = localStorage.getItem("logged in");
            if (logged == 'true') {
                user = JSON.parse(localStorage.getItem("user"));
                for (var i = 0; i < details.length; ++i) {
                    if (details[i]["email"] == user["email"]) {
                        localStorage.clear();
                        localStorage.setItem("logged in", true);
                        localStorage.setItem("user", JSON.stringify(details[i]));
                    }
                }
                logged_in();
            }
        }
    };
    server.send();
}

window.onload = function() {
    document.body.style.visibility = 'visible';
    get_data();
};

function logged_in() {
    document.getElementById("account").style.display = "none";
    document.getElementById("logout").style.display = "flex";

    document.getElementById("flynumber").innerHTML = "FlyHigh: " + user["flynumber"];
    document.getElementById("miles").innerHTML = user["miles"] + " Flyer Miles";
    document.getElementById("name").innerHTML = user["name"];
    document.getElementById("email_account").innerHTML = user["email"];
    document.getElementById("birth").innerHTML = user["birth"];
    document.getElementById("membership").innerHTML = user["status"];

    calculate();

    var background = "conic-gradient(rgb(193, 174, 112) 0% " + percent + "%, lightgray " + percent + "% 100%)";
    document.getElementById("progress").style.background = background;
    document.getElementById("miles_display").innerHTML = user["miles"];
    document.getElementById("expire").innerHTML = "Expires - " +user["expires"];

    var items = user['purchased'];
    items.forEach(item => {
        var div = `<div class="card">
                    <img src="${item["image"]}" alt="">
                    <h3>${item["item"]}</h3>
                </div>`;

        document.querySelector(".screen").innerHTML += div;
    });
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
            window.location.replace("/account_summary");
        }
    }
}

function logout() {
    localStorage.clear();
    window.location.replace("/");
}

function calculate()
{
    if (user['status'] == "silver")
    {
        percent = (parseInt(user["miles"]) / gold ) * 100;
    }

    if (user['status'] == "gold")
    {
        percent = (parseInt(user["miles"]) / 1000000) * 100;
    }
}