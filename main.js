let sectionOne = document.getElementById("HomesectionOne");
let checkNuts = document.getElementById("checkNuts");
let checkVegeterian = document.getElementById("checkVegeterian");
// let rangeSlider = document.getElementById("rangeSlider")
let sliderValue = document.getElementById("sliderValue");
let selector = document.getElementById("selector");
let spiciness = -1;
let nuts = 1;
let vegeterian = 1;
let category = 0;

// apply(vegeterian, nuts, spiciness, category)

async function move(e) {
  // console.log(e.target.value);
  sliderValue.textContent = await e.target.value;
  // sliderValue.innerHTML ++
  spiciness = await e.target.value;
  // console.log(sliderValue.innerHTML);
  // console.log(spiciness);
  console.log(spiciness);

  await apply(vegeterian, nuts, spiciness, category);
}

console.log(spiciness);

async function noNuts() {
  console.log(checkNuts);
  if (checkNuts.value == 1) {
    console.log(spiciness);
    console.log("+");
    checkNuts.value--;
    nuts = checkNuts.value;
  } else {
    console.log(spiciness);
    console.log("-");
    checkNuts.value++;
    nuts = checkNuts.value;
  }

  apply(vegeterian, nuts, spiciness, category);
}

async function noVegeterian() {
  console.log(checkVegeterian);
  if (checkVegeterian.value == 1) {
    console.log(spiciness);
    console.log("+");
    checkVegeterian.value--;
    vegeterian = checkVegeterian.value;
  } else {
    console.log(spiciness);
    console.log("-");
    checkVegeterian.value++;
    vegeterian = checkVegeterian.value;
  }

  apply(vegeterian, nuts, spiciness, category);
}

async function getSelectorId(id) {
  category = id;
  // console.log(id);
  apply(vegeterian, nuts, spiciness, category);
}

async function apply(vegeterian = 1, nuts = 1, spiciness = -1, category = 0) {
  console.log(`Vegeterian: ${vegeterian}`);
  console.log("");
  console.log("---------------");
  console.log("");
  console.log(`Nuts: ${nuts}`);
  console.log("");
  console.log("---------------");
  console.log("");
  console.log(`Spiciness: ${spiciness}`);
  console.log("");
  console.log("---------------");
  console.log("");
  console.log(`Category: ${category}`);
  // let veg;
  // let nut;
  // let spic;
  // let care;
  let link;
  if (vegeterian != 1 && nuts != 1 && spiciness != -1 && category != 0) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=true&nuts=true&spiciness=${spiciness}&categoryId=${category}`;
  } else if (nuts != 1 && spiciness != -1 && category != 0) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?nuts=true&spiciness=${spiciness}&categoryId=${category}`;
  } else if (vegeterian != 1 && spiciness != -1 && category != 0) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=true&spiciness=${spiciness}&categoryId=${category}`;
  } else if (vegeterian != 1 && nuts != 1 && category != 0) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=true&nuts=true&categoryId=${category}`;
  } else if (vegeterian != 1 && nuts != 1 && spiciness != -1) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=true&nuts=true&spiciness=${spiciness}`;
  } else if (vegeterian != 1 && nuts != 1) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=true&nuts=true`;
  } else if (vegeterian != 1 && spiciness != -1) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=true&spiciness=${spiciness}`;
  } else if (vegeterian != 1 && category != 0) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=true&categoryId=${category}`;
  } else if (nuts != 1 && spiciness != -1) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?nuts=true&spiciness=${spiciness}`;
  } else if (nuts != 1 && category != 0) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?nuts=true&categoryId=${category}`;
  } else if (spiciness != -1 && category != 0) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?spiciness=${spiciness}&categoryId=${category}`;
  } else if (vegeterian != 1) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=true`;
  } else if (nuts != 1) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?nuts=false`;
  } else if (spiciness != -1) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?spiciness=${spiciness}`;
  } else if (category != 0) {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?categoryId=${category}`;
  } else {
    link = `https://restaurant.stepprojects.ge/api/Products/GetFiltered`;
  }

  sectionOne.innerHTML = "";

  await fetch(link)
    .then((info) => info.json())
    .then((data) => {
      data.forEach((element) => {
        sectionOne.innerHTML += card(element);
      });
    });
}

async function reset() {
  location.reload()
}

document.addEventListener("change", function (event) {
  if (event.target.classList.contains("card-checkbox")) {
    let productId = event.target.dataset.id;
    let paramType = event.target.dataset.type;
    let isChecked = event.target.checked;

    console.log(`Product ID ${productId}: ${paramType} = ${isChecked}`);

    // Swagger-ზე არ არი გათვალისწინებული თუ იქნება შეცვლიი ობიექტი
  }
});

// ყველა პროდუქტის წამოღება
fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
  .then((info) => info.json())
  .then((data) => {
    data.forEach((element) => {
      // let categoryId = element.categoryId;
      // console.log(element);
      sectionOne.innerHTML += card(element);
    });
  });

{
  /* <div class="buttons">
  <button class="nuts">Nuts</button>
  <button class="vegeterian">Vegeterian</button>
</div>; */
}

function card(element) {
  return `<div class="card">
            <img src="${element.image}" alt="">
            <h1>${element.name}</h1>
            <p><i class="fa-solid fa-pepper-hot"></i>${element.spiciness}</p>
            <div class="nutsVege">
                <label>
                  <div class="labelnuts">
                  <input type="checkbox" class="card-checkbox" data-id="${
                    element.id
                  }" data-type="nuts" ${element.nuts ? "checked" : ""}>
                  <p>
                  Nuts
                  </p>
                  </div>
                  <div class="labelVeg">
                  <input type="checkbox" class="card-checkbox" data-id="${
                    element.id
                  }" data-type="vegeterian" ${
    element.vegeterian ? "checked" : ""
  }>
                  <p>
                  Vegeterian
                  </p>
                  </div>
                </label>
            </div>
            <div class="addToCart">
                <h1>Price: $ ${element.price}</h1>
                <button onclick="updateCart(${element.id}, ${
    element.price
  })" class="addBtn"><p>Add to cart</p></button>
            </div>
        </div>`;
}

function updateCart(id, price) {
  let cartQuantities = {};
  fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then((info) => info.json())
    .then((data) => {
      let existingProduct = data.find((element) => element.product.id === id);

      if (existingProduct) {
        // თუ ნივთი უკვე კალათაშია ვიღებთ ნივთის რაოენობას და ვამათებთ ერთ ცალს
        cartQuantities[id] = existingProduct.quantity + 1;
      } else {
        // თუ ნივტი კალათაში არ არი მაშინ ვამატებთ ნივთ
        cartQuantities[id] = 1;
      }

      console.log(cartQuantities);

      if (existingProduct) {
        updateQuantityOnServer(id, price, cartQuantities[id]);
      } else {
        addToCart(price, id, cartQuantities[id]);
      }
    })
    .catch((error) => console.error(error));
}

function addToCart(price, id) {
  fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
    method: "post",
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity: 1,
      price: price,
      productId: id,
    }),
  })
    .then((info) => info.json())
    .then((data) => {
      console.log("Successfully added to the cart:", data);
    })
    .catch((error) => {
      console.error("Error adding to the cart:", error);
    });
}

function updateQuantityOnServer(id, price, quantity) {
  fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
    method: "put",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity: quantity,
      price: price,
      productId: id,
    }),
  })
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      console.log("Successfully updated the cart:", data);
    })
    .catch((error) => {
      console.error("Error updating the cart:", error);
    });
}

async function getAll(button) {
  setActive(button);
  sectionOne.innerHTML = "";

  // უფრო ადვილი გზა ვიპოვე ეს ნაწილი მეტი აღარ მჭირდება
  // ეს ლოგიკა არი დამატებული იმისთვის, რომ თუ No Nuts ან Vegeterian Only არის დაკლიკი,
  // დარჩეს მითითებლი გვერდის აპდეიტის დროს.
  // let nutsCheck;
  // let vegeterianCheck;

  // if (checkNuts.value == 0) {
  //   nutsCheck = "checked";
  // }

  // if (checkVegeterian.value == 0) {
  //   vegeterianCheck = "checked";
  // }
  // //----------------------------------------------------
  // sectionOne.innerHTML = `<div id="filter">
  //       <h1>Filter</h1>
  //       <label for="rangeSlider" id="sliderValue">0</label>
  //       <input
  //         oninput="move(event)"
  //         id="rangeSlider"
  //         type="range"
  //         min="0"
  //         max="5"
  //         step="1"
  //         value="-1"
  //       />
  //       <div class="filteNutsVegeterian">
  //         <div class="nuts">
  //           <input onchange="noNuts()" type="checkbox" id="checkNuts" value="1" ${nutsCheck}/> No Nuts
  //         </div>
  //         <div class="vegeterian">
  //           <input onchange="noVegeterian()" type="checkbox" id="checkVegeterian" value="1" ${vegeterianCheck}/> Vegeterian Only
  //         </div>
  //       </div>
  //       <select onchange="getSelectorId(this.value)" id="selector">
  //         <option value="0" disabled selected>Categories</option>
  //         <option value="1">Salads</option>
  //         <option value="2">Soups</option>
  //         <option value="3">Chicken-Dishes</option>
  //         <option value="4">Beef-Dishes</option>
  //         <option value="5">Seafood-Dishes</option>
  //         <option value="6">Vegetable-Dishes</option>
  //         <option value="7">Bits&Bites</option>
  //         <option value="8">On-The-Side</option>
  //         <option value="0">All</option>
  //       </select>
  //       <button onclick="reset()">RESET</button>

  //     </div>`;

  // <button onclick="apply()">APPLY FILTER</button>

  await fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
    .then((info) => info.json())
    .then((data) => {
      data.forEach((element) => {
        let categoryId = element.categoryId;

        sectionOne.innerHTML += card(element);
      });
    });
}

function setActive(button) {
  document
    .querySelectorAll(".nav-btn")
    .forEach((btn) => btn.classList.remove("active"));

  button.classList.add("active");
}

async function getByCategory(categoryName, button) {
  setActive(button);
  let categoryId;
  await fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
    .then((info) => info.json())
    .then((data) => {
      data.forEach((element) => {
        if (categoryName == element.name) {
          categoryId = element.id;
        }
      });
    });

  await fetch(
    `https://restaurant.stepprojects.ge/api/Categories/GetCategory/${categoryId}`
  )
    .then((info) => info.json())
    .then((data) => {
      sectionOne.innerHTML = "";

      // უფრო ადვილი გზა ვიპოვე ეს ნაწილი მეტი აღარ მჭირდება
      // ეს ლოგიკა არი დამატებული იმისთვის, რომ თუ No Nuts ან Vegeterian Only არის დაკლიკი,
      // დარჩეს მითითებლი გვერდის აპდეიტის დროს.
      // let nutsCheck;
      // let vegeterianCheck;

      // if (checkNuts.value == 0) {
      //   nutsCheck = "checked";
      // }

      // if (checkVegeterian.value == 0) {
      //   vegeterianCheck = "checked";
      // }
      // //----------------------------------------------------
      // sectionOne.innerHTML = `<div id="filter">
      //   <h1>Filter</h1>
      //   <label for="rangeSlider" id="sliderValue">0</label>
      //   <input
      //     oninput="move(event)"
      //     id="rangeSlider"
      //     type="range"
      //     min="0"
      //     max="5"
      //     step="1"
      //     value="-1"
      //   />
      //   <div class="filteNutsVegeterian">
      //     <div class="nuts">
      //       <input onchange="noNuts()" type="checkbox" id="checkNuts" value="1" ${nutsCheck}/> No Nuts
      //     </div>
      //     <div class="vegeterian">
      //       <input onchange="noVegeterian()" type="checkbox" id="checkVegeterian" value="1" ${vegeterianCheck}/> Vegeterian Only
      //     </div>
      //   </div>
      //   <select onchange="getSelectorId(this.value)" id="selector">
      //     <option value="0" disabled selected>Categories</option>
      //     <option value="1">Salads</option>
      //     <option value="2">Soups</option>
      //     <option value="3">Chicken-Dishes</option>
      //     <option value="4">Beef-Dishes</option>
      //     <option value="5">Seafood-Dishes</option>
      //     <option value="6">Vegetable-Dishes</option>
      //     <option value="7">Bits&Bites</option>
      //     <option value="8">On-The-Side</option>
      //     <option value="0">All</option>
      //   </select>
      //   <button onclick="reset()">RESET</button>
      // </div>`;

      // <button onclick="apply()">APPLY FILTER</button>

      data.products.forEach((element) => {
        sectionOne.innerHTML += card(element);
      });
    });
}

function showHide() {
  let smallNav = document.getElementById("smallNav");
  smallNav.classList.toggle("active");
}

function goToCart() {
  window.location.href = "./cart.html";
}
