var user;
const preset = `<h1 class="title">Shopping Cart</h1><br>
                    <hr>
                    <br>
                    <!-- <div class="item">
                        <img src="https://placehold.co/150x150" alt="">
                        <p id="product">Product Name <br> Details</p>
                        <div class="amount">
                            <button class="minus">-</button>
                            <input type="text" name="amount" id="quantity" placeholder="0" style="width: 50px; text-align: center;">
                            <button class="plus">+</button>
                        </div>

                        <p class="price">AUD $0</p>

                        <button class="remove">Remove</button>

                    </div> -->`;

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
    var pay = document.getElementById("payment").value;
    
    items = items["cart"];

    if (pay == "credit")
    {
        items.forEach(item => {
            var div = `<div class="item" data-image="${item["image"]}" data-points="${item["points"]}" data-price="${item["price"].replace("AUD $", "")}">
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
    } else if (pay == "points") {
        items.forEach(item => {
            var div = `<div class="item" data-image="${item["image"]}" data-points="${item["points"]}" data-price="${item["price"]}">
                            <img src="${item["image"]}" alt="">
                            <p id="product">${item["item"]}</p>
                            <div class="amount">
                                <button class="minus">-</button>
                                <input type="text" name="amount" id="quantity" value="${item["quantity"]}" placeholder="0" style="width: 50px; text-align: center;">
                                <button class="plus">+</button>
                            </div>
    
                            <p class="price">POINTS ${(item["points"]*item["quantity"])}</p>
    
                            <button class="remove">Remove</button>
    
                        </div>`
            display.innerHTML += div;
        });
    
        addEvents();
    
        update();
    }
    
}

function logout() {
    localStorage.clear();
    window.location.replace("/home");
}

function addEvents() {
    const plus_buttons = document.querySelectorAll(".plus");
    
    plus_buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            var pay = document.getElementById("payment").value;
            var div = event.target.closest(".item");
            var price = div.querySelector(".price");
            var amount_input = div.querySelector("#quantity");
            var amount = amount_input.value;

            if (pay == "credit")
            {
                if (amount < 3)
                    {
                        amount++
                        amount_input.value = amount;
                    }
            
                    price.innerHTML = "AUD $" + (amount * div.getAttribute("data-price"));
                    update();
            } else if (pay == "points") {
                if (amount < 3)
                    {
                        amount++
                        amount_input.value = amount;
                    }
                    price.innerHTML = "POINTS " + (amount * div.getAttribute("data-points"));
                    update();
            }
            
        });
    });
    
    const minus_buttons = document.querySelectorAll(".minus");
    
    minus_buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            var pay = document.getElementById("payment").value;
            var div = event.target.closest(".item");
            var price = div.querySelector(".price");
            var amount_input = div.querySelector("#quantity");
            var amount = amount_input.value;
    
            if (pay == "credit")
            {
                if (amount > 0)
                    {
                        amount--;
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
            } else if (pay == "points") {
                if (amount > 0)
                    {
                        amount--;
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
                    price.innerHTML = "POINTS " + (amount * div.getAttribute("data-points"));
                    update();
            }
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
    var pay = document.getElementById("payment").value;
    let total_price = document.getElementById("total_price");
    let total = 0;
    let counter = 0;

    if (pay == "credit") {
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
    else if (pay == "points") {

        items.forEach(item => {
            counter += parseInt(item.querySelector("#quantity").value);
            let price = item.querySelector(".price");
            total += parseInt(price.textContent.replace("POINTS ", ""));
        });

        subtotal.innerHTML = "POINTS " + total;
        count.innerHTML = "ITEMS " + counter;

        if (ship == "free" || ship == "none") {
    
            total_price.innerHTML = "POINTS " + total;
        }
        else
        {
            total_price.innerHTML = "POINTS " + (total + 500);
        }   
    }
}

document.getElementById("shipping").addEventListener("change", () => {
    update();
});

document.getElementById("payment").addEventListener("change", () => {
    update();
    document.querySelector(".page").innerHTML = preset;
    showItems();
});


function checkout() {
    let pay = document.getElementById("payment").value;
    let points = 0;
    if (pay == "credit")
    {
        let items = document.querySelectorAll(".item");
        items.forEach(item => {
            points += parseInt(item.querySelector("#quantity").value) * parseInt(item.getAttribute("data-points"));
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
                details[i]["miles"] = details[i]["miles"] + points;
                if (details[i]["miles"] > 150000 && details[i]["status"] == "Silver") {
                    details[i]["status"] = "Gold";
                }
            }
        }

        updatefile();
        window.location.replace("/store");
    } else if (pay == "points") {
        let items = document.querySelectorAll(".item");
        let total = document.getElementById("total_price");
        let total_price = total.textContent.replace("POINTS ", "");
        
        if (user["miles"] > total_price)
        {
            items.forEach(item => {
                points += parseInt(item.querySelector(".price").textContent.replace("POINTS ", ""));
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
                    details[i]["miles"] = details[i]["miles"] - points;
                }
            }
            updatefile();
            window.location.replace("/store");
        } else {
            alert("Not enough points!");
        }
    }
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