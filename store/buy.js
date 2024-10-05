const flight_buttons = document.querySelectorAll(".flight_btn");
const hotel_buttons = document.querySelectorAll(".hotel_btn");
const product_buttons = document.querySelectorAll(".product_btn");
var cart = [];
const fs = require("fs");

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
    
            cart.push({
                "item": destination,
                "quantity": quantity,
                "price": price,
                "points": points,
                "image": image
            });
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
    
            cart.push({
                "item": destination,
                "quantity": quantity,
                "price": price,
                "points": points,
                "image": image
            });
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
    
            cart.push({
                "item": product,
                "quantity": quantity,
                "price": price,
                "points": points,
                "image": image
            });
            updatefile();
        }
    });
});

function updatefile() {

    fs.writeFile("../cart.json", cart);
}

