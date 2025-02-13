let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'CASUAL SHOE',
        image: '1.png',
        price: 120000
    },
    {
        id: 2,
        name: 'W SHOE MAX',
        image: '2.PNG',
        price: 120000
    },
    {
        id: 3,
        name: 'RED NIKE SHOE',
        image: '3.PNG',
        price: 220000
    },
    {
        id: 4,
        name: 'BLUE NIKE SHOE',
        image: '4.PNG',
        price: 123000
    },
    {
        id: 5,
        name: 'SPORT SHOE',
        image: '5.PNG',
        price: 320000
    },
    {
        id: 6,
        name: 'NIKE AIR SHOE',
        image: '6.PNG',
        price: 120000
    }
];
let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}" alt="${value.name}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    });

}
initApp();
function addToCard(key) {
    if (listCards[key] == null) {
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('toggle-payment-details').addEventListener('click', function() {
        const paymentForm = document.querySelector('.payment-form');
        if (paymentForm.style.display === 'none') {
            paymentForm.style.display = 'block';
            this.textContent = 'Hide Payment Details';
        } else {
            paymentForm.style.display = 'none';
            this.textContent = 'Show Payment Details';
        }
    });
});



