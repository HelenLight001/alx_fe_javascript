// Step 1: Manage an array of quote objects (with text & category)
const quotes = [
  {
    text: "The best way to predict the future is to create it.",
    category: "Motivation",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
  {
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    category: "Inspiration",
  },
];

// Step 2: Function to display a random quote
function displayRandomQuote() {
  // Select a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Reference the display div
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Update DOM content
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>Category: ${randomQuote.category}</small>
  `;
}

// Step 3: Attach event listener to "Show New Quote" button
document
  .getElementById("newQuote")
  .addEventListener("click", displayRandomQuote);

// Step 4: Function to add a new quote via form input
function addQuote() {
  // Get input values
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  // Validate input
  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please enter both quote text and category.");
    return;
  }

  // Create a new quote object and add to quotes array
  const newQuote = {
    text: newQuoteText,
    category: newQuoteCategory,
  };
  quotes.push(newQuote);

  // Optionally show the newly added quote immediately
  displayRandomQuote();

  // Clear form fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}
