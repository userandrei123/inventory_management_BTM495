document.addEventListener('DOMContentLoaded', function() {
    fetchInventory();

    document.getElementById('addItemForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addItem();
    });
});

function fetchInventory() {
    fetch('/inventory')
        .then(response => response.json())
        .then(data => {
            const inventoryList = document.getElementById('inventoryList');
            inventoryList.innerHTML = '';
            data.forEach(item => {
                const itemElement = document.createElement('li');
                itemElement.textContent = `Item: ${item.name}, Quantity: ${item.quantity}`;
                inventoryList.appendChild(itemElement);
            });
        });
}

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = document.getElementById('itemQuantity').value;

    fetch('/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: itemName, quantity: parseInt(itemQuantity, 10) })
    })
    .then(response => {
        if (response.ok) {
            fetchInventory();
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                role: role
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Registration successful!');

            registerForm.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error during registration!');
        });
    });
});

