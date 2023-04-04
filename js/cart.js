const list = JSON.parse(localStorage.getItem("list"));
const url = "http://127.0.0.1:3000/api/products";

const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const orderButton = document.getElementById("order");

getProducts(url).then((items) => {
  for (let i = 0; i < list.length; i++) {
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
    const quantity = document.createElement("p");
    const cartItemContentSettingsDelete = document.createElement("div");
    const deleteItem = document.createElement("p");
    const inputQuantity = document.createElement("input");

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
    cartItem.setAttribute("data-color", result.dataColor);
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
    deleteItem.setAttribute("onclick", "deleteItem()");

    // Set Values
    h2.innerText = result.name;
    p.innerText = list[i].dataColor;
    p2.innerText = `${result.price} € `;
    quantity.innerText = "Qté :";
    deleteItem.innerText = "Supprimer";

    // deleteItem.addEventListener("click", (e) => {
    //  e.preventDefault();
    // Actualizar el DOM
    //  });
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();

  const command = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };


  () => {
    fetch('http://127.0.0.1:3000/api/order'), {
      method: 'POST',
      body: command,
    }
  }


  console.log(command);
});
