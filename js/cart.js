const list = JSON.parse(localStorage.getItem("list"));


function getProductsCart() {

    let [product] = list

    console.log(product)

    getProducts().then(items => {     
      const result = items.find((item) => {items.productId === item._id});
      console.log(result)           
    })
}

getProductsCart()