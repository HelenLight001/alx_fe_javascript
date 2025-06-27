let quotes = [];

let simulatedServerQuotes = [
  {
    id: 1,
    text: "The server quote about wisdom.",
    category: "Wisdom",
    updatedAt: Date.now(),
  },
];

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        category: "Inspiration",
      },
      {
        text: "JavaScript is the language of the web.",
        category: "Programming",
      },
      {
        text: "Simplicity is the soul of efficiency.",
        category: "Productivity",
      },
    ];
    saveQuotes();
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function getUniqueCategories() {
  const categories = quotes.map((q) => q.category);
  return [...new Set(categories)];
}

function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const savedCategory = localStorage.getItem("selectedCategory");

  // Clear old options
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  getUniqueCategories().forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuotes();
  }
}

function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerText = "No quotes in this category.";
  } else {
    const ul = document.createElement("ul");
    filteredQuotes.forEach((q) => {
      const li = document.createElement("li");
      li.textContent = `"${q.text}" — ${q.category}`;
      ul.appendChild(li);
    });
    quoteDisplay.appendChild(ul);
  }
}

function showRandomQuote() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const availableQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);

  if (availableQuotes.length === 0) {
    alert("No quotes available in this category.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableQuotes.length);
  const quote = availableQuotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerText = `"${quote.text}" — ${quote.category}`;
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  if (!quoteText || !quoteCategory) {
    alert("Please enter both quote text and category.");
    return;
  }

  const newQuote = {
    id: Date.now(),
    text: quoteText,
    category: quoteCategory,
    updatedAt: Date.now(),
  };

  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  filterQuotes();
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  alert("Quote added successfully!");
}

function createAddQuoteForm() {
  const formContainer = document.getElementById("quoteFormContainer");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.innerText = "Add Quote";
  addButton.onclick = addQuote;

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], {type: "application/json"});
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (!Array.isArray(importedQuotes))
        throw new Error("Invalid JSON format");

      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      filterQuotes();
      alert("Quotes imported successfully!");
    } catch (e) {
      alert("Error importing quotes: " + e.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

function syncWithServer() {
  // Simulate fetching from server
  const serverData = simulatedServerQuotes;

  let updated = false;

  serverData.forEach((serverQuote) => {
    const localQuote = quotes.find((q) => q.id === serverQuote.id);

    if (!localQuote) {
      quotes.push(serverQuote);
      updated = true;
    } else if (serverQuote.updatedAt > localQuote.updatedAt) {
      Object.assign(localQuote, serverQuote); // server wins
      updated = true;
    }
  });

  if (updated) {
    saveQuotes();
    filterQuotes();
    showSyncNotification("Quotes synced with server. Updates applied.");
  }
}

function showSyncNotification(message) {
  let notif = document.getElementById("syncNotification");
  if (!notif) {
    notif = document.createElement("div");
    notif.id = "syncNotification";
    notif.style.position = "fixed";
    notif.style.bottom = "10px";
    notif.style.right = "10px";
    notif.style.padding = "10px";
    notif.style.backgroundColor = "#ffeb3b";
    notif.style.border = "1px solid #999";
    document.body.appendChild(notif);
  }
  notif.textContent = message;
  setTimeout(() => (notif.style.display = "none"), 5000);
  notif.style.display = "block";
}
setInterval(syncWithServer, 10000); // Sync every 10 seconds

function pushToServer(quote) {
  const index = simulatedServerQuotes.findIndex((q) => q.id === quote.id);
  if (index > -1) {
    simulatedServerQuotes[index] = quote;
  } else {
    simulatedServerQuotes.push(quote);
  }
}
fetch("https://your-api.com/quotes")
  .then((res) => res.json())
  .then((serverData) => {
    /* merge logic */
  });

// Simulated Server URL using JSONPlaceholder or mock JSON file (you can replace this with your own server)
const serverURL = "https://jsonplaceholder.typicode.com/posts"; // Replace with your real or mock API

// Simulate fetching quotes from the server every 30 seconds
setInterval(fetchQuotesFromServer, 30000);

// Sync Notification UI
function showSyncNotification(message) {
  let notification = document.getElementById("syncNotification");
  if (!notification) {
    notification = document.createElement("div");
    notification.id = "syncNotification";
    document.body.appendChild(notification);
  }
  notification.innerText = message;
  notification.style.display = "block";
  setTimeout(() => (notification.style.display = "none"), 5000);
}

// Fetch and Sync Quotes from the "server"
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // Replace with your actual endpoint
    const data = await response.json();

    // Simulate quote structure
    const serverQuotes = data.slice(0, 5).map((post) => ({
      text: post.title,
      category: "Server",
    }));

    // Conflict resolution: server wins
    localStorage.setItem("quotes", JSON.stringify(serverQuotes));
    alert("Quotes synced with server!");
    quotes = serverQuotes;
    displayRandomQuote();
    populateCategories();
  } catch (error) {
    console.error("Failed to fetch from server:", error);
  }
}

function clearLocalStorage() {
  localStorage.clear();
  alert("Local storage cleared!");
  location.reload(); // Refresh page to reset the app
}

async function postQuoteToServer(quote) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quote),
    });

    const data = await response.json();
    console.log("Quote posted to server:", data);
    alert("Quote successfully posted to server (mock)");
  } catch (error) {
    console.error("Error posting to server:", error);
  }
}

postQuoteToServer(newQuote);

async function syncQuotes() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverQuotes = await response.json();

    // Simulate syncing by replacing or merging quotes
    // Here, we treat the server quotes as the source of truth (overwrite local)
    localStorage.setItem("quotes", JSON.stringify(serverQuotes));

    console.log("Quotes synced from server");
    alert("Quotes successfully synced with server (mock)");
  } catch (error) {
    console.error("Error syncing quotes:", error);
  }
}

setInterval(syncQuotes, 30000); // Sync every 30 seconds

window.onload = () => {
  loadQuotes(); // your existing load logic
  syncQuotes(); // sync from mock server
  populateCategories(); // update UI
};

// On load
loadQuotes();
createAddQuoteForm();
populateCategories();
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
