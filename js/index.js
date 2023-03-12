const url = 'http://127.0.0.1:3000/api/products'

/*Request */
function asyncCall() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
    /* Creating the elements */


        const list = data
        console.log(list)
    /* Iterando sobre el json */
      /*  for(let i = 0; i < list.length; i++) {
            img.src = list[i].imageUrl
            h3.innerText = list[i].name
            p.textContent = list[i].description 
            console.log()         
        }*/

        list.forEach(list => {      
            const section = document.getElementById('items')            
            const a = document.createElement('a')
            const article = document.createElement('article')
            const img = document.createElement('img')
            const h3 = document.createElement('h3')
            const p = document.createElement('p')
            
    
            section.appendChild(a)
            a.appendChild(article)                
            article.appendChild(img)
            article.appendChild(h3)
            article.appendChild(p)        
            img.src = list.imageUrl
            h3.innerText = list.name
            p.textContent = list.description 
            console.log(list.name)
        });

        })
        .catch(error => {console.error(error)});
  }
asyncCall();

