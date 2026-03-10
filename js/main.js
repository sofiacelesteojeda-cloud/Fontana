/* =============================================
   ALNIKERS — JavaScript principal
   ============================================= */

'use strict';

// =============================================
// DATOS DE PRODUCTOS
// =============================================
const PRODUCTS = [
  { id: 1,  name: 'Aritos Corazón Nacar',      category: 'aritos',    price: 2500, emoji: '💎', badge: 'nuevo'  },
  { id: 2,  name: 'Aritos Flor Pastel',         category: 'aritos',    price: 1800, emoji: '🌸', badge: null     },
  { id: 3,  name: 'Aritos Mariposa Dorada',     category: 'aritos',    price: 3200, emoji: '🦋', badge: 'oferta' },
  { id: 4,  name: 'Aritos Aro Fino Pastel',     category: 'aritos',    price: 2100, emoji: '🎀', badge: null     },
  { id: 5,  name: 'Pulsera Perlas Mini',        category: 'pulseras',  price: 2200, emoji: '✨', badge: 'nuevo'  },
  { id: 6,  name: 'Pulsera Cristal Rosa',       category: 'pulseras',  price: 1900, emoji: '💫', badge: null     },
  { id: 7,  name: 'Pulsera Dije Estrella',      category: 'pulseras',  price: 2800, emoji: '⭐', badge: null     },
  { id: 8,  name: 'Collar Cadena Delicada',     category: 'collares',  price: 3500, emoji: '💝', badge: 'nuevo'  },
  { id: 9,  name: 'Collar Perla Solitaria',     category: 'collares',  price: 4200, emoji: '🌙', badge: 'oferta' },
  { id: 10, name: 'Collar Lazo Romántico',      category: 'collares',  price: 2900, emoji: '🎗️', badge: null     },
  { id: 11, name: 'Anillo Flor Esmaltada',      category: 'anillos',   price: 1500, emoji: '🌺', badge: null     },
  { id: 12, name: 'Anillo Ajustable Estrella',  category: 'anillos',   price: 1200, emoji: '🌟', badge: 'nuevo'  },
];

// =============================================
// ESTADO DEL CARRITO
// =============================================
let cart = loadCart();

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('alnikers_cart')) || [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem('alnikers_cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartUI();
  showToast(`${product.emoji} ${product.name} agregado al carrito`);
  animateCartBtn();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  updateCartUI();
  renderCartItems();
}

// =============================================
// RENDERIZADO DEL CARRITO
// =============================================
function updateCartUI() {
  const count = getCartCount();
  const badge = document.getElementById('cartCount');
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);

  const totalEl = document.getElementById('cartTotal');
  if (totalEl) {
    totalEl.textContent = formatPrice(getCartTotal());
  }
}

function formatPrice(n) {
  return '$' + n.toLocaleString('es-AR');
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛍️</div>
        <p>Tu carrito está vacío</p>
        <p style="font-size:0.78rem;opacity:0.7;">¡Agregá accesorios para comenzar!</p>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'flex';

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
      </div>
      <div class="cart-item-actions">
        <button class="qty-btn" onclick="updateQty(${item.id}, -1)" aria-label="Reducir cantidad">−</button>
        <span class="qty-display">${item.qty}</span>
        <button class="qty-btn" onclick="updateQty(${item.id}, 1)" aria-label="Aumentar cantidad">+</button>
        <button class="remove-item" onclick="removeFromCart(${item.id})" aria-label="Eliminar">✕</button>
      </div>
    </div>
  `).join('');

  // Actualizar total
  updateCartUI();
}

// =============================================
// DRAWER DEL CARRITO
// =============================================
function openCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  drawer.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function animateCartBtn() {
  const btn = document.getElementById('cartBtn');
  btn.style.transform = 'scale(1.25)';
  setTimeout(() => { btn.style.transform = ''; }, 250);
}

// =============================================
// TOAST
// =============================================
let toastTimer = null;

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// =============================================
// RENDERIZADO DE PRODUCTOS
// =============================================
function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card reveal';
  card.dataset.category = product.category;

  const badgeHTML = product.badge
    ? `<span class="product-badge ${product.badge}">${product.badge}</span>`
    : '';

  card.innerHTML = `
    <div class="product-emoji-wrap">
      <span>${product.emoji}</span>
      ${badgeHTML}
    </div>
    <div class="product-info">
      <p class="product-category">${product.category}</p>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">${formatPrice(product.price)}</p>
      <button class="add-to-cart" onclick="addToCart(${product.id})">
        + Agregar al carrito
      </button>
    </div>
  `;

  return card;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.innerHTML = '';
  PRODUCTS.forEach(p => grid.appendChild(createProductCard(p)));
  initRevealObserver();
}

// =============================================
// FILTRADO POR CATEGORÍA
// =============================================
let activeFilter = 'all';

function filterProducts(category) {
  activeFilter = category;

  // Actualizar botones
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });

  // Mostrar/ocultar tarjetas
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    if (match) {
      card.classList.remove('hidden');
      card.classList.add('fade-in');
      setTimeout(() => card.classList.remove('fade-in'), 400);
    } else {
      card.classList.add('hidden');
    }
  });
}

// Las tarjetas de categoría también filtran y desplazan
function setupCategoryCards() {
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const filter = card.dataset.filter;
      filterProducts(filter);
      document.getElementById('productos').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// =============================================
// NAVBAR — scroll y hamburger
// =============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Scroll effect
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Cerrar menú al hacer click en un link
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // Marcar link activo al hacer scroll
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinksAll = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksAll.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));
}

// =============================================
// INTERSECTION OBSERVER — reveal on scroll
// =============================================
function initRevealObserver() {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// =============================================
// SMOOTH SCROLL — links de la navbar
// =============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  // Productos
  renderProducts();

  // Filtros
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => filterProducts(btn.dataset.filter));
  });

  // Categorías → filtro
  setupCategoryCards();

  // Carrito
  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);

  // Navbar
  initNavbar();

  // Smooth scroll
  initSmoothScroll();

  // Estado inicial del carrito
  updateCartUI();

  // Cerrar carrito con ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCart();
  });
});
