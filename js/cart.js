const list = JSON.parse(localStorage.getItem("list"));
const url = "http://127.0.0.1:3000/api/products";
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const errMsjEmail = document.getElementById("emailErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const form = document.querySelector(".cart__order__form");
const orderButton = document.getElementById("order");
const totalsQuantity = [];
const totalPrices = [];

getProducts(url).then((items) => {
  for (let i = 0; i < list.length; i++) {
    console.log();
    // Creating Elements
    const element = list[i];
    const result = items.find((item) => item._id === element.productId);
    const cartItems = document.getElementById("cart__items");
    const cartItem = document.createElement("article");
    const cartItemImg = document.createElement("div");
    const img = document.createElement("img");
    const cartItemContent = document.createElement("div");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    const cartItemContentDescription = document.createElement("div");
    const cartItemContentSettings = document.createElement("div");
    const cartItemContentSettingsQuantity = document.createElement("div");
    const inputQuantity = document.createElement("input");
    const quantity = document.createElement("p");
    const cartItemContentSettingsDelete = document.createElement("div");
    const deleteItem = document.createElement("p");

    // Banding Elements
    cartItems.append(cartItem);
    cartItem.append(cartItemImg);
    cartItemImg.append(img);
    cartItem.append(cartItemContent);
    cartItemContent.append(cartItemContentDescription);
    cartItemContentDescription.append(h2);
    cartItemContentDescription.append(p);
    cartItemContentDescription.append(p2);
    cartItemContent.append(cartItemContentSettings);
    cartItemContentSettings.append(cartItemContentSettingsQuantity);
    cartItemContentSettingsQuantity.append(quantity);
    cartItemContentSettingsQuantity.append(inputQuantity);
    cartItemContentSettings.append(cartItemContentSettingsDelete);
    cartItemContentSettingsDelete.append(deleteItem);

    // Set Attr
    cartItem.setAttribute("data-id", result._id);
    cartItem.setAttribute("data-color", list[i].dataColor);
    cartItem.setAttribute("class", "cart__item");
    cartItemImg.setAttribute("class", "cart__item__img");
    img.setAttribute("src", result.imageUrl);
    img.setAttribute("alt", result.altTxt);
    cartItemContent.setAttribute("class", "cart__item__content");
    cartItemContentDescription.setAttribute(
      "class",
      "cart__item__content__description"
    );
    cartItemContentSettings.setAttribute(
      "class",
      "cart__item__content__settings"
    );
    cartItemContentSettingsQuantity.setAttribute(
      "class",
      "cart__item__content__settings__quantity"
    );
    cartItemContentSettingsDelete.setAttribute(
      "class",
      "cart__item__content__settings__delete"
    );
    inputQuantity.setAttribute("class", "itemQuantity");
    inputQuantity.setAttribute("id", "itemQuantity");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("min", 1);
    inputQuantity.setAttribute("max", 100);
    inputQuantity.setAttribute("value", list[i].quantity);
    deleteItem.setAttribute("class", "deleteItem");

    // Set Values
    h2.innerText = result.name;
    p.innerText = list[i].dataColor;
    p2.innerText = `${result.price} € `;
    quantity.innerText = "Qté :";
    deleteItem.innerText = "Supprimer";

    const priceItem = p2.innerText;
    let priceProduct = parseInt(priceItem.slice(0, -1));

    const prices = () => {
      const qty = inputQuantity.getAttribute("value");
      const number = parseInt(qty);
      if (number > 1) {
        priceProduct = priceProduct * number;
        totalPrices.push(priceProduct);
      } else {
        totalPrices.push(priceProduct);
      }
      const sumaPrices = totalPrices.reduce(
        (anterior, actual) => anterior + actual,
        0
      );
      totalPrice.innerText = sumaPrices;
    };

    prices();

    itemQuantity.addEventListener("change", (e) => {
      prices();
    });

    quantityValidation(itemQuantity);

    // Creando Funtion counter
    let totlqty = () => {
      const numValue = inputQuantity.getAttribute("value");
      const num = parseInt(numValue);

      totalsQuantity.push(num);

      const suma = totalsQuantity.reduce(
        (anterior, actual) => anterior + actual,
        0
      );

      totalQuantity.innerText = suma;

      inputQuantity.addEventListener("change", (e) => {
        e.preventDefault();
        let oldTotal = parseInt(numValue);
        let inputQty = document.getElementById("itemQuantity").value;
        let num = parseInt((newTotal = inputQty));
        if (num < oldTotal) {
          console.log("restado");
          console.log(oldTotal - num);
          console.log(totalQuantity);
          const input = document.getElementById("itemQuantity");
          input.setAttribute("value", num);
        } else {
          let newNumber = num;
          let newTotalQuantity = parseInt(totalQuantity.innerText) - oldTotal;
          let NewResult = newTotalQuantity + newNumber;
          totalQuantity.innerText = NewResult;
        }
      });
    };

    totlqty();

    deleteItem.addEventListener("click", (e) => {
      e.preventDefault();
      const lst = localStorage.getItem("list");
      const parseLst = JSON.parse(lst);
      const color = cartItem.getAttribute("data-color");
      const newList = parseLst.filter((item) => item.dataColor !== color);
      console.log(newList);

      localStorage.setItem("list", JSON.stringify(newList));
      location.reload();
    });
  }
});

validation(firstName, lastName, address, city, email);

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  const products = [];

  list.forEach((element) => {
    products.push(element.productId);
  });

  const orderUrl = "http://localhost:3000/api/products/order";

  const orderId = fetch(orderUrl, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    Origin: "http://localhost:3000",
    body: JSON.stringify({ contact, products }),
  })
    .then((res) => res.json())
    .then((data) => {
      const order = data.orderId;
      window.location.href = `./confirmation.html?order=${order}`;
    });
});
