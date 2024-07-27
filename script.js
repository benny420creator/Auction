document.addEventListener('DOMContentLoaded', function() {
    const bidForm = document.getElementById('bid-form');
    const highestBidElement = document.getElementById('highest-bid');
    const highestBidderElement = document.getElementById('highest-bidder');
    const adminButton = document.getElementById('admin-button');
    const adminContent = document.getElementById('admin-content');
    const showEmailsButton = document.getElementById('show-emails');
    const emailList = document.getElementById('email-list');
    const adminPasswordInput = document.getElementById('admin-password');

    let highestBid = 0;
    let highestBidder = '';
    let emails = [];

    bidForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const bid = parseFloat(document.getElementById('bid').value);
        const email = document.getElementById('email').value;

        if (bid > highestBid) {
            highestBid = bid;
            highestBidder = name;
            highestBidElement.textContent = `Highest Bid: $${highestBid}`;
            highestBidderElement.textContent = `Highest Bidder: ${highestBidder}`;
            emails.push(email);
            bidForm.reset();
        }
    });

    adminButton.addEventListener('click', function() {
        adminContent.style.display = adminContent.style.display === 'none' ? 'block' : 'none';
    });

    showEmailsButton.addEventListener('click', function() {
        if (adminPasswordInput.value === 'admin123') {
            emailList.innerHTML = '';
            emails.forEach(email => {
                const li = document.createElement('li');
                li.textContent = email;
                emailList.appendChild(li);
            });
        } else {
            alert('Incorrect password!');
        }
    });

    // Timer
    const endTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime();
    const timerElement = document.getElementById('timer');

    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.textContent = `Time remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(timerInterval);
            timerElement.textContent = 'Auction ended';
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
});
