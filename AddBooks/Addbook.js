document.getElementById('form').addEventListener('submit',function(event)
{
    event.preventDefault();
const Title=document.getElementById('title').value;
const Author=document.getElementById('author').value;
const Year=document.getElementById('year').value;
const Genre=document.getElementById('genre').value;
 const Available = document.querySelector('input[name="Available"]:checked').value;

const Bookdata={
Title:Title,
Author:Author,
Year:Year,
Genre:Genre,
Available:Available

}
let book=JSON.parse(localStorage.getItem('book')) || [];
book.push(Bookdata);

localStorage.setItem('book',JSON.stringify(book));


alert('Book Added Successfully');
document.getElementById('form').reset();

});
const varr=localStorage.getItem('book');

console.log(varr);


