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

  // Create new quote object and add to array
  const newQuote = {text: newQuoteText, category: newQuoteCategory};
  quotes.push(newQuote);

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Create DOM elements to display the newly added quote
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = ""; // Clear previous

  const quoteText = document.createElement("p");
  quoteText.textContent = `"${newQuote.text}"`;

  const quoteCategory = document.createElement("small");
  quoteCategory.textContent = `Category: ${newQuote.category}`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}
