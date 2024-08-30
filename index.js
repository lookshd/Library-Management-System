document.addEventListener('DOMContentLoaded', loadTableData);

function loadTableData() {
     const tableBody = document.querySelector("#bookTable tbody");
     const tableheader=document.querySelector("#bookTable thead");
     const filterSection = document.querySelector(".filter");
     const storedBooks = localStorage.getItem('book');
    const books = storedBooks ? JSON.parse(storedBooks) : [];
    const latestBooksContainer = document.querySelector('.latest-books');
  latestBooksContainer.innerHTML = '';
  console.log(storedBooks);
    if(books.length===0)
    {    alert('Library Closed !!');
        tableheader.style.display = 'none'; 
       
        tableBody.innerHTML = '<tr><td colspan="7" style="color: white; text-align: center;">Books Not Available!</td></tr>';  // Display the message with custom styling
        
    }else {

    
 

    tableBody.innerHTML = '';


    
    
   
    books.forEach((book, index) => {
       
          
            const row = document.createElement('tr');

            const numbercell = document.createElement('td');
            numbercell.textContent = index + 1;
            numbercell.style.verticalAlign = "middle";
            row.appendChild(numbercell);

            const titleCell = document.createElement('td');
            titleCell.textContent = book.Title;
            row.appendChild(titleCell);

            const authorCell = document.createElement('td');
            authorCell.textContent = book.Author;
            row.appendChild(authorCell);

            const yearCell = document.createElement('td');
            yearCell.textContent = book.Year;
            row.appendChild(yearCell);
  const genreCell = document.createElement('td');
            genreCell.textContent = book.Genre;
            row.appendChild(genreCell);
            const availableCell = document.createElement('td');
            availableCell.textContent = book.Available;
            row.appendChild(availableCell);

          

           
       
            
            tableBody.appendChild(row);
            if(index<=5)
            {
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';
                bookCard.innerHTML = `
                
                  <div class="book-info" >
                    <h1 class="book-title">Title: ${book.Title}</h1>
                     <h1 class="book-title">Author: ${book.Author}</h1>
                  
                  </div>
                `;
                latestBooksContainer.appendChild(bookCard);
            
            }
        }
    )};
}
