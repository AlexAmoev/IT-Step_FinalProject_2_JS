let cartProduct = document.querySelector("#CartsectionOne");
let total = document.getElementById("total");

fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
  .then((info) => info.json())
  .then((data) => {
    data.forEach((element) => {
      cartProduct.innerHTML += card(element);
      // console.log(element);
      // sessionStorage.setItem(`prodQty${element.product.id}`, element.quantity)
    });
    totalPrice();
  });
// .finally({

// })

function card(element) {
  // console.log(element.product.id);

  // console.log(element);

  return `<div class="cartProductList">
            <div class="cartProduct">
                <div class="cartProductLeft">
                    <button  onclick="delFromCart(${
                      element.product.id
                    })"><i class="fa-solid fa-trash-can"></i></button>
                    <img src="${element.product.image}" alt="">
                    <h3>${element.product.name}</h3>
                </div>
                <div class="cartProductRight">
                    <div class="qty">
                        <button onclick="addQty(${element.quantity}, ${
    element.product.price
  }, ${element.product.id})">+</button>
  <h3>${element.quantity}</h3>
                        
                        <button onclick="substractQty(${element.quantity}, ${
    element.product.price
  }, ${element.product.id})">-</button>
                    </div>
                    <div class="productPrice">
                    <h3>$ ${element.price}</h3>
                    <h3>$ ${element.price * element.quantity}</h3>
                    </div>
                </div>
            </div>
        </div>`;
}

async function delFromCart(id) {
  await fetch(
    `https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`,
    {
      method: "DELETE",
      headers: { accept: "*/*" },
    }
  );

  cartProduct.innerHTML = "";
  // cartProduct.innerHTML = `<h1>Cart</h1>
  //     <div class="info">
  //       <div class="infoLeft">
  //         <h3>Product</h3>
  //       </div>
  //       <div class="cartRight">
  //         <h3>Qty</h3>
  //         <h3>Price</h3>
  //         <h3>Total</h3>
  //       </div>
  //     </div>`;

  await fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then((info) => info.json())
    .then((data) => {
      data.forEach((element) => {
        cartProduct.innerHTML += card(element);
        // console.log(element);

        // sessionStorage.setItem(`prodQty${element.product.id}`, element.quantity)
      });
    });

  // cartProduct.innerHTML += `<div class="totalPrice">
  //       <h1>Total : </h1>
  //       <h1 style="color: red;"></h1>
  //      </div>`;
  totalPrice();
}

async function addQty(quantity, price, productId) {
  quantity++;
  await fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
    method: "PUT",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity: quantity,
      price: price,
      productId: productId,
    }),
  });
  // .then()
  cartProduct.innerHTML = "";
  // cartProduct.innerHTML = `<h1>Cart</h1>
  //     <div class="info">
  //       <div class="infoLeft">
  //         <h3>Product</h3>
  //       </div>
  //       <div class="cartRight">
  //         <h3>Qty</h3>
  //         <h3>Price</h3>
  //         <h3>Total</h3>
  //       </div>
  //     </div>`;
  await fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then((info) => info.json())
    .then((data) => {
      data.forEach((element) => {
        cartProduct.innerHTML += card(element);
        // console.log(element);

        // sessionStorage.setItem(`prodQty${element.product.id}`, element.quantity)
      });
    });

  // cartProduct.innerHTML += `<div class="totalPrice">
  //       <h1>Total : </h1>
  //       <h1 style="color: red;"></h1>
  //      </div>`;
  totalPrice();
}

async function substractQty(quantity, price, productId) {
  quantity--;


  if (quantity != 0) {
    await fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
      method: "PUT",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity,
        price: price,
        productId: productId,
      }),
    });
  }
  else{
    await fetch(
      `https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${productId}`,
      {
        method: "DELETE",
        headers: { accept: "*/*" },
      }
    );
  }
  // დავამატო ფუნქციონალი თუ რაოდენობა 0 ხტება ნივთი წაიშალოს სიიდან
  
  cartProduct.innerHTML = "";


  // cartProduct.innerHTML = `<h1>Cart</h1>
  //     <div class="info">
  //       <div class="infoLeft">
  //         <h3>Product</h3>
  //       </div>
  //       <div class="cartRight">
  //         <h3>Qty</h3>
  //         <h3>Price</h3>
  //         <h3>Total</h3>
  //       </div>
  //     </div>`;

  await fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then((info) => info.json())
    .then((data) => {
      data.forEach((element) => {
        cartProduct.innerHTML += card(element);
        // console.log(element);

        // sessionStorage.setItem(`prodQty${element.product.id}`, element.quantity)
      });
      // totalPrice();
    });
  // cartProduct.innerHTML += `<div class="totalPrice">
  //       <h1>Total : </h1>
  //       <h1 style="color: red;"></h1>
  //      </div>`;
  totalPrice();
}

async function totalPrice() {
  let cartQty = 0;
  let price = 0;
  fetch(`https://restaurant.stepprojects.ge/api/Baskets/GetAll`)
    .then((info) => info.json())
    .then((data) => {
      data.forEach((element) => {
        price += element.quantity * element.price;
        cartQty += element.quantity;
      });
      total.innerHTML = price += " $";
      console.log(cartQty);
    });
}

function goHome() {
  window.location.href = "./index.html";
}
