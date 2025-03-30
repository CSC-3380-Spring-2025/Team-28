const form = document.getElementById('financeForm')

form.addEventListener('submit', addtotable);

function addtotable(event) {
    event.preventDefault();

    const item = document.getElementById('item').value;
    const amount = parseInt(document.getElementById('amount').value, 10);
    const price = parseFloat(document.getElementById('price').value);


    const tableBody = document.querySelector('table tbody');
    const row = document.createElement('tr');

    const cellItem = document.createElement('td');
    cellItem.textContent = item;
    row.appendChild(cellItem);

    const cellAmount = document.createElement('td');
    cellAmount.textContent = amount;
    row.appendChild(cellAmount);

    const cellPrice = document.createElement('td');
    cellPrice.textContent = price;
    row.appendChild(cellPrice);

    tableBody.appendChild(row);

    updateTotalPrice();

    document.getElementById('item').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('price').value = '';

    

}
    function updateTotalPrice() {
        const rows = document.querySelectorAll('table tbody tr');
        let total = 0;
    
        rows.forEach(row => {
            const amount = parseInt(row.children[1].textContent, 10);
            const price = parseFloat(row.children[2].textContent);

            if (isNaN(amount) || isNaN(price)) {
                console.error('Invalid value in row:', row);
                return; 
            }

            total += amount * price;
        });
    
        
        document.getElementById('totalPrice').textContent = total.toFixed(2);
}
