// Q8. Dynamic Discount Evaluator

const cart = [
  { item: "Laptop", category: "electronics", price: 45000 },
  { item: "Shoes", category: "fashion", price: 2500 },
  { item: "Book", category: "education", price: 600 }
];

// Loop through cart and apply category discounts
const discountedCart = [];
for (const product of cart) {
  let discountRate = 0;

  if (product.category === "electronics") {
    discountRate = 0.10; // 10% off electronics
  } else if (product.category === "fashion") {
    discountRate = 0.05; // 5% off fashion
  }

  const finalPrice = product.price - product.price * discountRate;
  discountedCart.push({ ...product, discountRate, finalPrice });
  console.log(`${product.item}: ${product.price} -> ${finalPrice} (${discountRate * 100}% off)`);
}

// Original total (before any discount) decides the extra discount
const originalTotal = cart.reduce((sum, p) => sum + p.price, 0);

// Total after category discounts, calculated with reduce()
let total = discountedCart.reduce((sum, p) => sum + p.finalPrice, 0);

// Extra 5% overall discount if the cart value exceeds 50000
if (originalTotal > 50000) {
  console.log("Cart value > 50000: extra 5% overall discount applied");
  total = total * 0.95;
} else {
  console.log("Cart value <= 50000: no extra discount");
}

console.log("Original total :", originalTotal);
console.log("Final total    :", total);
