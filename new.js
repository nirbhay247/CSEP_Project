let queue = [];
let isBusy = false;
let countdownInterval;

function enterQueue() {
    let name = document.getElementById("nameInput").value;
    if (name.trim() === "") {
        alert("Please enter your name.");
        return;
    }
    queue.push(name);
    if (!isBusy) {
        startWashing();
    } else {
        document.getElementById("status").innerText = "You are in the queue";
    }
    updateQueueList();
}

function startWashing() {
    if (queue.length > 0) {
        isBusy = true;
        document.getElementById("status").innerText = "Washing Machine is Busy";

        // Check if there is someone in the queue
        if (queue.length === 1) {
            // If only one person in the queue, prompt them to enter the time
            let timerValue = prompt("Please enter the timer (in minutes) for your washing cycle:");
            if (timerValue === null || timerValue.trim() === "") {
                alert("Please enter a valid timer.");
                return;
            }
            let timer = parseInt(timerValue) * 60000; // converting minutes to milliseconds
            let endTime = Date.now() + timer;

            countdownInterval = setInterval(() => {
                let remainingTime = Math.max(0, endTime - Date.now());
                if (remainingTime === 0) {
                    clearInterval(countdownInterval);
                    queue.shift();
                    if (queue.length > 0) {
                        startWashing();
                    } else {
                        isBusy = false;
                        document.getElementById("status").innerText = "Washing Machine is Available";
                        updateQueueList();
                    }
                } else {
                    let minutes = Math.floor(remainingTime / 60000);
                    let seconds = Math.floor((remainingTime % 60000) / 1000);
                    document.getElementById("status").innerText = `Washing Machine will be available in ${minutes} minutes and ${seconds} seconds`;
                }
            }, 1000);
        } else {
            // If there are more users in the queue, show their name and wait for their turn
            document.getElementById("status").innerText = `You are in the queue. Next user: ${queue[1]}`;
            clearInterval(countdownInterval);
        }
    } else {
        document.getElementById("status").innerText = "You are at the top of the queue";
    }
}

function updateQueueList() {
    let queueList = document.getElementById("queueList");
    queueList.innerHTML = "<h2>Queue:</h2>";
    for (let i = 0; i < queue.length; i++) {
        let listItem = document.createElement("div");
        listItem.textContent = queue[i];
        queueList.appendChild(listItem);
    }
}
