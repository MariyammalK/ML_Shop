function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase().split(' ');
    const products = document.querySelectorAll('.product-box');
    products.forEach(product => {
        const name = product.dataset.name.toLowerCase();
        const color = product.dataset.color.toLowerCase();
        const type = product.dataset.type.toLowerCase();
        
        const matches = query.every(term => name.includes(term) || color.includes(term) || type.includes(term));
        
        if (matches) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product-box');
    const applyButton = document.getElementById('filter-button');

    applyButton.addEventListener('click', filterProducts);

    function filterProducts() {
        const selectedColors = getSelectedCheckboxes('color');
        const selectedGenders = getSelectedCheckboxes('gender');
        const selectedPrices = getSelectedCheckboxes('price');
        const selectedTypes = getSelectedCheckboxes('type');

        products.forEach(product => {
            const color = product.dataset.color.toLowerCase();
            const gender = product.dataset.gender.toLowerCase();
            const price = parseInt(product.dataset.price);
            const type = product.dataset.type.toLowerCase();

            const matchesColor = selectedColors.length === 0 || selectedColors.includes(color);
            const matchesGender = selectedGenders.length === 0 || selectedGenders.includes(gender);
            const matchesPrice = selectedPrices.length === 0 || selectedPrices.includes(getPriceRange(price));
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(type);

            if (matchesColor && matchesGender && matchesPrice && matchesType) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    }

    function getSelectedCheckboxes(filterName) {
        const checkboxes = document.querySelectorAll(`input[type="checkbox"][data-filter="${filterName}"]:checked`);
        return Array.from(checkboxes).map(checkbox => checkbox.value);
    }

    function getPriceRange(price) {
        if (price <= 250) {
            return 'low';
        } else if (price <= 450) {
            return 'medium';
        } else {
            return 'high';
        }
    }
});

function addToCart(button) {
    const productBox = button.parentElement.parentElement;
    const productImage = productBox.querySelector('img').src;
    const productName = productBox.querySelector('.product-details h2, .product-details h3, .product-details h4').textContent;
    const productPrice = productBox.querySelector('.product-details p:nth-child(3)').textContent;
    
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ image: productImage, name: productName, price: productPrice, quantity: 1 });
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    window.location.href = 'card.html';
}
function deleteItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.location.reload();
    }
    $(document).ready(function() {
        function displayCart() {
            var cart = JSON.parse(localStorage.getItem('cart')) || [];
            $('#cartItems').empty();
    
            if (cart.length === 0) {
                $('#emptyCartMessage').show();
                $('#totalButton').hide();
                $('#totalPrice').hide();
            } else {
                $('#emptyCartMessage').hide();
                $('#totalButton').show();
                $('#totalPrice').show();
    
                cart.forEach(item => {
                    var cartItem = `
                        <div class="cart-item" data-id="${item.id}">
                            <img src="${item.img}" alt="${item.title}" class="cart-img">
                            <span class="cart-title">${item.title}</span>
                            <input type="number" class="quantity" value="${item.quantity}" min="1" max="10">
                            <button class="delete">Delete</button>
                        </div>
                    `;
                    $('#cartItems').append(cartItem);
                });
    
                $('.delete').click(function() {
                    var itemId = $(this).parent().data('id');
                    var cart = JSON.parse(localStorage.getItem('cart')) || [];
                    cart = cart.filter(item => item.id !== itemId);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    displayCart();
                });
    
                $('.quantity').change(function() {
                    var itemId = $(this).parent().data('id');
                    var newQuantity = parseInt($(this).val());
                    if (newQuantity > 10) {
                        alert('Quantity cannot be more than 10');
                        $(this).val(10);
                        newQuantity = 10;
                    }
                    var cart = JSON.parse(localStorage.getItem('cart')) || [];
                    var cartItem = cart.find(item => item.id === itemId);
                    cartItem.quantity = newQuantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateTotalPrice();
                });
    
                updateTotalPrice();
            }
        }
    
        function updateTotalPrice() {
            var cart = JSON.parse(localStorage.getItem('cart')) || [];
            var total = 0;
            cart.forEach(item => {
                total += item.price * item.quantity;
            });
            $('#totalPrice').text(`Total: $${total}`);
        }
    
        $('#totalButton').click(function() {
            updateTotalPrice();
        });
    
        displayCart();
    });
    