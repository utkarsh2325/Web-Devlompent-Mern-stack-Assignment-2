let cart = [];
let total = 0;

function scrollToBooking() {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function addToCart(serviceName, price) {
    cart.push({ serviceName, price });
    updateCartDisplay();
}

function removeFromCart(serviceName) {
    const index = cart.findIndex(item => item.serviceName === serviceName);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    const totalPriceEl = document.getElementById('total-price');
    
    cartList.innerHTML = '';
    total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<li class="empty-msg">No items added yet.</li>';
    } else {
        cart.forEach(item => {
            total += item.price;
            const li = document.createElement('li');
            li.textContent = `${item.serviceName} - ₹${item.price}`;
            cartList.appendChild(li);
        });
    }

    totalPriceEl.textContent = total;
}

function handleBooking(e) {
    e.preventDefault();
    const statusMsg = document.getElementById('status-msg');
    
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email-id').value;
    const phone = document.getElementById('phone-num').value;

    if (cart.length === 0) {
        alert('Please add at least one service to cart.');
        return;
    }

    // EmailJS Trigger Parameters
    const templateParams = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        total_amount: total,
        services: cart.map(i => i.serviceName).join(', ')
    };

    // NOTE: 'YOUR_TEMPLATE_ID' ki jagah apna Template ID (e.g. 'template_xxxxxx') likhein
    emailjs.send('service_gqzz7wq', 'template_aa2rkhe', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            statusMsg.textContent = "Thank you For Booking the Service We will get back to you soon!";
            statusMsg.style.color = "green";
            document.getElementById('booking-form').reset();
            cart = [];
            updateCartDisplay();
        }, function(error) {
            console.log('FAILED...', error);
            statusMsg.textContent = "Failed to send email. Check console for details.";
            statusMsg.style.color = "red";
        });
}