const url = "http://127.0.0.1:3000/api/products";

getProducts(url).then(products => {
    products.map((item) => {
        // Creating the elements
        const section = document.getElementById("items");
        const a = document.createElement("a");
        const article = document.createElement("article");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
    
        section.appendChild(a);
        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);
    
        a.href = `product.html?id=${item._id}`;
        img.src = item.imageUrl;
        h3.innerText = item.name;
        p.textContent = item.description;
      });
});


