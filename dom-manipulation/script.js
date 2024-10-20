let quotes = [
  {
    text: "Life is like a box of chocolates. You never know what you're gonna get.",
    category: "Life",
  },
  {
    text: "Believe you can and you're halfway there.",
    category: "Self-belief",
  },
  {
    text: "The greatest accomplishment is not in never failing, but in rising up every time we fall.",
    category: "Success",
  },
  {
    text: "You miss 100% of the shots you don't take.",
    category: "Motivation",
  },
];



function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  let number = quotes.length;
  let randomIndex = Math.floor(Math.random() * number);

  let quotesDisplay = document.getElementById("quoteDisplay");
  let textContent = quotes[randomIndex];
  quotesDisplay.innerHTML = textContent.text + "<br/>" + textContent.category;

  sessionStorage.setItem("lastQuote", JSON.stringify(textContent));
}

let newQuoteBtn = document.getElementById("newQuote");
newQuoteBtn.addEventListener("click", showRandomQuote);

function createAddQuoteForm() {
  let newQuoteText = document.getElementById("newQuoteText").value;
  let newQuoteCategory = document.getElementById("newQuoteCategory").value;

  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  saveQuotes(); // Save new quote to local storage

  let div = document.createElement("div");
  div.innerHTML = newQuoteText + "<br/>" + newQuoteCategory;
  let quotesDisplay = document.getElementById("quoteDisplay");
  quotesDisplay.appendChild(div); // Append new quote to the display
}

function loadLastQuote() {
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    document.getElementById("quoteDisplay").innerHTML = quote.text + "<br/>" + quote.category;
  }
}

function exportQuotesToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  downloadLink.click();
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes); // Add new quotes to the array
    saveQuotes(); // Save the updated array to local storage
    showRandomQuote(); // Optionally display a random quote
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

window.onload = function() {
  loadQuotes();
  loadLastQuote();
  };

// function populateCategories(){
//   let categoryFilter = document.getElementById('categoryFilter');
//   let uniqueCategories = quotes
  
// }

function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

  // Clear existing options
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // Populate with unique categories
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category from local storage
  const lastCategory = localStorage.getItem("lastCategory");
  if (lastCategory) {
    categoryFilter.value = lastCategory;
    filterQuotes(); // Apply filter if there's a last selected category
  }
}

function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const quotesDisplay = document.getElementById("quoteDisplay");
  
  // Clear current display
  quotesDisplay.innerHTML = '';

  // Save last selected category to local storage
  localStorage.setItem("lastCategory", selectedCategory);

  // Filter quotes based on selected category
  const filteredQuotes = selectedCategory === "all" 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);

  // Display filtered quotes
  filteredQuotes.forEach(quote => {
    const div = document.createElement("div");
    div.innerHTML = quote.text + "<br/>" + quote.category;
    quotesDisplay.appendChild(div);
  });

  // Optionally, show a random quote from the filtered list
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    sessionStorage.setItem("lastQuote", JSON.stringify(filteredQuotes[randomIndex]));
    showRandomQuote(); // Show a random quote from filtered results
  }
}

// Call populateCategories when the window loads
window.onload = function() {
  loadQuotes();
  loadLastQuote();
  populateCategories(); // Populate categories on load
};

function createAddQuoteForm() {
  let newQuoteText = document.getElementById("newQuoteText").value;
  let newQuoteCategory = document.getElementById("newQuoteCategory").value;

  // Add new quote to the quotes array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  saveQuotes(); // Save new quote to local storage

  // Update categories in the dropdown
  updateCategories(newQuoteCategory);

  // Display the new quote
  let div = document.createElement("div");
  div.innerHTML = newQuoteText + "<br/>" + newQuoteCategory;
  let quotesDisplay = document.getElementById("quoteDisplay");
  quotesDisplay.appendChild(div); // Append new quote to the display
}

function updateCategories(newCategory) {
  const categoryFilter = document.getElementById("categoryFilter");
  
  // Check if the category already exists
  const existingCategories = Array.from(categoryFilter.options).map(option => option.value);
  
  if (!existingCategories.includes(newCategory)) {
    const option = document.createElement("option");
    option.value = newCategory;
    option.textContent = newCategory;
    categoryFilter.appendChild(option); // Add the new category to the dropdown
  }
}

// Call populateCategories when the window loads
window.onload = function() {
  loadQuotes();
  loadLastQuote();
  populateCategories(); // Populate categories on load
};



