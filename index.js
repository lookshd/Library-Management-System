document.addEventListener('DOMContentLoaded', loadTableData);

function loadTableData() {

   
     const storedBooks = localStorage.getItem('book');
    const books = storedBooks ? JSON.parse(storedBooks) : [];
    const latestBooksContainer = document.querySelector('.latest-books');
    const totalBooksContainer = document.querySelector('.totalbooks');
    const totalbookcard = document.createElement('div');
    totalbookcard.className = 'totalbook-card';
    totalbookcard.innerHTML = `
    
      <div  >
        <h1 >Total Books: ${books.length}</h1>
       
      
      </div>
    `;
    totalBooksContainer.appendChild(totalbookcard);



  latestBooksContainer.innerHTML = '';
  console.log(storedBooks);
    if(books.length===0)
    {    alert('Library Closed !!');
        tableheader.style.display = 'none'; 
       
        tableBody.innerHTML = '<tr><td colspan="7" style="color: white; text-align: center;">Books Not Available!</td></tr>';  // Display the message with custom styling
        
    }else {

    var lastlength=books.length-4;

    console.log(lastlength);

   
    books.forEach((book, index) => { 
   
          if(index>=lastlength && book.Available==="yes")
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
            
            
        }}
    )};
}
