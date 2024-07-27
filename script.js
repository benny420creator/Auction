document.addEventListener("DOMContentLoaded", function() {
    const bidForm = document.getElementById('bidForm');
    const bidsList = document.getElementById('bidsList');
    const timeLeft = document.getElementById('timeLeft');

    let endTime = new Date();
    endTime.setDate(endTime.getDate() + 7);

    function updateTimer() {
        let now = new Date();
        let timeDiff = endTime - now;

        if (timeDiff <= 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = "Auction ended";
            return;
        }

        let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        timeLeft.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    let timerInterval = setInterval(updateTimer, 1000);

    bidForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let name = document.getElementById('name').value;
        let bid = document.getElementById('bid').value;
        let email = document.getElementById('email').value;

        let li = document.createElement('li');
        li.textContent = `${name} - $${bid}`;
        bidsList.appendChild(li);

        bidForm.reset();
    });
});