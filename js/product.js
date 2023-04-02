const list = [];

const img = document.getElementById("img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const select = document.getElementById("colors");
const quantity = document.getElementById("quantity");
const paths = document.location.href.split("id=")[1];
const addToCart = document.getElementById("addToCart");

function getItem() {
  getProducts().then((data) => {
    function findItem(product) {
      return product._id === paths;
    }

    const item = data.find((item) => findItem(item));

    for (value in item.colors) {
      let option = document.createElement("option");
      option.text = item.colors[value];
      select.add(option);
    }

    title.innerText = item.name;
    price.innerText = item.price;
    description.innerText = item.description;
    img.setAttribute("src", item.imageUrl);

    return item;
  });
}

getItem();

addToCart.addEventListener("click", function () {
  if (localStorage.getItem("list")) {
    const localStorageBefore = JSON.parse(localStorage.getItem("list"));

    const [product] = localStorageBefore;

    console.log(product);
    const data = {
      productId: paths,
      quantity: quantity.value,
      dataColor: select.value,
    };

    list.push(data);
    let newList = list.concat(localStorageBefore);
    localStorage.setItem("list", JSON.stringify(newList));
  } else {
    const data = {
      productId: paths,
      quantity: quantity.value,
      dataColor: select.value,
    };

    list.push(data);

    localStorage.setItem("list", JSON.stringify(list));
  }
});

console.log(list);
