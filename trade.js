document.addEventListener('DOMContentLoaded', function() {
    fetchTopStockMarketBooks();
});

function fetchTopStockMarketBooks() {
    fetch('https://www.googleapis.com/books/v1/volumes?q=stock+market&maxResults=15&orderBy=relevance')
    .then(response => response.json())
    .then(data => {
        const booksWithAmazonUrl = data.items.filter(book => hasAmazonUrl(book.volumeInfo.industryIdentifiers));
        displayBooks(booksWithAmazonUrl);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function displayBooks(books) {
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = ''; // Clear previous results

    books.forEach(book => {
        const title = book.volumeInfo.title;
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown';
        const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
        const description = book.volumeInfo.description ? book.volumeInfo.description : 'No description available';
        const amazonUrl = constructAmazonUrl(book.volumeInfo.industryIdentifiers);
        const bookElement = `
            <div>
                <h2>${title}</h2>
                <p>Author(s): ${authors}</p>
                <img src="${thumbnail}" alt="${title} thumbnail">
                <p>Description: ${description}</p>
                <p><a href="${amazonUrl}" target="_blank">Amazon Link</a></p>
            </div>
        `;
        booksList.innerHTML += bookElement;
    });
}

function constructAmazonUrl(industryIdentifiers) {
    if (!industryIdentifiers) return '';
    const isbn = industryIdentifiers.find(identifier => identifier.type === 'ISBN_13' || identifier.type === 'ISBN_10');
    if (!isbn) return '';
    return `https://www.amazon.com/s?k=${isbn.identifier}`;
}

function hasAmazonUrl(industryIdentifiers) {
    return industryIdentifiers && industryIdentifiers.some(identifier => identifier.type === 'ISBN_13' || identifier.type === 'ISBN_10');
}
