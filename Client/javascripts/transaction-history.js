const tableBody = document.querySelector("tbody");
const searchInput = document.querySelector(".input-field");
const searchBtn = document.querySelector(".button-primary");

// Function to fetch transactions from backend
async function loadTransactions(query = "") {
  try {
    let url = "http://localhost:5000/transactions"; 

    if (query.trim() !== "") {
      url += `?search=${encodeURIComponent(query)}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch transactions");

    const transactions = await res.json();

    // Clear table
    tableBody.innerHTML = "";

    if (transactions.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center">No transactions found</td></tr>`;
      return;
    }

    // Populate table
    transactions.forEach((tx) => {
      const tr = document.createElement("tr");

      // Payment status class
      let statusClass = "";
      if (tx.paymentStatus === "Paid") statusClass = "paid";
      else if (tx.paymentStatus === "Pending") statusClass = "pending";
      else if (tx.paymentStatus === "Canceled") statusClass = "canceled";

      tr.innerHTML = `
          <td>#${tx.transactionId}</td>
          <td>${tx.totalItems}</td>
          <td>${tx.date}</td>
          <td>${tx.customer}</td>
          <td>$${tx.totalPrice}</td>
          <td class="status ${statusClass}"><span>${tx.paymentStatus}</span></td>
        `;

      tableBody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:red">Error loading transactions</td></tr>`;
  }
}

// Load all transactions on page load
loadTransactions();

// Search button click
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  loadTransactions(query);
});

// Optional: search on typing (debounced)
let debounceTimeout;
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    loadTransactions(searchInput.value.trim());
  }, 500); // wait 500ms after typing stops
});
