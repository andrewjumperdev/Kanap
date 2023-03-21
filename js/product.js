function getItem() {
  const paths = document.location.href.split("id=")[1];

  getProducts().then((data) => {
    function findItem(product) {
      return product._id === paths;
    }

    const item = data.find((item) => findItem(item));

    const img = document.getElementById("img");
    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const description = document.getElementById("description");
    const select = document.getElementById("colors");

    for (value in item.colors) {
      let option = document.createElement("option");
      option.text = item.colors[value];
      select.add(option);
    }

    title.innerText = item.name;
    price.innerText = item.price;
    description.innerText = item.description;
    img.setAttribute("src", item.imageUrl);
  });
}

getItem();
