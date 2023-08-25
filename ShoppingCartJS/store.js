const cartItemContainer = document.querySelector('.cart-items');
const removeCartItemButtons = document.querySelectorAll('.btn-danger');
const quantityInputs = document.querySelectorAll('.cart-quantity-input');
const addToCartButtons = document.querySelectorAll('.shop-item-button');
const purchaseButton = document.querySelector('.btn-purchase');

purchaseButton.addEventListener('click', () => {
    let summary = "Thanks for purchase! \n Here is your summary: \n";
    const cartItems = document.querySelector('.cart-items');
    
    while (cartItems.hasChildNodes()) {
        const firstChild = cartItems.firstElementChild;
        if (firstChild) {
            summary += `- ${firstChild.firstChild.querySelector('.cart-item-title').textContent} \n`;
            cartItems.removeChild(firstChild);
        } else {
            break;
        }
    }
    alert(summary);
    updateCartTotal();
});

updateCartTotal();

removeCartItemButtons.forEach(e => {
    e.addEventListener('click',e =>{
        let buttonClicked = e.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    });
});

quantityInputs.forEach(e => {
    e.addEventListener('change',e => {
        if(!isNaN(e.target.value) && e.target.value > 0){
            updateCartTotal();
        }
        else{
            e.target.value = 1;
        }
    });
})

addToCartButtons.forEach(e => {
    e.addEventListener('click', e => addToCartClicked(e));
})

function addToCartClicked(event){
    const shopItem = event.target.parentElement.parentElement;
    const title = shopItem.querySelector('.shop-item-title').textContent;
    const price = shopItem.querySelector('.shop-item-price').textContent;
    const imageSrc = shopItem.querySelector('.shop-item-image').src;
    addItemToCart(title, price, imageSrc);
}

function updateCartTotal(){
    const cartRows = cartItemContainer.querySelectorAll('.cart-row');
    const cartTotalPrice =  document.querySelector('.cart-total-price');
    let priceTotal = 0;
    cartRows.forEach(e => {
        const priceElement = e.querySelector('.cart-price');
        const quantityElement = e.querySelector('.cart-quantity-input');
        priceTotal += parseFloat(priceElement.textContent.replace('$','')) * quantityElement.value; 
    });
    cartTotalPrice.textContent = `$ ${Math.round(priceTotal * 100) / 100}`;
}

function addItemToCart(title, price, imageSrc){
    const cartItemTitle = document.querySelectorAll('.cart-item-title');
    let isItemAdded = false;
    cartItemTitle.forEach(e => {
        if(e.textContent == title) {
            isItemAdded = true;
            e.parentElement.nextElementSibling.nextElementSibling.firstElementChild.value++;
            updateCartTotal();
        }
    })
    if(!isItemAdded){
        const cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        // CART ITEM:   
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.classList.add('cart-column');
        const cartImage = document.createElement('img');
        cartImage.setAttribute('src', imageSrc);
        cartImage.classList.add('cart-item-image');
        // TITLE
        const titleSpan = document.createElement('span');
        titleSpan.classList.add('cart-item-title');
        titleSpan.textContent = title;
    
        // PRICE:
        const priceSpan = document.createElement('span');
        priceSpan.classList.add('cart-price');
        priceSpan.classList.add('cart-column');
        priceSpan.textContent = price;
    
        // QUANTITY COL:
        const cartQuantity = document.createElement('div');
        cartQuantity.classList.add('cart-quantity');
        cartQuantity.classList.add('cart-column');
        // QUNATITY INPUT:
        const cartQuantityInput = document.createElement('input');
        cartQuantityInput.classList.add('cart-quantity-input');
        cartQuantityInput.setAttribute('type','number');
        cartQuantityInput.setAttribute('min',1);
        cartQuantityInput.setAttribute('value',1);
        
        // BUTTON:
        const btnDeleteItem = document.createElement('button');
        btnDeleteItem.classList.add('btn');
        btnDeleteItem.classList.add('btn-danger');
        btnDeleteItem.setAttribute('type','button');
        btnDeleteItem.textContent = 'REMOVE';
        
        btnDeleteItem.addEventListener('click',e =>{
            let buttonClicked = e.target;
            buttonClicked.parentElement.parentElement.remove();
            updateCartTotal();
        });
    
        //APPEND:
        cartQuantity.append(cartQuantityInput, btnDeleteItem);
        cartItem.append(cartImage,titleSpan);
        cartRow.append(cartItem,priceSpan,cartQuantity);
        cartItemContainer.appendChild(cartRow);
        updateCartTotal();
    }
}