document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq() {

    const userInput = document.querySelector("#userInput").value;
    const res = await fetch(`/api?student=${userInput}`)
    const data = await res.json()

    console.log(data);
    document.querySelector("#loserName").textContent = `Your choice: ${data.Your_Choice}`
    document.querySelector("#winnerName").textContent = `Computer choice: ${data.CPU_Choice}`
    document.querySelector("#result").textContent = `${data.result}`
}