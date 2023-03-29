const list = JSON.parse(localStorage.getItem("list"));
const img = document.getElementById("img")


function getProductsCart() {

    let [product] = list

    getProducts().then(items => {     
      console.log(items)
      for(let i = 0; i < items.length; i++) {
        const elements = items[i];
        const result = elements._id == product.productId
        if(result) {
          const panier = [          
            elements._id,
            elements.name,
            elements.price,
            elements.imageUrl,
            elements.description
          ]

          img.setAttribute('src', elements.imageUrl)
          
        }

        console.log(result)
      }         
    })
}

getProductsCart()