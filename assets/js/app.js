
const BOOKS = [
  {id:1,title:"The Alchemist",author:"Paulo Coelho",category:"Fiction",price:250,image:"assets/images/alchemist.svg"},
  {id:2,title:"Atomic Habits",author:"James Clear",category:"Self Help",price:350,image:"assets/images/atomic-habits.svg"},
  {id:3,title:"Rich Dad Poor Dad",author:"Robert Kiyosaki",category:"Finance",price:300,image:"assets/images/rich-dad.svg"},
  {id:4,title:"Think and Grow Rich",author:"Napoleon Hill",category:"Business",price:280,image:"assets/images/think-grow-rich.svg"},
  {id:5,title:"The Kite Runner",author:"Khaled Hosseini",category:"Fiction",price:300,image:"assets/images/kite-runner.svg"},
  {id:6,title:"The 7 Habits",author:"Stephen Covey",category:"Self Help",price:320,image:"assets/images/seven-habits.svg"}
];

function getCart(){
  try{return JSON.parse(localStorage.getItem("bookstoreCart") || "[]")}catch(e){return []}
}
function saveCart(cart){localStorage.setItem("bookstoreCart",JSON.stringify(cart)); updateCartCount()}
function addToCart(id, qty=1){
  const cart=getCart();
  const found=cart.find(x=>x.id===id);
  if(found) found.qty += qty; else cart.push({id,qty});
  saveCart(cart);
  alert("Book added to cart.");
}
function removeFromCart(id){
  saveCart(getCart().filter(x=>x.id!==id));
  if(typeof renderCart==="function") renderCart();
}
function updateQty(id,qty){
  qty=Math.max(1,parseInt(qty||1,10));
  const cart=getCart(); const item=cart.find(x=>x.id===id);
  if(item)item.qty=qty;
  saveCart(cart);
  if(typeof renderCart==="function") renderCart();
}
function cartDetails(){
  return getCart().map(c=>{
    const b=BOOKS.find(x=>x.id===c.id);
    return b?{...b,qty:c.qty,total:b.price*c.qty}:null;
  }).filter(Boolean);
}
function updateCartCount(){
  const n=getCart().reduce((s,x)=>s+x.qty,0);
  document.querySelectorAll(".cart-count").forEach(el=>el.textContent=n);
}
function money(n){return "₹"+Number(n).toLocaleString("en-IN")}
function productCard(b){
  return `<article class="card book-card">
    <img src="../${b.image}" alt="${b.title} cover">
    <div class="book-title">${b.title}</div>
    <div class="book-meta">${b.author}</div>
    <div class="price">${money(b.price)}</div>
    <button class="btn small" onclick="addToCart(${b.id})">Add to Cart</button>
  </article>`;
}
document.addEventListener("DOMContentLoaded",updateCartCount);
