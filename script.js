document.addEventListener("DOMContentLoaded", function() {
    const bidForm = document.getElementById('bidForm');
    const bidsList = document.getElementById('bidsList');
    const timeLeft = document.getElementById('timeLeft');
    const adminButton = document.getElementById('adminButton');
    const adminSection = document.getElementById('adminSection');
    const adminPassword = document.getElementById('adminPassword');
    const adminSubmit = document.getElementById('adminSubmit');
    const emailList = document.getElementById('emailList');
    
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

        let emailEntry = document.createElement('li');
        emailEntry.textContent = `${name}: ${email}`;
        emailList.appendChild(emailEntry);

        bidForm.reset();
    });

    adminButton.addEventListener('click', function() {
        adminSection.classList.toggle('hidden');
    });

    adminSubmit.addEventListener('click', function() {
        if (adminPassword.value === 'adminPassword') {
            emailList.classList.toggle('hidden');
        } else {
            alert('Incorrect password');
        }
    });
});
