var user;

window.onload = function() {
    document.body.style.visibility = 'visible';
    get_data();
    var logged = localStorage.getItem("logged in");
    if (logged)
    {
        document.getElementById("account").style.display = "none";
        document.getElementById("logout").style.display = "flex";
    }
}

function get_data() {
    var server = new XMLHttpRequest();

    server.open("GET", "/get_data", true);
    server.onload = function() {
        if (server.status == 200) {
            details = JSON.parse(server.responseText);
            let logged = localStorage.getItem("logged in");
            if (logged == 'true') {
                user = JSON.parse(localStorage.getItem("user"));
                for (var i = 0; i < details.length; ++i) {
                    if (details[i]["email"] == user["email"]) {
                        localStorage.clear();
                        localStorage.setItem("logged in", true);
                        localStorage.setItem("user", JSON.stringify(details[i]));
                    }
                }
            }
            showItems();
        }
    };
    server.send();
}


function showItems() {
    
    var items = JSON.parse(localStorage.getItem("user"));
    var display = document.querySelector(".page");
    
    items = items["cart"];

    items.forEach(item => {
        var div = `<div class="item" data-image="${item["image"]}" data-price="${item["price"].replace("AUD $", "")}">
                        <img src="${item["image"]}" alt="">
                        <p id="product">${item["item"]}</p>
                        <div class="amount">
                            <button class="minus">-</button>
                            <input type="text" name="amount" id="quantity" value="${item["quantity"]}" placeholder="0" style="width: 50px; text-align: center;">
                            <button class="plus">+</button>
                        </div>

                        <p class="price">AUD $${(item["price"].replace("AUD $", "")*item["quantity"])}</p>

                        <button class="remove">Remove</button>

                    </div>`
        display.innerHTML += div;
    });

    addEvents();

    update();
}

function logout() {
    localStorage.clear();
    window.location.replace("/home");
}

function addEvents() {
    const plus_buttons = document.querySelectorAll(".plus");
    
    plus_buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            var div = event.target.closest(".item");
            var price = div.querySelector(".price");
            var amount_input = div.querySelector("#quantity");
            var amount = amount_input.value;
            if (amount < 3)
            {
                amount++
                amount_input.value = amount;
            }
    
            price.innerHTML = "AUD $" + (amount * div.getAttribute("data-price"));
            update();
        });
    });
    
    const minus_buttons = document.querySelectorAll(".minus");
    
    minus_buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            var div = event.target.closest(".item");
            var price = div.querySelector(".price");
            var amount_input = div.querySelector("#quantity");
            var amount = amount_input.value;
    
            if (amount > 0)
            {
                amount--
                amount_input.value = amount;
            }
            if (amount == 0)
            {
                div.querySelector(".remove").addEventListener("click", (event) => {
                    var div = event.target.closest(".item");
                    div.remove();
                    update();
                });
                div.querySelector(".remove").click();
            }
    
            price.innerHTML = "AUD $" + (amount * div.getAttribute("data-price"));
            update();
        });
    });
    
    const remove_buttons = document.querySelectorAll(".remove");
    
    remove_buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            var div = event.target.closest(".item");
            div.remove();
            update();
        });
    });
}


function update()
{
    let items = document.querySelectorAll(".item");
    let count = document.getElementById("count");
    let subtotal = document.getElementById("right");
    let ship = document.getElementById("shipping").value;
    let total_price = document.getElementById("total_price");
    let total = 0;
    let counter = 0;

    items.forEach(item => {
        counter += parseInt(item.querySelector("#quantity").value);
        let price = item.querySelector(".price");
        total += parseInt(price.textContent.replace("AUD $", ""));
    });

    subtotal.innerHTML = "AUD $" + total;
    count.innerHTML = "ITEMS " + counter;

    if (ship == "free" || ship == "none") {

        total_price.innerHTML = "AUD $" + total;
    }
    else
    {
        total_price.innerHTML = "AUD $" + (total + 5);
        
    }   
}

document.getElementById("shipping").addEventListener("change", () => {
    update();
});

function checkout() {
    let items = document.querySelectorAll(".item");
    items.forEach(item => {
        let purchase = {
            "image": item.getAttribute("data-image"),
            "item": item.querySelector("#product").textContent
        }

        for (var i = 0; i < details.length; ++i) {
            if (details[i]['email'] == user['email']) {
                details[i]['purchased'].push(purchase);
            }
        }
        item.querySelector(".remove").click();
    });

    for (var i = 0; i < details.length; ++i) {
        if (details[i]['email'] == user['email']) {
            details[i]["cart"] = [];
        }
    }

    updatefile();
    window.location.replace("/store");
}

function updatefile() {
    var jsonData = JSON.stringify(details, null, 2);
    
    // NEW
    var server = new XMLHttpRequest();
    server.open("POST", "/update_data", true);
    server.setRequestHeader("Content-Type", "application/json");
    server.onload = function() {
        if (server.status === 200) {
            console.log("Data updated successfully!");
        }
    };
    server.send(jsonData);
}