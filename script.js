let foods = [
  { id:1, name:"Chicken Biryani", cat:"nonveg", price:180, img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400", desc:"Spicy Chennai Biryani with Raita" },
  { id:2, name:"Veg Fried Rice", cat:"veg", price:120, img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400", desc:"Tasty Veg Fried Rice" },
  { id:3, name:"Chicken Pizza", cat:"fastfood", price:299, img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400", desc:"Cheesy Chicken Pizza" },
  { id:4, name:"Veg Burger", cat:"fastfood", price:99, img:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=400", desc:"Crispy Veg Burger" },
  { id:5, name:"Grilled Chicken", cat:"nonveg", price:250, img:"https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400", desc:"Spicy Grilled Chicken" },
  { id:6, name:"Paneer Butter Masala", cat:"veg", price:160, img:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400", desc:"Creamy Paneer with Naan" },
  { id:7, name:"Cold Coffee", cat:"drinks", price:80, img:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400", desc:"Chilled Cold Coffee" },
  { id:8, name:"Fresh Orange Juice", cat:"drinks", price:70, img:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400", desc:"Fresh Orange Juice" }
];

let cart = [];
let currentFilter = 'all';

function showFoods(list){
  let box = document.getElementById('foodList');
  box.innerHTML = list.map(f => `
    <div class="card">
      <img src="${f.img}">
      <h3>${f.name}</h3>
      <p>${f.desc}</p>
      <div class="price">₹${f.price}</div>
      <button class="add-btn" onclick="addToCart(${f.id})">Add to Cart +</button>
    </div>
  `).join('');
}

function filterFood(cat){
  currentFilter = cat;
  if(cat === 'all') showFoods(foods);
  else showFoods(foods.filter(f => f.cat === cat));
}

function searchFood(){
  let q = document.getElementById('search').value.toLowerCase();
  let filtered = foods.filter(f => f.name.toLowerCase().includes(q));
  if(currentFilter !== 'all') filtered = filtered.filter(f => f.cat === currentFilter);
  showFoods(filtered);
}

function addToCart(id){
  let item = foods.find(f => f.id === id);
  cart.push(item);
  document.getElementById('cartCount').innerText = cart.length;
  alert(item.name + ' added to cart!');
}

function showCart(){
  let box = document.getElementById('cartBox');
  box.style.display = 'block';
  let itemsDiv = document.getElementById('cartItems');
  if(cart.length === 0){
    itemsDiv.innerHTML = '<p>Cart is empty!</p>';
    document.getElementById('total').innerText = 'Total: ₹0';
    return;
  }
  itemsDiv.innerHTML = cart.map((c,i) => `
    <div class="cart-item">
      <span>${c.name}</span>
      <span>₹${c.price} <b style="color:red;cursor:pointer" onclick="removeItem(${i})">✖</b></span>
    </div>
  `).join('');
  let total = cart.reduce((sum,c) => sum + c.price, 0);
  document.getElementById('total').innerText = 'Total: ₹' + total + ' + ₹30 Delivery = ₹' + (total+30);
}

function removeItem(i){
  cart.splice(i,1);
  document.getElementById('cartCount').innerText = cart.length;
  showCart();
}

function hideCart(){
  document.getElementById('cartBox').style.display = 'none';
}

function placeOrder(){
  let name = document.getElementById('custName').value.trim();
  let addr = document.getElementById('custAddress').value.trim();
  if(cart.length === 0){ alert('Cart empty!'); return; }
  if(!name || !addr){ alert('Please enter Name and Address'); return; }
  document.getElementById('orderMsg').innerText = `Thank you ${name}! Your order will arrive in 30 mins to ${addr} 🎉`;
  cart = [];
  document.getElementById('cartCount').innerText = 0;
  setTimeout(()=>{ hideCart(); document.getElementById('cartItems').innerHTML=''; document.getElementById('total').innerText='Total: ₹0'; }, 3000);
}

showFoods(foods);
