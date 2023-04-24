const params = new URLSearchParams(document.location.search);
const order = params.get("order");

const numOrder = document.getElementById('orderId');

numOrder.innerText = order

localStorage.removeItem('list')
