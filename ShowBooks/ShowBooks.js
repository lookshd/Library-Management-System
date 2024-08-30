document.addEventListener('DOMContentLoaded', loadTableData);

function loadTableData(checker) {
     const tableBody = document.querySelector("#bookTable tbody");
     const tableheader=document.querySelector("#bookTable thead");
     const filterSection = document.querySelector(".filter");
     const storedBooks = localStorage.getItem('book');
    const books = storedBooks ? JSON.parse(storedBooks) : [];
   
    if(books.length===0)
    {    alert('Library Closed !!');
        tableheader.style.display = 'none'; 
        filterSection.style.display='none';
        tableBody.innerHTML = '<tr><td colspan="7" style="color: white; text-align: center;">Library is closed!</td></tr>';  // Display the message with custom styling
        
    }else {

    
 

    tableBody.innerHTML = '';


    const titleFilter = document.getElementById('titlefilter') 
    ? document.getElementById('titlefilter').value
     : '';
    const genreFilter = document.getElementById('genrefilter')
     ? document.getElementById('genrefilter').value
      : '';
    
   
    books.forEach((book, index) => {
        let shouldDisplay = false;

       
        if (checker === "title") {
            shouldDisplay = titleFilter && titleFilter.toLowerCase().includes(book.Title.toLowerCase());
        
        document.getElementById('titlefilter').value='';

            
        } else if (checker === "genre") {
            shouldDisplay = genreFilter && genreFilter.toLowerCase().includes(book.Genre.toLowerCase());

                document.getElementById('genrefilter').value='';
        
        }  
        else if(checker==="reset")
        {
            shouldDisplay = true;
        }
        else {
          
            shouldDisplay = true;
        }

        if (!shouldDisplay) {
            shouldDisplay = !titleFilter && !genreFilter && book.Available;
        }

        if (shouldDisplay) {
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

          

            const buttonCell = document.createElement('td');
            buttonCell.style.width = "20px";

            const borrowButton = document.createElement('button');
            borrowButton.textContent = "Delete";
        
            borrowButton.style.border = "none";
            borrowButton.style.backgroundColor = "red";
            borrowButton.style.fontWeight = "light";
            borrowButton.style.fontSize = "17px";
            borrowButton.style.borderRadius = "8px";
            borrowButton.style.padding = "3px";
            borrowButton.style.marginBottom = "4px";

            borrowButton.addEventListener('click', () => {
                if (borrowButton.textContent === "Delete") {
                    
                    borrowButton.style.backgroundColor = "Gray";}
               alert(`${book.Title} Delete successfully`);
            
              
            
               books.splice(index, 1);
               localStorage.setItem('book', JSON.stringify(books));
               loadTableData(checker);
            });
            buttonCell.appendChild(borrowButton);
         
            row.appendChild(buttonCell);
            if (checker==="available")
                {
                    if(book.Available==="yes")
                        tableBody.appendChild(row);
                    else 
                    return;

                }
                else
            tableBody.appendChild(row);
        }
    });
}
}