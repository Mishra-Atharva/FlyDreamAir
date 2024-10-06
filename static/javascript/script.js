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
    }
    get_data();
};

function get_data() {
    var server = new XMLHttpRequest();

    server.open("GET", "/get_data", true);
    server.onload = function() {
        if (server.status == 200) {
            details = JSON.parse(server.responseText);
        }
    }
    server.send();
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