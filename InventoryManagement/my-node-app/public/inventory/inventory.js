document.addEventListener('DOMContentLoaded', function() {
    // References to tab links
    const allTab = document.querySelectorAll('.tab-link')[0];
    const statusTab = document.querySelectorAll('.tab-link')[1];
  
    // Event listeners for tabs
    allTab.addEventListener('click', showAll);
    statusTab.addEventListener('click', showStatus);
  
    function showAll(event) {
      event.preventDefault();
      // Clear existing rows
      let tbody = document.querySelector('.table tbody');
      tbody.innerHTML = '';
  
      // Define the original rows data
      const allData = [
        // Add your original data here
        { id: '1', product: 'Milk (1L)', items: '25', price: '$4.00' },
        // ... other products
      ];
  
      // Change table headers for "All" view
      document.querySelector('.table thead').innerHTML = `
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Product</th>
          <th scope="col">Items</th>
          <th scope="col">Price/Unit</th>
        </tr>
      `;
  
      // Add rows to the table for each item
      allData.forEach(function(item) {
        let row = tbody.insertRow();
        let id = row.insertCell(0);
        let product = row.insertCell(1);
        let items = row.insertCell(2);
        let price = row.insertCell(3);
  
        id.innerHTML = item.id;
        product.innerHTML = item.product;
        items.innerHTML = item.items;
        price.innerHTML = item.price;
      });
      
      // Update the tabs' appearance
      allTab.classList.add('active');
      statusTab.classList.remove('active');
    }
  
    function showStatus(event) {
      event.preventDefault();
      // Clear existing rows
      let tbody = document.querySelector('.table tbody');
      tbody.innerHTML = '';
  
      // Define the new rows data based on the second image
      const statusData = [
        { id: '1', product: 'Milk (1L)', items: '25', status: 'Valid', daysLeft: '10' },
        { id: '2', product: 'Flour (1KG)', items: '66', status: 'Near Expiry', daysLeft: '3' },
        { id: '3', product: 'Sugar (1KG)', items: '3', status: 'Valid', daysLeft: '12' },
        { id: '4', product: 'Egg', items: '120', status: 'Near Expiry', daysLeft: '1' },
        { id: '5', product: 'Butter', items: '15', status: 'Near Expiry', daysLeft: '2' },
      ];
  
      // Change table headers for "Status" view
      document.querySelector('.table thead').innerHTML = `
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Product</th>
          <th scope="col">Items</th>
          <th scope="col">Status</th>
          <th scope="col">Days Left</th>
        </tr>
      `;
  
      // Add rows to the table for each item
      statusData.forEach(function(item) {
        let row = tbody.insertRow();
        let id = row.insertCell(0);
        let product = row.insertCell(1);
        let items = row.insertCell(2);
        let status = row.insertCell(3);
        let daysLeft = row.insertCell(4);
  
        id.innerHTML = item.id;
        product.innerHTML = item.product;
        items.innerHTML = item.items;
        status.innerHTML = item.status;
        daysLeft.innerHTML = item.daysLeft;
      });
      
      // Update the tabs' appearance
      statusTab.classList.add('active');
      allTab.classList.remove('active');
    }
  });
  