document.addEventListener('DOMContentLoaded', () => {
    const bidForm = document.getElementById('bid-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const bidAmountInput = document.getElementById('bid-amount');
    const currentBidElement = document.getElementById('current-bid');
    const bidHistoryElement = document.getElementById('bid-history');
    const adminButton = document.getElementById('admin-button');
    const adminSection = document.getElementById('admin-section');
    const adminBidHistoryElement = document.getElementById('admin-bid-history');

    // Update the year in the footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    let currentBid = 0;
    let bidHistory = JSON.parse(localStorage.getItem('bidHistory')) || [];

    // Populate bid history on page load
    if (bidHistory.length > 0) {
        currentBid = Math.max(...bidHistory.map(bid => bid.amount));
        updateBidUI();
    }
    
    bidForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = nameInput.value;
        const email = emailInput.value;
        const newBid = parseFloat(bidAmountInput.value);
        
        if (newBid > currentBid) {
            currentBid = newBid;
            bidHistory.push({ name, email, amount: newBid });
            localStorage.setItem('bidHistory', JSON.stringify(bidHistory));
            updateBidUI();
        } else {
            alert('Your bid must be higher than the current bid.');
        }
        
        nameInput.value = '';
        emailInput.value = '';
        bidAmountInput.value = '';
    });
    
    function updateBidUI() {
        currentBidElement.textContent = `$${currentBid}`;
        bidHistoryElement.innerHTML = bidHistory.map(bid => `<li>${bid.name}: $${bid.amount}</li>`).join('');
    }

    adminButton.addEventListener('click', () => {
        adminSection.style.display = adminSection.style.display === 'none' ? 'block' : 'none';
        if (adminSection.style.display === 'block') {
            adminBidHistoryElement.innerHTML = bidHistory.map(bid => `<li>${bid.name} (${bid.email}): $${bid.amount}</li>`).join('');
        }
    });
});
