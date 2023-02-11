var pageCount = 0
var currentPage = 0
var paginationLimit = 10

function searchBooks(event, pageCount, currentPage, paginationLimit){
    event.preventDefault()
    console.log(pageCount)
    console.log(currentPage)
    console.log(paginationLimit)
    var input = document.getElementById('search').value;
    console.log("test")
    let books = []
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=${paginationLimit}&startIndex=${currentPage}`)
        .then(response => response.json())
        .then(data => { data.items.map((item) => {
            const volume = item.volumeInfo
            console.log(item.volumeInfo)
            const book = {
                title: volume.title,
                authors: volume.authors===undefined ? "No authors found":volume.authors,
                language: volume.language.toUpperCase(),
                pages: volume.pageCount,
                images: volume.imageLinks,
                description: volume.description

            }
            books.push(book)
            document.getElementById("display-books").innerHTML += "<div> title : "+book.title+
            "</div><div> authors :"+book.authors+
            "</div><div> language: "+book.language+
            "</div><div> number of pages :"+book.pages+
            "</div><div> description :"+book.description+
            (book.images && book.images.smallThumbnail ? "<img src=\""+book.images.smallThumbnail+"\"/>" : "") +
            "<br/><br/>"
            return book
        })
            
        //console.log(books)
        //console.log(data.items);
    })
    .catch(error => {
        console.error(error);
    });
    currentPage += 10
    console.log(pageCount)
    console.log(currentPage)
    console.log(paginationLimit)

    
}

function next() {
    currentPage += paginationLimit
    searchBooks(event, pageCount, currentPage, paginationLimit)
}

