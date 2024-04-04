const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quotesArray = [];

// Loading Spinner Shown
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from quotesArray
  const quote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
  // Set Quote, Hide Loader
  quoteText.innerText = quote.quoteText;
  authorText.innerText = quote.quoteAuthor || 'Unknown';
  complete();
}

// Load Quotes
async function loadQuotes() {
  loading();
  try {
    const response = await fetch('quotes.json');
    quotesArray = await response.json();
    newQuote();
  } catch (error) {
    // Handle the error here
    console.log('Whoops, no quotes', error);
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
loadQuotes();
