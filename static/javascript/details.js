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
    document.getElementById("dob").innerHTML = user["birth"];
    document.getElementById("nationality").innerHTML = user["nationality"];
    document.getElementById("gender").innerHTML = user["gender"];
    document.getElementById("passport_number").innerHTML = user["passport_number"];
    document.getElementById("passport_issue").innerHTML = user["place_of_issue"];
    document.getElementById("passport_expire").innerHTML = user["passport_expire"];
    document.getElementById("emailaddress").innerHTML = user["email"];
    document.getElementById("number").innerHTML = user["phone_number"];
    document.getElementById("address").innerHTML = user["address"];
}


function login() {

    for (var i = 0; i < details.length; ++i)
    {
        if (email.value == details[i]["email"])
        {
            console.log("found");
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

function closePersonal() {
    document.querySelector(".blind").style.display = "none";
    document.querySelector(".contain_personal").style.display = "none";
}

function updatePersonal() {
    if (logged)
    {
        document.querySelector(".blind").style.display = "flex";
        document.querySelector(".contain_personal").style.display = "flex";
        document.querySelector("#full_name").value = document.querySelector("#name").textContent;
        document.querySelector("#birth").value = document.querySelector("#dob").textContent;
        document.querySelector("#nation").value = document.querySelector("#nationality").textContent;
    }
    if (document.querySelector("#gender").textContent == "Male") {
        document.querySelector("#user_gender").value = "M";
    } else if (document.querySelector("#gender").textContent == "Female") {
        document.querySelector("#user_gender").value = "F";
    } else {
        document.querySelector("#user_gender").value = "N";
    }
}

function closePassport() {
    document.querySelector(".blind").style.display = "none";
    document.querySelector(".contain_passport").style.display = "none";
}

function updatePassport() {
    if (logged)
    {
        document.querySelector(".blind").style.display = "flex";
        document.querySelector(".contain_passport").style.display = "flex";
        document.querySelector("#pass_num").value = document.querySelector("#passport_number").textContent;
        document.querySelector("#issue").value = document.querySelector("#passport_issue").textContent;
        document.querySelector("#expire").value = document.querySelector("#passport_expire").textContent;
    }
}

function closeContact() {
    document.querySelector(".blind").style.display = "none";
    document.querySelector(".contain_contact").style.display = "none";
}

function updateContact() {
    if (logged)
    {
        document.querySelector(".blind").style.display = "flex";
        document.querySelector(".contain_contact").style.display = "flex";
        document.querySelector("#email_address").value = document.querySelector("#emailaddress").textContent;
        document.querySelector("#phone").value = document.querySelector("#number").textContent;
        document.querySelector("#home_address").value = document.querySelector("#address").textContent;
    }
}