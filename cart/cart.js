window.onload = function() {
    document.body.style.visibility = 'visible';
    var logged = localStorage.getItem("logged in");
    if (logged)
    {
        document.getElementById("account").style.display = "none";
        document.getElementById("logout").style.display = "flex";
    }
};

showItems();

function showItems() {

    var items = JSON.parse(localStorage.getItem("user"));
    var display = document.querySelector(".page");

    items = items["cart"];

    items.forEach(item => {
        var div = `<div class="item" data-price="${item["price"]}">
                        <img src="${item["image"]}" alt="">
                        <p id="product">${item["item"]}</p>
                        <div class="amount">
                            <button class="minus">-</button>
                            <input type="text" name="amount" id="quantity" value="${item["quantity"]}" placeholder="0" style="width: 50px; text-align: center;">
                            <button class="plus">+</button>
                        </div>

                        <p class="price">AUD $${(item["price"]*item["quantity"])}</p>

                        <button class="remove">Remove</button>

                    </div>`
        display.innerHTML += div;
    });

    update();
}

function logout() {
    localStorage.clear();
    window.location.replace("../index.html");
}

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

function update()
{
    var items = document.querySelectorAll(".item");
    var count = document.getElementById("count");
    var subtotal = document.getElementById("right");
    var ship = document.getElementById("shipping").value;
    var total_price = document.getElementById("total_price");
    var total = 0;
    var counter = 0;

    items.forEach(item => {
        counter += parseInt(item.querySelector("#quantity").value);
        var price = item.querySelector(".price");
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

document.getElementById("shipping").addEventListener("click", () => {
    update();
});