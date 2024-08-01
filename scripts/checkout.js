import { cart, removeFromCart, calculateCartQuantity, updateQuantity }  from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from '../utils/currencyFormat.js';

let cartSummaryHTML = '';
let matchingProduct;
let checkoutQuantityDisplay = document.querySelector('.js-checkout-quantity');

cart.forEach((cartItem) => {
  const cartProductId = cartItem.productId

  products.forEach((product) => {
    if (cartProductId === product.id) {
      matchingProduct = product;
    }
  });
  
  cartSummaryHTML += 
  `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Wednesday, June 15
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number">
            <span class="save-quantity-link js-save-quantity-link-${matchingProduct.id}">
              Save
            </span>
            <js-span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});
document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-quantity-link').forEach(link => {
  link.addEventListener('click', () => {
    // remove from the cart array
    const buttonId = link.dataset.productId;
    console.log('removed button id: ', buttonId);
    removeFromCart(buttonId);
    
    // remove from the DOM
    
    const container = document.querySelector(`.js-cart-item-container-${buttonId}`);
    container.remove();

    checkoutQuantityDisplay.innerHTML = calculateCartQuantity();
  });
});

checkoutQuantityDisplay.innerHTML = calculateCartQuantity();



/*=====  Continue where you left of  ======*/

document.querySelectorAll('.js-update-quantity-link').forEach(updateLink => {
  updateLink.addEventListener('click', () => {
    const buttonId = updateLink.dataset.productId
    let container = document.querySelector(`.js-cart-item-container-${buttonId}`)
    
    updateLink.innerHTML = '';
    //editing mode: remove quantity value
    container.classList.add('is-editing-quantity');

    let quantityLabelHTML = document.querySelector(`.js-quantity-label-${buttonId}`);
    quantityLabelHTML.innerHTML = '';
    
    console.log(`Updating the quantity of: ${buttonId}`);
    
    // Save quantity value
    document.querySelectorAll(`.js-save-quantity-link-${buttonId}`).forEach(saveLink => {
      // Mouse click listener
      saveLink.addEventListener('click', () => {
        const newValueHandler = Number(document.querySelector(`.js-quantity-input-${buttonId}`).value); 
        let newQuantityValue = 0;

        if (newValueHandler > 99 ) {
          newQuantityValue = 99;
        } else if (newValueHandler < 1) {
          newQuantityValue = 1;
        } else {
          newQuantityValue = newValueHandler;
        }
        console.log(`New quantity value: ${newQuantityValue}`);
        // Render the updated quantity value to the webpage and clientside
        quantityLabelHTML.innerHTML = newQuantityValue;
        checkoutQuantityDisplay.innerHTML = updateQuantity(buttonId, newQuantityValue);
        container.classList.remove('is-editing-quantity');
        updateLink.innerHTML = 'Update';
      });
      // Keyboard support when saving quantity  
      document.addEventListener('keyup', (event) => {
        // save if the user press the Enter key
        if (event.key === 'Enter'){
          const newValueHandler = Number(document.querySelector(`.js-quantity-input-${buttonId}`).value); 
          let newQuantityValue = 0;
  
          if (newValueHandler > 99 ) {
            newQuantityValue = 99;
          } else if (newValueHandler < 1) {
            newQuantityValue = 1;
          } else {
            newQuantityValue = newValueHandler;
          }
          //render the updated quantity value to the webpage and clientside
          quantityLabelHTML.innerHTML = newQuantityValue;
          checkoutQuantityDisplay.innerHTML = updateQuantity(buttonId, newQuantityValue);
          container.classList.remove('is-editing-quantity');
          updateLink.innerHTML = 'Update';
        }
      })
    })

    //saving the quantity value in the cart array

  });
});