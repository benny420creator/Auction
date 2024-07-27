document.addEventListener('DOMContentLoaded', () => {
    const bidForm = document.getElementById('bid-form');
    const bidAmountInput = document.getElementById('bid-amount');
    const currentBidElement = document.getElementById('current-bid');
    const bidHistoryElement = document.getElementById('bid-history');
    
    let currentBid = 0;
    let bidHistory = [];
    
    bidForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newBid = parseFloat(bidAmountInput.value);
        if (newBid > currentBid) {
            currentBid = newBid;
            bidHistory.push(newBid);
            updateBidUI();
        } else {
            alert('Your bid must be higher than the current bid.');
        }
        
        bidAmountInput.value = '';
    });
    
    function updateBidUI() {
        currentBidElement.textContent = `$${currentBid}`;
        bidHistoryElement.innerHTML = bidHistory.map(bid => `<li>$${bid}</li>`).join('');
    }
});
