
console.log(Quotes)

const quotesArray=Quotes;
// Function to get the current date in the format YYYY-MM-DD
function getCurrentDate() {
    const now = new Date(555555555);
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to get a random quote from the quotesArray
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    return quotesArray[randomIndex];
}

// Function to display the quote of the day
function displayQuoteOfTheDay() {
    const currentDate = getCurrentDate();
    const storedQuote = localStorage.getItem(currentDate);
    let quote;

    if (storedQuote) {
        quote = JSON.parse(storedQuote);
        console.log(storedQuote);
    } else {
        // Otherwise, get a new random quote
        quote = getRandomQuote();
        localStorage.clear();
        localStorage.setItem(currentDate, JSON.stringify(quote));
    }

    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');

    quoteTextElement.textContent = `"${quote.quote}"`;
    quoteAuthorElement.textContent = `- ${quote.author}`;
}

// Display the quote of the day when the page loads
displayQuoteOfTheDay();
