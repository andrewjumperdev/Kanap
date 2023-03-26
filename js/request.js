const url = "http://127.0.0.1:3000/api/products";

function getProducts() {
  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    });
}
