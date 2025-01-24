$(document).ready(function(){
  $('.lupa').mouseover(function(){
     $('.lupa').addClass('lupa_buscador');
  });
  $('.lupa').mouseleave(function(){
     $('.lupa').removeClass('lupa_buscador');
  });
});
// JavaScript for managing cart and sidebar functionality
document.addEventListener('DOMContentLoaded', () => {
  const cart = [];
  const cartIcon = document.getElementById('header-cart-icon');
  const cartSidebar = document.getElementById('cart-sidebar');
  const closeSidebarBtn = document.querySelector('.sidebar-close-btn');
  const cartItemsContainer = document.getElementById('sidebar-cart-items');
  const totalPriceEl = document.getElementById('sidebar-total-price');
  const cartCount = document.getElementById('header-cart-count');

  // Function to add item to cart
  function addToCart(product) {
      const existingProduct = cart.find(item => item.name === product.name);
      if (existingProduct) {
          existingProduct.quantity += product.quantity;
      } else {
          cart.push(product);
      }
      updateCartIcon();
  }

  // Function to update cart icon count
  function updateCartIcon() {
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = itemCount;
  }

  // Function to open cart sidebar and show items
  function openCartSidebar() {
      cartItemsContainer.innerHTML = ''; // Clear previous items
      let total = 0;

      cart.forEach(item => {
          const itemEl = document.createElement('div');
          itemEl.classList.add('sidebar-cart-item');
          itemEl.innerHTML = `
              <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
              <strong>${item.name}</strong> - ৳${item.price} x ${item.quantity}
              <p>Subtotal: ৳${item.price * item.quantity}</p>
          `;
          total += item.price * item.quantity;
          cartItemsContainer.appendChild(itemEl);
      });

      totalPriceEl.textContent = `Total: ৳${total}`;
      cartSidebar.classList.add('open'); // Slide in the sidebar
  }

  // Function to close cart sidebar
  function closeCartSidebar() {
      cartSidebar.classList.remove('open'); // Slide out the sidebar
  }

  // Attach event listener to each "Add to Bag" button
  document.querySelectorAll('.add-to-bag-btn').forEach(button => {
      button.addEventListener('click', () => {
          const product = {
              name: button.getAttribute('data-product-name'),
              price: parseFloat(button.getAttribute('data-product-price').replace('৳', '')),
              image: button.getAttribute('data-product-image'),
              quantity: 1
          };
          addToCart(product);
      });
  });

  // Show cart sidebar when clicking on cart icon
  cartIcon.addEventListener('click', openCartSidebar);

  // Close cart sidebar when clicking on close button
  closeSidebarBtn.addEventListener('click', closeCartSidebar);

  // Close sidebar when clicking outside sidebar (optional)
  window.addEventListener('click', (event) => {
      if (event.target === cartSidebar) {
          closeCartSidebar();
      }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  const cartIcon = document.getElementById("header-cart-icon");
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeSidebarBtn = document.querySelector(".sidebar-close-btn");
  const cartItemsContainer = document.getElementById("sidebar-cart-items");
  const totalPriceEl = document.getElementById("sidebar-total-price");
  const cartCount = document.querySelector(".cart-count");

  // Ensure all necessary elements exist
  if (!cartIcon || !cartSidebar || !cartItemsContainer || !totalPriceEl || !cartCount) {
    console.error("One or more elements required for the cart functionality are missing.");
    return;
  }

  // Function to add an item to the cart
  function addToCart(product) {
    const existingProduct = cart.find((item) => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity += product.quantity; // Increment quantity if the item already exists
    } else {
      cart.push(product); // Add new product to the cart
    }
    updateCartIcon();
    renderCartItems();
  }

  // Function to update cart icon count
  function updateCartIcon() {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = `${itemCount} items`;
  }

  // Function to render cart items in the sidebar
  function renderCartItems() {
    cartItemsContainer.innerHTML = ""; // Clear previous items
    let total = 0;

    cart.forEach((item, index) => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("sidebar-cart-item");
      itemEl.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
          <div style="flex-grow: 1;">
            <strong>${item.name}</strong><br>
            ৳${item.price} x ${item.quantity} = ৳${item.price * item.quantity}
          </div>
          <div style="display: flex; align-items: center;">
            <button class="decrease-btn" data-index="${index}" style="margin-right: 5px;">-</button>
            <span>${item.quantity}</span>
            <button class="increase-btn" data-index="${index}" style="margin-left: 5px;">+</button>
          </div>
          <button class="remove-cart-item-btn" data-index="${index}" style="margin-left: 10px; color: red; background: none; border: none; cursor: pointer;">Remove</button>
        </div>
      `;
      total += item.price * item.quantity;
      cartItemsContainer.appendChild(itemEl);
    });

    totalPriceEl.textContent = `Total: ৳${total}`;

    // Attach event listeners to "Increase" and "Decrease" buttons
    document.querySelectorAll(".increase-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cart[index].quantity += 1; // Increase quantity
        updateCartIcon();
        renderCartItems(); // Re-render the cart
      });
    });

    document.querySelectorAll(".decrease-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1; // Decrease quantity (but not below 1)
          updateCartIcon();
          renderCartItems(); // Re-render the cart
        }
      });
    });

    // Attach event listeners to "Remove" buttons
    document.querySelectorAll(".remove-cart-item-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1); // Remove item from the cart
        updateCartIcon();
        renderCartItems(); // Re-render the cart
      });
    });
  }

  // Function to open the cart sidebar
  function openCartSidebar() {
    renderCartItems(); // Ensure the sidebar is updated before opening
    cartSidebar.style.display = "block"; // Show the sidebar
  }

  // Function to close the cart sidebar
  function closeCartSidebar() {
    cartSidebar.style.display = "none"; // Hide the sidebar
  }

  // Attach event listener to "Add to Bag" buttons
  document.querySelectorAll(".product-card").forEach((card) => {
    const button = card.querySelector(".add-to-bag-btn");
    if (button) {
      button.addEventListener("click", () => {
        const product = {
          name: card.querySelector("h3").textContent,
          price: parseFloat(card.querySelector(".price").textContent.replace(/[^\d]/g, "")), // Extract the price
          image: card.querySelector("img").src,
          quantity: 1,
        };
        addToCart(product);
      });
    }
  });

  // Open cart sidebar when clicking on the cart icon
  if (cartIcon) {
    cartIcon.addEventListener("click", openCartSidebar);
  }

  // Close cart sidebar when clicking on the close button
  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", closeCartSidebar);
  }

  // Optional: Close sidebar when clicking outside the sidebar
  window.addEventListener("click", (event) => {
    if (event.target === cartSidebar) {
      closeCartSidebar();
    }
  });
});
  
document.querySelectorAll(".imgg").forEach(img => {
    img.addEventListener("click", function() {
        window.location.href = img.getAttribute("data-url");
    });
});
