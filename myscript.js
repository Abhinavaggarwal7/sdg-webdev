document.getElementById("bookForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const genre = document.getElementById("genre").value;
    let url, options;
    if (genre === "fantasy" || genre === "fiction" || genre === "Classics" || genre === "Literary Fiction" || genre === "Historical" || genre === "Literature" || genre === "Historical Fiction" || genre === "Victorian" || genre === "19th century") {
        url = `https://books-api7.p.rapidapi.com/books/find/genres?genres%5B%5D=${genre}`;
        options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'dbf138eb9emsh916ae9139d49b7dp1391d7jsnae9be9422ab6',
                'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            displayBooks(result);
        } catch (error) {
            console.error(error);
        }
    } else {
        alert("Invalid genre selected");
    }
});
async function displayBooks(books) {
    const bookSuggestion = document.getElementById("bookSuggestion");
    if (books.length === 0) {
        bookSuggestion.innerHTML = "<p>No books found for this genre.</p>";
    } else {
        bookSuggestion.innerHTML = ""; // Clear existing content

        for (let book of books) {
            const [bookInfo, ratingInfo] = await Promise.all([fetchBookInfo(book.title), fetchBookRating()]);
            if (bookInfo && ratingInfo) {
                const bookContainer = document.createElement("div");
                bookContainer.classList.add("book-container");

                html = `<div><h3 style="color: black; text-decoration: underline; margin-bottom: 10px;">${bookInfo.title} - <span style="color: maroon;">${bookInfo.authors.join(', ')}</span></h3><img src="${bookInfo.image}" alt="${bookInfo.title}" style="max-width: 200px;"><div style="margin-top: 10px;"><u>Description:</u> ${bookInfo.description}</div><div style="margin-top: 10px;"><u>Rating:</u> ${ratingInfo.rating}</div><div style="margin-top: 10px;"><u>Plot:</u> ${ratingInfo.plot}</div><div style="margin-top: 10px;"><u>Number of Pages:</u> ${bookInfo.pages}</div><div style="max-width: 400px; overflow-wrap: break-word; margin-top: 10px;"><u>URL:</u> <a href="${ratingInfo.url}" target="_blank">${ratingInfo.url}</a></div></div>`;



                bookContainer.innerHTML = html;

                bookSuggestion.appendChild(bookContainer);
            } else {
                bookSuggestion.innerHTML += `<p>${book.title} - ${book.author}<br>No additional info available</p>`;
            }
        }
    }
}



async function fetchBookInfo(title) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            const book = data.items[0].volumeInfo;
            return {
                title: book.title,
                authors: book.authors ? book.authors : ["Unknown"],
                description: book.description ? book.description : "No description available",
                image: book.imageLinks ? book.imageLinks.thumbnail : 'No image available',
                pages: book.pageCount ? book.pageCount : "Unknown"
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching book info:", error);
        return null;
    }
}

async function fetchBookRating() {
    const url = 'https://books-api7.p.rapidapi.com/books/get/random/';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dbf138eb9emsh916ae9139d49b7dp1391d7jsnae9be9422ab6',
            'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return {
            rating: result.rating,
            plot: result.plot,
            url: result.url
        };
    } catch (error) {
        console.error("Error fetching book rating:", error);
        return null;
    }
}
