// DATA PRODUK 30 FURNITUR
const products = [];
for(let i=1; i<=30; i++){
  products.push({
    id: i,
    name: `Furniture ${i}`,
    price: Math.floor(Math.random()*3000000 + 500000), // harga random 500k - 3.5M
    image: `https://picsum.photos/200/200?random=${i}`
  });
}

// KERANJANG
let cart = [];

// LOGIN
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  if(user === "admin" && pass === "123") {
    localStorage.setItem("login", "true");
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("content").classList.remove("hidden");
  } else {
    alert("Username atau password salah!");
  }
}

function checkLogin() {
  if(localStorage.getItem("login") === "true") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("content").classList.remove("hidden");
  }
}

function logout() {
  localStorage.removeItem("login");
  location.reload();
}

// RENDER PRODUK
function renderProducts() {
  const productList = document.getElementById("product-list");
  products.forEach(p=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p class="price">Rp ${p.price.toLocaleString()}</p>
      <button onclick="addToCart(${p.id})">Tambah ke Keranjang</button>
    `;
    productList.appendChild(card);
  });
}

// KERANJANG
function addToCart(id){
  const product = products.find(p=>p.id===id);
  cart.push(product);
  renderCart();
}

function renderCart(){
  document.getElementById("cart-count").textContent = cart.length;
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  if(!cartItems) return;
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, idx)=>{
    total += item.price;
    const div = document.createElement("div");
    div.innerHTML = `${item.name} - Rp ${item.price.toLocaleString()} 
                     <button onclick="removeFromCart(${idx})">Hapus</button>`;
    cartItems.appendChild(div);
  });
  cartTotal.textContent = total.toLocaleString();
}

function removeFromCart(index){
  cart.splice(index,1);
  renderCart();
}

function toggleCart(){
  const cartModal = document.getElementById("cartModal");
  cartModal.classList.toggle("hidden");
}

function checkout(){
  if(cart.length===0){
    alert("Keranjang kosong!");
    return;
  }
  alert("Terima kasih! Total belanja Rp " + cart.reduce((sum,p)=>sum+p.price,0).toLocaleString());
  cart = [];
  renderCart();
}
