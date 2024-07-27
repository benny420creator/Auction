document.addEventListener('DOMContentLoaded', () => {
    const bidForm = document.getElementById('bid-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const bidAmountInput = document.getElementById('bid-amount');
    const currentBidElement = document.getElementById('current-bid');
    const bidHistoryElement = document.getElementById('bid-history');
    
    // Update the year in the footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    let currentBid = 0;
    let bidHistory = [];
    
    bidForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = nameInput.value;
        const email = emailInput.value;
        const newBid = parseFloat(bidAmountInput.value);
        
        if (newBid > currentBid) {
            currentBid = newBid;
            bidHistory.push({ name, email, amount: newBid });
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
});
