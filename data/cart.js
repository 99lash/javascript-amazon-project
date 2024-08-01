let timeoutId;

// export let cart = JSON.parse(localStorage.getItem('cart')); 
// if (!cart) {
//   cart = [{
//     productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
//     quantity: 2
//   },
//   {
//     productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
//     quantity: 1
// }];
// }

export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  quantity: 2
},
{
  productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
  quantity: 1
}];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId) {
  const quantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);
  let matchingId;
  
  console.log(quantity)
  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      matchingId = cartItem;
    }  
  });

  

  if (matchingId) {
    matchingId.quantity += quantity;
  } else {
    cart.push({productId, quantity});
  }
  
  console.log(cart);
  saveToStorage();

  const item = document.querySelector(`.js-added-to-cart-${productId}`)
  clearTimeout(timeoutId);
  item.classList.add('added-to-cart-success');
  timeoutId = setTimeout(() => {
    item.classList.remove('added-to-cart-success');
  }, 2000);

}

export function calculateCartQuantity() {
  let totalCartQuantity = 0; 
  
  // Count all the sum of total cart quantity
  cart.forEach(item => {
    totalCartQuantity += item.quantity;
  });
  console.log('Total Cart Quantity: ', totalCartQuantity);
  return totalCartQuantity;
}

export function removeFromCart(productId) {
  let newCart = []; 
  cart.forEach(cartItem => {
  if (productId !== cartItem.productId) {
    newCart.push(cartItem);
    // cart.pop(cartItem);
  }
  cart = newCart;
  })
//console.log(cart);
  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) return;
    cartItem.quantity = newQuantity;
  });

  console.log(cart);
  saveToStorage();
  return calculateCartQuantity();
}
