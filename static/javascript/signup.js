var login_div = document.getElementById("cover");
var email = document.getElementById("email_input");
var password = document.getElementById("password_input");
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
    get_data();
    var logged = localStorage.getItem("logged in");
    if (logged)
    {
        document.getElementById("account").style.display = "none";
        document.getElementById("logout").style.display = "flex";
    }
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


function validate(password) {
    let upper_bool = false;
    let lower_bool = false;
    let special_bool = false;
    const special = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    if (password.length >= 8 && password.length <= 16) {
        for (var i = 0; i < password.length; ++i) {
            for (var x = 0; x < letters.length; ++x) {
                if (password[i] == letters[x]) {
                    upper_bool = true;
                    break;
                }
            }
            for (var x = 0; x < letters.length; ++x) {
                if (password[i] == letters[x].toLowerCase()) {
                    lower_bool = true;
                    break;
                }
            }
            for (var x = 0; x < special.length; ++x) {
                if (password[i] == special[x]) {
                    special_bool = true;
                    break;
                }
            }
        }
    }

    if (upper_bool == true, lower_bool == true, special_bool == true) {
        document.getElementById("password").style.borderColor =  "black";
        return true;
    } else {
        document.getElementById("password").style.borderColor =  "red";
        return false;
    }
}



function update() {
    var create = false;
    var pass = false;
    let items = [
        document.getElementById("first_name"),
        document.getElementById("last_name"),
        document.getElementById("dob"),
        document.getElementById("address"),
        document.getElementById("email")
    ];

    if (validate(document.getElementById("password").value) == true) {
        pass = true;
    }

    items.forEach(item => {
        if (item.value != "")
        {
            item.style.borderColor = "black";
            create = true;
        } else {
            item.style.borderColor = "red";
            create = false;
        }
    });


    if (document.getElementById("accept").checked == true && create && pass) 
    {
        var new_user =  {
            "name": document.getElementById("first_name").value + " " + document.getElementById("last_name").value,
            "birth": document.getElementById("dob").value,
            "address": document.getElementById("address").value,
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value,
            "flynumber": Math.abs(Math.floor(Math.random() * (10000000000 - 99999999999 + 1) + 10000000000)),
            "status": "silver",
            "miles": 0,
            "expires": "1/01/2025",
            "cart": [],
            "purchased": []
        }
    
        details.push(new_user);
        
        var jsonData = JSON.stringify(details, null, 2);
        
        let server = new XMLHttpRequest();
        server.open("POST", "/update_data", true);
        server.setRequestHeader("Content-Type", "application/json");
        server.onload = function() {
            if (server.status === 200) {
                console.log("Data updated successfully!");
            }
        };
        server.send(jsonData);

        window.location.replace("/");
    }
}