document.addEventListener('DOMContentLoaded', loadTableData);

function loadTableData(checker) {
    const storedBooks = localStorage.getItem('book');
    const books = storedBooks ? JSON.parse(storedBooks) : [];
    console.log(books);

    const tableBody = document.querySelector("#bookTable tbody");
    const tableHeader = document.querySelector("#bookTable thead");
   
    if (!tableBody) {
        console.error('Table body element not found.');
        return;
    }

    tableBody.innerHTML = ''; // Clear the table body

    if (books.length === 0) {
        alert('No Book Available For Borrow!!');
        if (tableHeader) {
            tableHeader.style.display = 'none';
        }
        tableBody.innerHTML = '<tr><td colspan="7" style="color: white; text-align: center;">Library is closed!</td></tr>';
    } else {
        const titleFilter = document.getElementById('titlefilter') ? document.getElementById('titlefilter').value : '';
        const genreFilter = document.getElementById('genrefilter') ? document.getElementById('genrefilter').value : '';
document.getElementById('titlefilter').value= '';
document.getElementById('genrefilter').value= '';

        books.forEach((book, index) => {
            let shouldDisplay = false;

            if (checker === "title") {
                shouldDisplay = titleFilter && titleFilter.toLowerCase().includes(book.Title.toLowerCase());
                
                
            } else if (checker === "genre") {
                shouldDisplay = genreFilter && genreFilter.toLowerCase().includes(book.Genre.toLowerCase());
               
            } else if (checker === "reset") {
                shouldDisplay = true;
            } else {
                shouldDisplay = true;
            }

            if (shouldDisplay && book.Available === "yes") {
                const row = document.createElement('tr');

                const numbercell = document.createElement('td');
                numbercell.textContent = index + 1;
                numbercell.style.verticalAlign = "middle";
                row.appendChild(numbercell);

                const titleCell = document.createElement('td');
                titleCell.textContent = book.Title;
                row.appendChild(titleCell);

                
 const genreCell = document.createElement('td');
                genreCell.textContent = book.Genre;
                row.appendChild(genreCell);
                /*const yearCell = document.createElement('td');
                yearCell.textContent = book.Year;
                row.appendChild(yearCell);
const authorCell = document.createElement('td');
                authorCell.textContent = book.Author;
                row.appendChild(authorCell);
               */

                const buttonCell = document.createElement('td');
                buttonCell.style.width = "20px";

                const borrowButton = document.createElement('button');
                borrowButton.textContent = "Borrow";
                borrowButton.style.border = "none";

                borrowButton.style.backgroundColor = "Green";
                borrowButton.style.fontWeight = "light";
                borrowButton.style.fontSize = "17px";
                borrowButton.style.borderRadius = "8px";
                
                borrowButton.style.padding = "3px";
                borrowButton.style.marginBottom = "4px";
                borrowButton.style.cursor = "pointer";
                borrowButton.style.transition = "background-color 0.3s ease, transform 0.3s ease";

                borrowButton.addEventListener('mouseover', () => {
                    borrowButton.style.backgroundColor = "darkgreen";
                    borrowButton.style.transform = "scale(1.05)";
                });

                borrowButton.addEventListener('mouseout', () => {
                    borrowButton.style.backgroundColor = "Green";
                    borrowButton.style.transform = "scale(1)";
                });

                borrowButton.addEventListener('click', () => {
                    if (borrowButton.textContent === "Borrow") {
                        borrowButton.textContent = "Borrowed";
                        borrowButton.style.backgroundColor = "Gray";
                        alert(`${book.Title} borrowed successfully`);

                        book.Available = "no";
                        localStorage.setItem('book', JSON.stringify(books));

                        const returnStorage = {
                            Bookid: book.id,
                            Booktitle: book.Title,
                            Bookgenre:book.Genre
                        };

                        let returnbook = JSON.parse(localStorage.getItem('returnbook')) || [];
                        returnbook.push(returnStorage);
                        localStorage.setItem('returnbook', JSON.stringify(returnbook));
                    }
                });

                buttonCell.appendChild(borrowButton);
                row.appendChild(buttonCell);
                tableBody.appendChild(row); 
              
 
            }
        });

        if (tableBody.children.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" style="color: white; text-align: center;">No books match</td></tr>';
        }
    }
}
