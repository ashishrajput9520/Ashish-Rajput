const products = [
    { id: 1, name: 'Handwoven Baskets', price: 2499, image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500' },
    { id: 2, name: 'Ceramic Pottery', price: 3499, image: 'https://images.unsplash.com/photo-1565193566173-7cda82f8ce10?w=500' },
    { id: 3, name: 'Wooden Crafts', price: 1999, image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500' },
    { id: 4, name: 'Embroidered Textiles', price: 2999, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' },
    { id: 5, name: 'Leather Products', price: 4499, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500' },
    { id: 6, name: 'Handmade Jewelry', price: 2199, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' },
    { id: 7, name: 'Paper Crafts', price: 1499, image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500' },
    { id: 8, name: 'Stone Sculptures', price: 5499, image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500' },
    { id: 9, name: 'Glass Art', price: 3999, image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500' },
    { id: 10, name: 'Bamboo Products', price: 1799, image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500' },
];

let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initApp();
    initFAQ();
});

// Initialize FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        
        // Toggle FAQ item on question click
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(faqItem => {
                if (faqItem !== item) {
                    faqItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Also make the toggle button clickable
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the question click event
                question.click();
            });
        }
    });
    
    // Close FAQ when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.faq-item')) {
            faqItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}

function initNavbar() {
    // Mobile hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close button in mobile menu
        const menuClose = document.querySelector('.menu-close');
        if (menuClose) {
            menuClose.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        }
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Setup search bar
    const searchInput = document.getElementById('searchInput');
    const mobileSearchIcon = document.getElementById('mobileSearchIcon');
    const searchPopup = document.getElementById('searchPopup');
    const searchPopupInput = document.getElementById('searchPopupInput');
    const closeSearchPopup = document.getElementById('closeSearchPopup');

    // Mobile search icon click
    if (mobileSearchIcon && searchPopup) {
        mobileSearchIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            searchPopup.classList.add('active');
            if (searchPopupInput) searchPopupInput.focus();
        });
    }

    // Close popup
    if (closeSearchPopup && searchPopup) {
        closeSearchPopup.addEventListener('click', function() {
            searchPopup.classList.remove('active');
        });
    }

    // Close popup when clicking outside
    if (searchPopup) {
        searchPopup.addEventListener('click', function(e) {
            if (e.target === searchPopup) {
                searchPopup.classList.remove('active');
            }
        });
    }

    // Close popup on Escape
    if (searchPopupInput && searchPopup) {
        searchPopupInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchPopup.classList.remove('active');
            }
        });
        searchPopupInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchPopupInput.value.toLowerCase();
                if (query.length > 0) {
                    window.location.href = 'products.html?search=' + encodeURIComponent(query);
                }
            }
        });
    }

    // Desktop search
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase();
                if (query.length > 0) {
                    window.location.href = 'products.html?search=' + encodeURIComponent(query);
                }
            }
        });
    }
}

function initApp() {
    // Load cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Get all DOM elements
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cartModal');
    const cartClose = document.querySelector('.cart-close');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountElement = document.querySelector('.cart-count');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const shopNowBtn = document.getElementById('shopNowBtn');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const productGalleryModal = document.getElementById('productGalleryModal');
    const galleryClose = document.querySelector('.gallery-close');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Update cart display
    function updateCartDisplay() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) cartCountElement.textContent = totalItems;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotalElement.textContent = '₹0';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-price">₹${item.price}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button onclick="changeQuantity(${item.id}, -1)">−</button>
                        <span style="width: 30px; text-align: center;">${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="removeItem(${item.id})">Remove</button>
                </div>
            `).join('');
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotalElement.textContent = `₹${total}`;
        }
    }

    // Add to cart function
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        showNotification(`${product.name} added to cart!`);
    }

    // Cart modal event listeners
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (cartClose) {
        cartClose.addEventListener('click', () => {
            cartModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Please add items to cart!');
                return;
            }
            showNotification('Thank you! Processing payment...', 'success');
            setTimeout(() => {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
                cartModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }, 2000);
        });
    }

    // Gallery functions
    function openGallery() {
        if (productGalleryModal) {
            productGalleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            loadGalleryProducts();
        }
    }

    function closeGallery() {
        if (productGalleryModal) {
            productGalleryModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    function loadGalleryProducts() {
        const container = document.getElementById('galleryProductsContainer');
        if (!container) return;

        container.innerHTML = products.map(p => `
            <div class="gallery-product-card">
                <img src="${p.image}" alt="${p.name}">
                <div class="gallery-product-info">
                    <h3>${p.name}</h3>
                    <p class="price">₹${p.price}</p>
                    <button class="btn btn-secondary" onclick="addProductToCart(${p.id})">Add to Cart</button>
                    <button class="btn btn-primary" onclick="buyNow(${p.id})" style="margin-top: 0.5rem;">Buy Now</button>
                </div>
            </div>
        `).join('');
    }

    // Shop Now and View More buttons - navigate to products page
    if (shopNowBtn) shopNowBtn.addEventListener('click', () => {
        window.location.href = 'products.html';
    });
    if (viewMoreBtn) viewMoreBtn.addEventListener('click', () => {
        window.location.href = 'products.html';
    });
    
    // Gallery modal event listeners
    if (galleryClose) galleryClose.addEventListener('click', closeGallery);
    if (productGalleryModal) {
        productGalleryModal.addEventListener('click', (e) => {
            if (e.target === productGalleryModal) closeGallery();
        });
    }

    // Add to cart from featured products
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
        }
        if (e.target.classList.contains('buy-now')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            setTimeout(() => {
                cartModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                closeGallery();
            }, 300);
        }
    });

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            if (name && email && message) {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            }
        });
    }

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.product-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; background: #d4af37; color: #1a1a1a;
        border: none; padding: 12px 16px; border-radius: 50%; cursor: pointer; display: none;
        z-index: 999; font-size: 1.2rem; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
    `;
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.backgroundColor = '#c49a27';
        scrollBtn.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.backgroundColor = '#d4af37';
        scrollBtn.style.transform = 'scale(1)';
    });

    // Initialize display
    updateCartDisplay();

    // Make functions global for onclick handlers
    window.addProductToCart = addToCart;
    window.changeQuantity = (id, delta) => {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity = Math.max(1, item.quantity + delta);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    };
    window.removeItem = (id) => {
        cart = cart.filter(i => i.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };
    window.buyNow = (id) => {
        addToCart(id);
        setTimeout(() => {
            cartModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            closeGallery();
        }, 300);
    };

    // Setup login modal
    setupLoginModal();

}

// Notification function (outside initApp)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 80px; right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#d4af37'};
        color: ${type === 'success' ? 'white' : '#1a1a1a'};
        padding: 16px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-weight: 600; z-index: 10000; animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Login/Profile functionality
let currentUser = null;

function setupLoginModal() {
    const profileIcon = document.querySelector('.profile-icon');
    const loginModal = document.getElementById('loginModal');
    const loginClose = document.querySelector('.login-close');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signupToggle = document.getElementById('signupToggle');
    const loginToggle = document.getElementById('loginToggle');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginFormContainer = document.querySelector('.login-form-container');
    const signupFormContainer = document.querySelector('.signup-form-container');
    const userProfileView = document.getElementById('userProfileView');

    if (!profileIcon || !loginModal) return;

    // Load user from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }

    // Open login modal
    profileIcon.addEventListener('click', () => {
        loginModal.classList.add('active');
        updateLoginUI();
    });

    // Close login modal
    loginClose.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });

    // Close when clicking outside
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });

    // Toggle between login and signup
    signupToggle.addEventListener('click', () => {
        loginFormContainer.style.display = 'none';
        signupFormContainer.style.display = 'block';
    });

    loginToggle.addEventListener('click', () => {
        signupFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
    });

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            currentUser = {
                name: email.split('@')[0],
                email: email
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            loginForm.reset();
            updateLoginUI();
            showNotification('Login successful!', 'success');
        });
    }

    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            
            currentUser = {
                name: name,
                email: email
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            signupForm.reset();
            signupFormContainer.style.display = 'none';
            loginFormContainer.style.display = 'block';
            updateLoginUI();
            showNotification('Account created successfully!', 'success');
        });
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateLoginUI();
            loginModal.classList.remove('active');
            showNotification('Logged out successfully!', 'success');
        });
    }

    function updateLoginUI() {
        if (currentUser) {
            loginFormContainer.style.display = 'none';
            signupFormContainer.style.display = 'none';
            userProfileView.style.display = 'block';
            document.getElementById('userNameDisplay').textContent = currentUser.name;
            document.getElementById('userEmailDisplay').textContent = currentUser.email;
        } else {
            loginFormContainer.style.display = 'block';
            signupFormContainer.style.display = 'none';
            userProfileView.style.display = 'none';
        }
    }
}

