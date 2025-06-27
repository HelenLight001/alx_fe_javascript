// Array to hold quote objects
let quotes = [
  {text: "Stay hungry, stay foolish.", category: "Inspiration"},
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
  {
    text: "Be yourself; everyone else is already taken.",
    category: "Motivation",
  },
];

// Function to display a random quote
function displayRandomQuote() {
  // Select a random index
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Select the quote display div
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Clear previous content
  quoteDisplay.innerHTML = "";

  // Create new elements for the quote text and category
  const quoteText = document.createElement("p");
  quoteText.textContent = `"${randomQuote.text}"`;

  const quoteCategory = document.createElement("small");
  quoteCategory.textContent = `Category: ${randomQuote.category}`;

  // Append to display div
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Function to add a new quote
function addQuote() {
  // Get input values
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  // Validate inputs
  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Create new quote object and add it to the array
  const newQuote = {text: newQuoteText, category: newQuoteCategory};
  quotes.push(newQuote);

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Update DOM to display the newly added quote immediately
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  const quoteText = document.createElement("p");
  quoteText.textContent = `"${newQuote.text}"`;

  const quoteCategory = document.createElement("small");
  quoteCategory.textContent = `Category: ${newQuote.category}`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Attach event listener to "Show New Quote" button
document
  .getElementById("newQuote")
  .addEventListener("click", displayRandomQuote);
