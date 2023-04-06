const list = [];
const params = new URLSearchParams(document.location.search);
const url = `http://127.0.0.1:3000/api/products/${params.get("id")}`;

const img = document.getElementById("img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const select = document.getElementById("colors");
const quantity = document.getElementById("quantity");
const addToCart = document.getElementById("addToCart");

getProducts(url).then((data) => {
  for (value in data.colors) {
    let option = document.createElement("option");
    option.text = data.colors[value];
    select.add(option);
  }

  title.innerText = data.name;
  price.innerText = data.price;
  description.innerText = data.description;
  img.setAttribute("src", data.imageUrl);
});

addToCart.addEventListener("click", () => {

  if (localStorage.getItem("list")) {
    let lst = localStorage.getItem("list") 
    const localStorageBefore = JSON.parse(lst);
    const data = {
      productId: params.get("id"),
      quantity: quantity.value,
      dataColor: select.value,
    };

    list.push(data);
    let newList = list.concat(localStorageBefore);
    localStorage.setItem("list", JSON.stringify(newList));
  } else {
    const data = {
      productId: params.get("id"),
      quantity: quantity.value,
      dataColor: select.value,
    };

    list.push(data);

    localStorage.setItem("list", JSON.stringify(list));
  }
});
