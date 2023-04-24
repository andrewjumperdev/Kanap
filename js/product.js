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

quantityValidation(quantity);

addToCart.addEventListener("click", () => {
  const data = {
    productId: params.get("id"),
    quantity: quantity.value,
    dataColor: select.value,
  };

  if (localStorage.getItem("list")) {
    let lst = localStorage.getItem("list");
    const localStorageBefore = JSON.parse(lst);

    let [result] = localStorageBefore.filter(
      (item) =>
        item.productId === data.productId && item.dataColor === data.dataColor
    );

    if (result) {
      let num = parseInt(data.quantity);
      let num2 = parseInt(result.quantity);

      let item = localStorageBefore.find(
        (item) =>
          item.productId === data.productId && item.dataColor === data.dataColor
      );

      item.quantity = num + num2;

      console.log(item);
      let newList = list.concat(localStorageBefore);
      localStorage.setItem("list", JSON.stringify(newList));
    } else {
      list.push(data);
      let newList = list.concat(localStorageBefore);
      localStorage.setItem("list", JSON.stringify(newList));
    }
  } else {
    list.push(data);
    localStorage.setItem("list", JSON.stringify(list));
  }
});
