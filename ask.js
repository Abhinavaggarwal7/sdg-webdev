document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedGenre = document.querySelector('input[name="genre"]:checked').value;
    const selectedLength = document.querySelector('input[name="length"]:checked').value;
    const selectedEra = document.querySelector('input[name="era"]:checked').value;
    const selectedSeries = document.querySelector('input[name="series"]:checked').value;
    const selectedSetting = document.querySelector('input[name="setting"]:checked').value;

    let bookSuggestion = "";

    if (selectedGenre === "fiction" && selectedLength === "short" && selectedEra === "classic" && selectedSeries === "standalone" && selectedSetting === "urban") {
        bookSuggestion = "The Great Gatsby by F. Scott Fitzgerald";
    } else if (selectedGenre === "fiction" && selectedLength === "medium" && selectedEra === "classic" && selectedSeries === "standalone" && selectedSetting === "rural") {
        bookSuggestion = "Pride and Prejudice by Jane Austen";
    } else if (selectedGenre === "fiction" && selectedLength === "long" && selectedEra === "classic" && selectedSeries === "series" && selectedSetting === "fantasy") {
        bookSuggestion = "The Lord of the Rings by J.R.R. Tolkien";
    } else if (selectedGenre === "fiction" && selectedLength === "short" && selectedEra === "contemporary" && selectedSeries === "standalone" && selectedSetting === "urban") {
        bookSuggestion = "The Catcher in the Rye by J.D. Salinger";
    } else if (selectedGenre === "fiction" && selectedLength === "medium" && selectedEra === "contemporary" && selectedSeries === "series" && selectedSetting === "rural") {
        bookSuggestion = "Harry Potter series by J.K. Rowling";
    } else if (selectedGenre === "fiction" && selectedLength === "long" && selectedEra === "contemporary" && selectedSeries === "series" && selectedSetting === "fantasy") {
        bookSuggestion = "A Song of Ice and Fire series by George R.R. Martin";
    } else if (selectedGenre === "non-fiction" && selectedLength === "short" && selectedSeries === "standalone" && selectedSetting === "urban") {
        bookSuggestion = "The Elements of Style by Strunk & White";
    } else if (selectedGenre === "non-fiction" && selectedLength === "medium" && selectedSeries === "series" && selectedSetting === "rural") {
        bookSuggestion = "Sapiens: A Brief History of Humankind by Yuval Noah Harari";
    } else if (selectedGenre === "non-fiction" && selectedLength === "long" && selectedSeries === "series" && selectedSetting === "fantasy") {
        bookSuggestion = "The Chronicles of Narnia by C.S. Lewis";
    }

    document.getElementById('bookSuggestion').innerHTML = `We suggest: ${bookSuggestion}`;
});
