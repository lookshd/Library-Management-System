

// Call the function to load the table data on page load
document.addEventListener('DOMContentLoaded', loadTableData);

function loadTableData() {
  
    const storedBooks = localStorage.getItem('book');
    

    const books = storedBooks ? JSON.parse(storedBooks) : [];
console.log(books);
    const tableBody = document.querySelector("#bookTable tbody");
    const tableHeader = document.querySelector("#bookTable thead");
   
    if (!tableBody) {
        console.error('Table body element not found.');
        return;
    }

    if (books.length === 0) {
        alert('No  Book Available For Borrow!!');
        if (tableHeader) {
            tableHeader.style.display = 'none';
        }
        tableBody.innerHTML = '<tr><td colspan="7" style="color: white; text-align: center;">Library is closed!</td></tr>';  // Display the message with custom styling
    }
    else{
  
    books.forEach((book,index) => {
        const row = document.createElement('tr');

        const numbercell=document.createElement('td');
        numbercell.textContent=index+1;
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
        genreCell.textContent = book.Genre ;
        row.appendChild(genreCell);

      
const buttonCell = document.createElement('td');

buttonCell.style.width="20px";
const borrowButton = document.createElement('button');
borrowButton.textContent = "Borrow";
borrowButton.style.border="none";
borrowButton.style.backgroundColor = "Green";
borrowButton.addEventListener('mouseover', () => {
    borrowButton.style.backgroundColor = "darkgreen";
    borrowButton.style.transform = "scale(1.05)";
});
borrowButton.style.fontWeight = "light"; 
borrowButton.style.fontSize="17px";
borrowButton.style.borderRadius="8px";


borrowButton.style.padding="3px";
borrowButton.style.marginBottom="4px";
borrowButton.style.cursor="pointer";
borrowButton.style.transition = "background-color 0.3s ease, transform 0.3s ease";
borrowButton.addEventListener('click', () => {
    if (borrowButton.textContent === "Borrow") {
       
        
        borrowButton.textContent = "Borrowed";
        borrowButton.style.backgroundColor = "Gray";}
   alert(`${book.Title} borrow successfully`);

   book.Available = "no"; 

   
   localStorage.setItem('book', JSON.stringify(books));
   const returnstorage={
    Bookid:book.id,
    Booktitle:book.Title,

   }
   let returnbook=JSON.parse(localStorage.getItem('returnbook')) || [];
returnbook.push(returnstorage);

localStorage.setItem('returnbook',JSON.stringify(returnbook));

});


borrowButton.addEventListener('mouseout', () => {
    borrowButton.style.backgroundColor = "Green";
    borrowButton.style.transform = "scale(1)";
});

buttonCell.appendChild(borrowButton);

row.appendChild(buttonCell);

document.querySelector('table').appendChild(row);


   console.log(book.Available);

if(book.Available==="yes")
{tableBody.appendChild(row);}
if (!tableBody) {
    console.error('Table body element not found.');
    return;
}

    });
}}
