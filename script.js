document.addEventListener("DOMContentLoaded", function () {
    const startInput = document.getElementById("start");
    const endInput = document.getElementById("end");
    const calculateButton = document.getElementById("calculate");
    const primeList = document.getElementById("prime-list");
    const detailsButton = document.getElementById("details");
    const detailsTable = document.getElementById("number-details");
  
    calculateButton.addEventListener("click", function () {
      const start = parseInt(startInput.value);
      const end = parseInt(endInput.value);
  
      if (isNaN(start) || isNaN(end)) {
        alert("Please enter valid start and end values.");
        return;
      }
  
      const { primes, metrics } = getPrimesInRange(start, end);
  
      primeList.textContent = primes.join(", ");
  
      // Calculate and display metrics
      const metricsOutput = document.getElementById("metrics");
      metricsOutput.innerHTML = `
        <p>Time taken to run getPrimesInRange: ${metrics.totalTime.toFixed(2)} ms</p>
        <p>Average time taken to determine if a number is prime: ${metrics.averageTime.toFixed(2)} ms</p>
      `;
  
      // Display details for each checked number
      detailsTable.innerHTML = `
        <tr>
          <th>Number</th>
          <th>Time to Check Prime (ms)</th>
        </tr>
        ${metrics.details
          .map(
            (detail, index) =>
              `<tr>
              <td>${start + index}</td>
              <td>${detail.toFixed(2)}</td>
            </tr>`
          )
          .join("")}
      `;
    });
  
    detailsButton.addEventListener("click", function () {
      const modal = document.getElementById("details-modal");
      modal.style.display = "block";
    });
  
    function getPrimesInRange(start, end) {
      const startTime = performance.now();
      const metrics = { details: [] };
  
      if (start < 2) {
        start = 2;
      }
  
      const primes = [];
  
      for (let number = start; number <= end; number++) {
        const isPrimeStart = performance.now();
        if (isPrime(number)) {
          primes.push(number);
        }
        const isPrimeEnd = performance.now();
        metrics.details.push(isPrimeEnd - isPrimeStart);
      }
  
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const averageTime = metrics.details.reduce((sum, time) => sum + time, 0) / metrics.details.length;
  
      return { primes, metrics: { totalTime, averageTime, details: metrics.details } };
    }
  
    function isPrime(number) {
      if (number <= 1) {
        return false;
      }
      if (number <= 3) {
        return true;
      }
      if (number % 2 === 0 || number % 3 === 0) {
        return false;
      }
  
      for (let i = 5; i * i <= number; i += 6) {
        if (number % i === 0 || number % (i + 2) === 0) {
          return false;
        }
      }
  
      return true;
    }
  });
  