// Google Sign-In logic
// Replace with your Google Client ID
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

function handleGoogleCredentialResponse(response) {
    // Decode JWT to get user info
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    const email = payload.email;
    const name = payload.name || email.split('@')[0];
    const profileImage = payload.picture || '';
    // Try to find user in localStorage
    let users = JSON.parse(localStorage.getItem('ghmarketplace_users') || '[]');
    let foundUser = users.find(u => u.email === email);
    if (!foundUser) {
        // Register new user with Google info
        foundUser = {
            name,
            email,
            phone: '',
            gender: '',
            password: '',
            profileImage
        };
        users.push(foundUser);
        localStorage.setItem('ghmarketplace_users', JSON.stringify(users));
    }
    currentUser = foundUser;
    alert(`Welcome${foundUser.name ? ' ' + foundUser.name : ''}! You are signed in with Google.`);
    // Hide modals if open
    hideModal(registrationModal);
    hideModal(loginModal);
    if (profileBtn) profileBtn.classList.remove('hidden');
    showProfile();
}

function showGoogleOneTap(mode) {
    // mode: 'register' or 'login'
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse
    });
    google.accounts.id.prompt();
}
const products = [
    {
        id: 1,
        name: "Fresh Pineapples",
        description: "Sweet and juicy pineapples harvested from Eastern Region farms. Packed with vitamin C and perfect for juices or eating fresh.",
        price: 15.00,
        image: "IMAGE/Fresh Pineapples.jpg",
        seller: "FarmFresh Ltd",
        location: "Koforidua, Eastern Region"
    },
    {
        id: 2,
        name: "Handwoven Kente Cloth",
        description: "Authentic Ghanaian kente cloth handwoven by master weavers from Bonwire. Available in various colors and patterns.",
        price: 250.00,
        image: "IMAGE/Handwoven Kente Cloth.jpg",
        seller: "Kente Heritage",
        location: "Kumasi, Ashanti Region"
    },
    {
        id: 3,
        name: "Organic Cocoa Butter",
        description: "100% natural cocoa butter from Northern Ghana. Great for skin and hair care. Unrefined and chemical-free.",
        price: 30.00,
        image: "IMAGE/organic cocoa butter.jpg",
        seller: "Naturals by Amina",
        location: "Tamale, Northern Region"
    },
    {
        id: 4,
        name: "Wooden Carving Set",
        description: "Hand-carved wooden sculptures depicting traditional Ghanaian symbols and figures. Each piece is unique.",
        price: 100.00,
        image: "IMAGE/wooden carving set.jpg",
        seller: "Artisan Woodworks",
        location: "Accra, Greater Accra"
    },
    {
        id: 5,
        name: "Organic Cocoa Powder",
        description: "Premium cocoa powder made from beans grown in Western Region. Perfect for baking and beverages.",
        price: 50.00,
        image: "IMAGE/Fresh-produce-market.jpg",
        seller: "Cocoa Delight",
        location: "Takoradi, Western Region"
    },
    {
        id: 6,
        name: "African Print Dress",
        description: "Beautifully tailored dress made with authentic African print fabric. Available in various sizes and patterns.",
        price: 85.00,
        image: "IMAGE/cothing.jpg",
        seller: "Afi Designs",
        location: "Tema, Greater Accra"
    }
    ,
    {
        id: 7,
        name: "Smartphone (Samsung Galaxy A32)",
        description: "Brand new Samsung Galaxy A32 with 64GB storage, 4GB RAM, and a stunning Super AMOLED display. Comes with warranty and accessories.",
        price: 1350.00,
        image: "IMAGE/electronics.jpg",
        seller: "Mobile Hub",
        location: "Accra, Greater Accra"
    },
    {
        id: 8,
        name: "Home Blender (Binatone 1.5L)",
        description: "Durable Binatone 1.5L blender for all your kitchen needs. Features stainless steel blades, multiple speed settings, and safety lock.",
        price: 320.00,
        image: "IMAGE/blender.jpg",
        seller: "Appliance World",
        location: "Kumasi, Ashanti Region"
    }
];

// Current user state
let currentUser = null;
let currentProduct = null;

// Hero slider images - Showcasing Ghanaian marketplace scenes
const heroImages = [
    "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cf9647cc-6d8a-47cc-bc8b-ae9ab9cb4e4a.png",
    "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/db2584e7-483d-462b-b486-4e630d2335dc.png",
    "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9314a482-f71c-46b1-929b-473ad6e5da64.png"
];
let currentHeroIndex = 0;

// DOM Elements
const registrationModal = document.getElementById('registrationModal');
const loginModal = document.getElementById('loginModal');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const productModal = document.getElementById('productModal');
const paymentModal = document.getElementById('paymentModal');
const paymentSuccessModal = document.getElementById('paymentSuccessModal');
const otpModal = document.getElementById('otpModal');

// Buttons to open modals
const registerBtn = document.getElementById('registerBtn');
const becomeSellerBtn = document.getElementById('becomeSellerBtn');
const showLoginModalBtn = document.getElementById('showLoginModal');
const showRegistrationModalBtn = document.getElementById('showRegistrationModal');
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
const buyNowBtn = document.getElementById('buyNowBtn');
const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
const resendOtpBtn = document.getElementById('resendOtpBtn');

// Buttons to close modals
const closeRegistrationModalBtn = document.getElementById('closeRegistrationModal');
const closeLoginModalBtn = document.getElementById('closeLoginModal');
const closeForgotPasswordModalBtn = document.getElementById('closeForgotPasswordModal');
const closeProductModalBtn = document.getElementById('closeProductModal');
const closePaymentModalBtn = document.getElementById('closePaymentModal');
const closePaymentSuccessModalBtn = document.getElementById('closePaymentSuccessModal');
const closeOtpModalBtn = document.getElementById('closeOtpModal');

// Forms
const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const paymentForm = document.getElementById('paymentForm');
const otpForm = document.getElementById('otpForm');

// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

// Functions
// Profile modal logic
const profileBtn = document.getElementById('profileBtn');
const profileModal = document.getElementById('profileModal');
const closeProfileModalBtn = document.getElementById('closeProfileModal');
const profileDetails = document.getElementById('profileDetails');

// Show/hide password logic
const regPassword = document.getElementById('regPassword');
const regConfirmPassword = document.getElementById('regConfirmPassword');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
if (togglePassword && regPassword) {
    togglePassword.addEventListener('click', function() {
        const type = regPassword.type === 'password' ? 'text' : 'password';
        regPassword.type = type;
        // Optionally change icon
    });
}
if (toggleConfirmPassword && regConfirmPassword) {
    toggleConfirmPassword.addEventListener('click', function() {
        const type = regConfirmPassword.type === 'password' ? 'text' : 'password';
        regConfirmPassword.type = type;
    });
}

function showProfile() {
    if (!currentUser) return;
    let html = `<div class="mb-4 text-center">
        <div class="flex flex-col items-center mb-4">
            <img id="profileImageDisplay" src="${currentUser.profileImage ? currentUser.profileImage : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.name)}" alt="Profile Image" class="w-24 h-24 rounded-full object-cover border-2 border-green-500 mb-2">
            <label for="updateProfileImage" class="block text-gray-700 mb-1">Update Profile Image</label>
            <input type="file" id="updateProfileImage" accept="image/*" class="w-full px-3 py-2 border border-gray-300 rounded-md form-input mb-2 cursor-pointer">
        </div>
        <span class="block text-gray-700 font-bold">Name:</span>
        <span class="block text-gray-900 mb-2">${currentUser.name}</span>
        <span class="block text-gray-700 font-bold">Email:</span>
        <span class="block text-gray-900 mb-2">${currentUser.email}</span>
        <span class="block text-gray-700 font-bold">Phone:</span>
        <span class="block text-gray-900 mb-2">${currentUser.phone}</span>
        <button id="logoutBtn" class="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition duration-300">Logout</button>
    </div>`;
    profileDetails.innerHTML = html;
    showModal(profileModal);
    // Add event for updating profile image directly on file input change
    const updateProfileImageInput = document.getElementById('updateProfileImage');
    if (updateProfileImageInput) {
        updateProfileImageInput.onchange = function() {
            if (updateProfileImageInput.files && updateProfileImageInput.files[0]) {
                const file = updateProfileImageInput.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    currentUser.profileImage = e.target.result;
                    document.getElementById('profileImageDisplay').src = currentUser.profileImage;
                    alert('Profile image updated!');
                };
                reader.readAsDataURL(file);
            }
        };
    }
    // Add event for logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.onclick = function() {
            currentUser = null;
            hideModal(profileModal);
            // Hide profile button and show register/login if needed
            const profileBtn = document.getElementById('profileBtn');
            if (profileBtn) profileBtn.classList.add('hidden');
            // Optionally, show register/login buttons if you have them
            // location.reload(); // Optionally reload to reset UI
        };
    }
}

if (profileBtn) {
    profileBtn.addEventListener('click', showProfile);
}
if (closeProfileModalBtn) {
    closeProfileModalBtn.addEventListener('click', () => hideModal(profileModal));
}
function showModal(modal) {
    modal.classList.remove('hidden');
}

function hideModal(modal) {
    modal.classList.add('hidden');
}

function displayProducts() {
    const productContainer = document.querySelector('.grid-cols-1');
    productContainer.innerHTML = '';
    // Category details logic
    const categoryDetails = {
        produce: {
            title: 'Fresh Produce',
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/728f8d00-f0d5-4a15-b52e-2248bad34e84.png',
            description: 'Discover a wide variety of fresh fruits and vegetables sourced directly from local Ghanaian farms. Enjoy seasonal produce, organic options, and the best quality for your family and business.'
        },
        clothing: {
            title: 'Clothing',
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/35270295-2422-4d00-a526-e568d8cbd190.png',
            description: 'Shop authentic Ghanaian clothing and textiles, including vibrant kente, African print dresses, and handmade accessories. Support local tailors and designers while looking your best.'
        },
        handicrafts: {
            title: 'Handicrafts',
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/802a29c4-c656-4851-b3ba-45b89980d999.png',
            description: 'Explore unique, hand-crafted items such as wood carvings, beadwork, pottery, and traditional art. Each piece tells a story and supports Ghanaian artisans.'
        },
        electronics: {
            title: 'Electronics',
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f7f51eaf-68b6-48e0-a144-86f9fcd9ba9d.png',
            description: 'Find the latest gadgets, phones, and accessories available in Ghana. Shop with confidence from trusted sellers and enjoy great deals on electronics.'
        }
    };

    // Modal logic for category details
    const categoryModal = document.getElementById('categoryModal');
    const categoryModalContent = document.getElementById('categoryModalContent');
    const closeCategoryModalBtn = document.getElementById('closeCategoryModal');

    function showCategoryModal(categoryKey) {
        const details = categoryDetails[categoryKey];
        if (!details) return;
        categoryModalContent.innerHTML = `
            <div class="text-center">
                <img src="${details.image}" alt="${details.title}" class="w-32 h-32 mx-auto rounded-lg mb-4 object-cover">
                <h2 class="text-2xl font-bold text-gray-800 mb-2">${details.title}</h2>
                <p class="text-gray-700 mb-4">${details.description}</p>
            </div>
        `;
        categoryModal.classList.remove('hidden');
    }

    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showCategoryModal(category);
        });
    });

    if (closeCategoryModalBtn) {
        closeCategoryModalBtn.addEventListener('click', () => {
            categoryModal.classList.add('hidden');
        });
    }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden product-card transition duration-300';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="font-bold text-xl mb-2">${product.name}</h3>
                    <p class="text-gray-600 mb-2 truncate">${product.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-lg">GHS ${product.price.toFixed(2)}</span>
                        <button class="view-product-btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300" data-id="${product.id}">
                            View
                        </button>
                    </div>
                </div>
            `;
            productContainer.appendChild(productCard);
        });

        // Add event listeners to product buttons
        document.querySelectorAll('.view-product-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                viewProduct(productId);
            });
        });
}

let cart = [];

function addToCart(productName, price) {
  // Check if product already exists in cart
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  updateCart();
  showCartCount();
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  updateCart();
  showCartCount();
}

function updateCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  if (!cartItemsDiv) return;
  cartItemsDiv.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<div class="text-gray-500 text-center">Your cart is empty.</div>';
  }
  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item flex justify-between items-center mb-2';
    const itemInfo = document.createElement('span');
    itemInfo.textContent = `${item.name} (x${item.quantity}) - GHS ${(item.price * item.quantity).toFixed(2)}`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'text-red-500 hover:underline ml-2';
    removeBtn.onclick = () => removeFromCart(item.name);
    itemDiv.appendChild(itemInfo);
    itemDiv.appendChild(removeBtn);
    cartItemsDiv.appendChild(itemDiv);
    total += item.price * item.quantity;
  });
  document.getElementById('total').textContent = total.toFixed(2);
}

function showCartCount() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

function viewProduct(productId) {
    currentProduct = products.find(p => p.id === productId);
    document.getElementById('productModalTitle').textContent = currentProduct.name;
    document.getElementById('productModalDescription').textContent = currentProduct.description;
    document.getElementById('productModalPrice').textContent = `GHS ${currentProduct.price.toFixed(2)}`;
    document.getElementById('productModalLocation').textContent = currentProduct.location;
    document.getElementById('productModalSeller').textContent = `Sold by ${currentProduct.seller}`;
    // Set image for each product in the modal
    let modalImageSrc = currentProduct.image;
    switch (currentProduct.name) {
        case "Fresh Pineapples":
            modalImageSrc = "IMAGE/Fresh Pineapples.jpg";
            break;
        case "Handwoven Kente Cloth":
            modalImageSrc = "IMAGE/Handwoven Kente Cloth.jpg";
            break;
        case "Shea Butter":
            modalImageSrc = "IMAGE/organic cocoa butter.jpg"; // Shea Butter image not present, using cocoa butter as placeholder
            break;
        case "Wooden Carving Set":
            modalImageSrc = "IMAGE/wooden carving set.jpg";
            break;
        case "Organic Cocoa Powder":
            modalImageSrc = "IMAGE/Fresh-produce-market.jpg"; // No cocoa powder image, using produce market as placeholder
            break;
        case "African Print Dress":
            modalImageSrc = "IMAGE/cothing.jpg"; // Typo in file, using cothing.jpg
            break;
        default:
            modalImageSrc = currentProduct.image;
    }
    document.getElementById('productModalImage').src = modalImageSrc;
    document.getElementById('productModalImage').alt = `Detailed view of ${currentProduct.name}`;
    document.getElementById('paymentAmount').value = currentProduct.price.toFixed(2);

    // Add to Cart button event in modal
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.onclick = function() {
            addToCart(currentProduct.name, currentProduct.price);
        };
    }
    showModal(productModal);
}

function animateHeroSlider() {
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;
    currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
    setTimeout(animateHeroSlider, 5000);
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function startOTPTimer() {
    let timeLeft = 90;
    const timerElement = document.getElementById('otpTimer');
    
    const timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `Resend available in ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('resendOtpBtn').disabled = false;
            timerElement.textContent = '';
        }
        
        timeLeft--;
    }, 1000);
}

// Event Listeners
// Enable Register button only if terms accepted
const acceptTermsRegister = document.getElementById('acceptTermsRegister');
const registerSubmitBtn = document.getElementById('registerSubmitBtn');
if (acceptTermsRegister && registerSubmitBtn) {
    acceptTermsRegister.addEventListener('change', function() {
        registerSubmitBtn.disabled = !this.checked;
    });
}
// Enable Confirm Payment button only if terms accepted
const acceptTermsPayment = document.getElementById('acceptTermsPayment');
// confirmPaymentBtn is already declared above, so just reuse it here
if (acceptTermsPayment && confirmPaymentBtn) {
    acceptTermsPayment.addEventListener('change', function() {
        confirmPaymentBtn.disabled = !this.checked;
    });
}
// Open Terms modal from registration or payment
const openTermsFromRegister = document.getElementById('openTermsFromRegister');
if (openTermsFromRegister) {
    openTermsFromRegister.addEventListener('click', function() {
        showModal(document.getElementById('termsModal'));
    });
}
const openTermsFromPayment = document.getElementById('openTermsFromPayment');
if (openTermsFromPayment) {
    openTermsFromPayment.addEventListener('click', function() {
        showModal(document.getElementById('termsModal'));
    });
}
// Google Sign-In button events
document.addEventListener('DOMContentLoaded', function() {
    const googleRegisterBtn = document.getElementById('googleRegisterBtn');
    if (googleRegisterBtn) {
        googleRegisterBtn.addEventListener('click', function() {
            if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
                google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: handleGoogleCredentialResponse
                });
                google.accounts.id.prompt();
            } else {
                alert('Google Sign-In is not available. Please check your internet connection.');
            }
        });
    }
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function() {
            if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
                google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: handleGoogleCredentialResponse
                });
                google.accounts.id.prompt();
            } else {
                alert('Google Sign-In is not available. Please check your internet connection.');
            }
        });
    }
});
registerBtn.addEventListener('click', () => {
    if (currentUser) {
        showProfile();
    } else {
        showModal(registrationModal);
    }
});
becomeSellerBtn.addEventListener('click', () => showModal(registrationModal));
showLoginModalBtn.addEventListener('click', () => {
    hideModal(registrationModal);
    showModal(loginModal);
});
showRegistrationModalBtn.addEventListener('click', () => {
    hideModal(loginModal);
    showModal(registrationModal);
});
forgotPasswordBtn.addEventListener('click', () => {
    hideModal(loginModal);
    showModal(forgotPasswordModal);
});
buyNowBtn.addEventListener('click', () => {
    hideModal(productModal);
    showModal(paymentModal);
});
// Cart button
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartModalBtn = document.getElementById('closeCartModal');
if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        updateCart();
        showModal(cartModal);
    });
}
if (closeCartModalBtn) {
    closeCartModalBtn.addEventListener('click', () => hideModal(cartModal));
}
// Checkout button
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        hideModal(cartModal);
        if (cart.length > 0) {
            // Calculate cart total
            let total = 0;
            cart.forEach(item => {
                total += item.price * item.quantity;
            });
            // Calculate 1% tax
            const tax = total * 0.01;
            const grandTotal = total + tax;
            // Set payment amount input
            const paymentAmountInput = document.getElementById('paymentAmount');
            if (paymentAmountInput) {
                paymentAmountInput.value = grandTotal.toFixed(2);
                paymentAmountInput.setAttribute('title', `Subtotal: GHS ${total.toFixed(2)} + Tax (1%): GHS ${tax.toFixed(2)}`);
            }
            // Optionally show tax breakdown in payment modal
            let taxInfo = document.getElementById('taxInfo');
            if (!taxInfo) {
                const amountDiv = paymentAmountInput.closest('div.relative');
                taxInfo = document.createElement('div');
                taxInfo.id = 'taxInfo';
                taxInfo.className = 'text-xs text-gray-500 mt-1';
                amountDiv.parentNode.insertBefore(taxInfo, amountDiv.nextSibling);
            }
            taxInfo.innerHTML = `Subtotal: <b>GHS ${total.toFixed(2)}</b> &nbsp; | &nbsp; Tax (1%): <b>GHS ${tax.toFixed(2)}</b> &nbsp; | &nbsp; <span class='text-green-700 font-bold'>Total: GHS ${grandTotal.toFixed(2)}</span>`;
            // Set currentProduct to first cart item for payment (for legacy logic)
            currentProduct = products.find(p => p.name === cart[0].name);
            showModal(paymentModal);
        }
    });
}

// Close modal buttons
closeRegistrationModalBtn.addEventListener('click', () => hideModal(registrationModal));
closeLoginModalBtn.addEventListener('click', () => hideModal(loginModal));
closeForgotPasswordModalBtn.addEventListener('click', () => {
    hideModal(forgotPasswordModal);
    showModal(loginModal);
});
closeProductModalBtn.addEventListener('click', () => hideModal(productModal));
closePaymentModalBtn.addEventListener('click', () => {
    hideModal(paymentModal);
    showModal(productModal);
});
closePaymentSuccessModalBtn.addEventListener('click', () => hideModal(paymentSuccessModal));
closeOtpModalBtn.addEventListener('click', () => hideModal(otpModal));

// Form submissions
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;
    // Password match validation
    const regPasswordValue = document.getElementById('regPassword').value;
    const regConfirmPasswordValue = document.getElementById('regConfirmPassword').value;
    if (regPasswordValue !== regConfirmPasswordValue) {
        alert('Wrong password: Passwords do not match.');
        return;
    }
    // Simple validation
    if (!name || !email || !phone || !password || !gender) {
        alert('Please fill in all fields');
        return;
    }
    if (phone.length !== 9) {
        alert('Phone number must be exactly 10 digits.');
        return;
    }
    // Registration does not handle profile image upload; only in profile update
    const userObj = {
        name,
        email,
        phone: '+233' + phone,
        gender,
        password, // NOTE: In a real app, never store raw passwords!
        profileImage: ''
    };
    // Save user to localStorage
    let users = JSON.parse(localStorage.getItem('ghmarketplace_users') || '[]');
    users.push(userObj);
    localStorage.setItem('ghmarketplace_users', JSON.stringify(users));
    currentUser = userObj;
    alert(`Registration successful! Welcome ${name}`);
    hideModal(registrationModal);
    if (profileBtn) profileBtn.classList.remove('hidden');
    showProfile();
    registrationForm.reset();
});

// --- OTP Timer Logic ---
let otpTimerInterval = null;
function startOTPTimer() {
    const otpTimer = document.getElementById('otpTimer');
    let timeLeft = 90; // 1 minute 30 seconds
    if (otpTimerInterval) clearInterval(otpTimerInterval);
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        otpTimer.textContent = `Resend available in ${minutes}:${seconds.toString().padStart(2, '0')}`;
        if (timeLeft <= 0) {
            clearInterval(otpTimerInterval);
            otpTimer.textContent = 'You can resend the OTP now.';
            document.getElementById('resendOtpBtn').disabled = false;
        } else {
            document.getElementById('resendOtpBtn').disabled = true;
        }
        timeLeft--;
    }
    updateTimer();
    otpTimerInterval = setInterval(updateTimer, 1000);
}

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Login with registered users from localStorage
    let users = JSON.parse(localStorage.getItem('ghmarketplace_users') || '[]');
    const foundUser = users.find(u => (u.email === email || u.phone === email || u.phone.replace('+233','') === email) && u.password === password);
    if (foundUser) {
        currentUser = foundUser;
        alert(`Welcome back ${currentUser.name}!`);
        hideModal(loginModal);
        // Change register button to profile
        registerBtn.textContent = currentUser.name;
        becomeSellerBtn.textContent = "My Dashboard";
        if (profileBtn) profileBtn.classList.remove('hidden');
        showProfile();
    } else {
        alert('Invalid email/phone or password');
    }
    this.reset();
});

forgotPasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    // Generate OTP
    const otp = generateOTP();
    
    // Show OTP modal
    hideModal(forgotPasswordModal);
    showModal(otpModal);
    
    // Start OTP timer
    startOTPTimer();
    
    // Show message (in a real app, this would send via SMS/email)
    alert(`We've sent an OTP to the email and phone number associated with ${email}. OTP: ${otp}`);
});

paymentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const momoProvider = document.getElementById('momoProvider').value;
    const momoNumber = document.getElementById('momoNumber').value;
    
    if (!momoNumber) {
        alert('Please enter your MoMo number');
        return;
    }
    
    // Generate payment OTP
    const otp = generateOTP();
    
    // Show OTP modal
    hideModal(paymentModal);
    showModal(otpModal);
    
    // Start OTP timer
    startOTPTimer();
    
    // Show message (in a real app, this would send via SMS/email)
    alert(`Please enter the OTP sent to ${momoProvider} number ${momoNumber}. OTP: ${otp}`);
});

otpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Simulate OTP verification
    hideModal(otpModal);
    // If this was a payment verification, show success and alert transaction
    if (currentProduct) {
        showModal(paymentSuccessModal);
        // Alert user of transaction details
        const momoProvider = document.getElementById('momoProvider').value;
        const momoNumber = document.getElementById('momoNumber').value;
        const amount = document.getElementById('paymentAmount').value;
        const productName = currentProduct.name;
        setTimeout(() => {
            alert(`Payment Successful!\n\nProduct: ${productName}\nAmount: GHS ${amount}\nMoMo Provider: ${momoProvider}\nMoMo Number: ${momoNumber}`);
        }, 500);
        // Optionally, clear currentProduct after payment
        currentProduct = null;
    } else {
        // Otherwise it was password reset
        alert('Your password has been reset. Please check your email for instructions.');
        showModal(loginModal);
    }
});

resendOtpBtn.addEventListener('click', function() {
    const otp = generateOTP();
    
    // Start new timer
    startOTPTimer();
    
    // Show message (in a real app, this would send via SMS/email)
    alert(`New OTP sent. OTP: ${otp}`);
});

// Mobile menu toggle
mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    animateHeroSlider();
    showCartCount();
    // Set default MoMo number
    document.getElementById('momoNumber').value = '';

    // Show register/login popup after 7 seconds if not logged in
    setTimeout(function() {
        if (!currentUser) {
            // Prefer registration modal, or show login if user prefers
            showModal(registrationModal);
        }
    }, 7000);

    // Password generator for registration
    const generatePasswordBtn = document.getElementById('generatePasswordBtn');
    if (generatePasswordBtn) {
        generatePasswordBtn.addEventListener('click', function() {
            function randomPassword(length = 12) {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
                let pass = '';
                for (let i = 0; i < length; i++) {
                    pass += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return pass;
            }
            const password = randomPassword();
            document.getElementById('regPassword').value = password;
            document.getElementById('regConfirmPassword').value = password;
            alert('A strong password has been generated and filled in for you.');
        });
    }
});
