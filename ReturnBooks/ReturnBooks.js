// Call the function to load the table data on page load
document.addEventListener('DOMContentLoaded', loadTableData);

function loadTableData(checker) {
    const tableHeader = document.querySelector("#bookTable thead");
    const storedBooks = localStorage.getItem('book');
    const returnStoredBooks = localStorage.getItem('returnbook');

    const storedBooksArray = storedBooks ? JSON.parse(storedBooks) : [];
    const returnStoredBooksArray = returnStoredBooks ? JSON.parse(returnStoredBooks) : [];

    const returnedBookTitles = returnStoredBooksArray.map(book => book.Booktitle);
    const matchingBooks = storedBooksArray.filter(b => returnedBookTitles.includes(b.Title));

    console.log(matchingBooks);
    const tableBody = document.querySelector("#bookTable tbody");
    if (!tableBody) {
        console.error('Table body element not found.');
        return;
    }

    if (matchingBooks.length === 0) {
        alert('No Borrowed Book !!');
        if (tableHeader) {
            tableHeader.style.display = 'none';
        }
        tableBody.innerHTML = '<tr><td colspan="7" style="color: white; text-align: center;">Library is closed!</td></tr>';  // Display the message with custom styling
    } else {
        const titleFilter = document.getElementById('titlefilter') ? document.getElementById('titlefilter').value : '';
        const genreFilter = document.getElementById('genrefilter') ? document.getElementById('genrefilter').value : '';

        document.getElementById('titlefilter').value= '';
        document.getElementById('genrefilter').value= '';
        tableBody.innerHTML = '';

        matchingBooks.forEach((book, index) => {
            let shouldDisplay = false;
console.log(book);
            if (checker === "title") {
                shouldDisplay = titleFilter && titleFilter.toLowerCase().includes(book.Title.toLowerCase());
               
                    
            } else if (checker === "genre") {
                shouldDisplay = genreFilter && genreFilter.toLowerCase().includes(book.Genre.toLowerCase());
                
            } else if (checker === "reset") {
                shouldDisplay = true;
            } else {
                shouldDisplay = true;
            }
            if (shouldDisplay) {
            const row = document.createElement('tr');

            const numberCell = document.createElement('td');
            numberCell.textContent = index + 1;
            numberCell.style.verticalAlign = "middle";
            row.appendChild(numberCell);

            const titleCell = document.createElement('td');
            titleCell.textContent = book.Title;
            row.appendChild(titleCell);

            

            const genreCell = document.createElement('td');
            genreCell.textContent = book.Genre;
            row.appendChild(genreCell);

            const buttonCell = document.createElement('td');
            buttonCell.style.width = "20px";

            const returnButton = document.createElement('button');
            returnButton.textContent = "Return";

            returnButton.style.border = "none";
            returnButton.style.backgroundColor = "red";
            returnButton.style.fontWeight = "light";
            returnButton.style.fontSize = "17px";
            returnButton.style.borderRadius = "8px";
            returnButton.style.padding = "3px";
            returnButton.style.marginBottom = "4px";
            returnButton.addEventListener('mouseover', () => {
                returnButton.style.backgroundColor = "darkgreen";
                returnButton.style.transform = "scale(1.05)";
                returnButton.style.cursor="pointer";
            });
            returnButton.addEventListener('click', () => {
                if (returnButton.textContent === "Return") {
                    returnButton.textContent = "Returned";
                    returnButton.style.backgroundColor = "green";
                }
                alert(`${book.Title} return successfully`);
                const updatedReturnedBooksArray = returnStoredBooksArray.filter(b => b.Booktitle !== book.Title);
                localStorage.setItem('returnbook', JSON.stringify(updatedReturnedBooksArray));

             
                const updatedBooksArray = storedBooksArray.map(b => {
                    if (b.Title === book.Title) {
                        return { ...b, Available: "Yes" }; }
                    return b;
                });
                localStorage.setItem('book', JSON.stringify(updatedBooksArray));

                loadTableData();
            });

            buttonCell.appendChild(returnButton);
            row.appendChild(buttonCell);
            tableBody.appendChild(row);
           
    }});
    }
}
