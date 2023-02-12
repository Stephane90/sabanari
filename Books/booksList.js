var totalResults = 0
var currentPage = 0
var paginationLimit = 10
var books = []

function searchBooks(event, currentItems, paginationLimit, first){
    event.preventDefault()
    var input = document.getElementById('search').value;
    console.log("test")
    currentBooks =[]
    currentBookString = ""
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=${paginationLimit}&startIndex=${currentItems}`)
        .then(response => response.json())
        .then(data => { data.items.map((item) => {
            const volume = item.volumeInfo
            if(first){
                totalResults = data.totalItems 
                currentPage = 0
            }
                 
            // number of pages : (data.totalItems+paginationLimit -1) / paginationLimit  
            //console.log(item.volumeInfo)
            const book = {
                title: volume.title,
                authors: volume.authors===undefined ? "No authors found.":volume.authors,
                language: volume.language.toUpperCase(),
                pages: volume.pageCount ===undefined || volume.pageCount ===0 ? "Unknown.":volume.pageCount,
                images: volume.imageLinks,
                description: volume.description === undefined ? "No Description.":volume.description

            }

            currentBookString += "<li><div> title : "+book.title+
            "</div><div> authors :"+book.authors+
            "</div><div> language: "+book.language+
            "</div><div> number of pages :"+book.pages+
            "</div><div>"+book.description+"<br/>"+
            (book.images && book.images.smallThumbnail ? "<img src=\""+book.images.smallThumbnail+"\"/>" : "") +
            "</li><br/><br/>"
            /*
            currentBooks.push("<li><div> title : "+book.title+
            "</div><div> authors :"+book.authors+
            "</div><div> language: "+book.language+
            "</div><div> number of pages :"+book.pages+
            "</div><div> description :"+book.description+
            (book.images && book.images.smallThumbnail ? "<img src=\""+book.images.smallThumbnail+"\"/>" : "") +
            "</li><br/><br/>")
            */
            document.getElementById("display-books").innerHTML =  currentBookString
                
            return currentBooks
        })
            
        //console.log(books)
        //console.log(data.items);
    })
    .catch(error => {
        console.error(error);
    });
    
    console.log("total results :" + totalResults)
    console.log("Current :" + currentItems)
    console.log("Limit : " + paginationLimit)

    return currentBooks
}

function next() {
    console.log(totalResults)
    if(currentPage<totalResults)
        currentPage += paginationLimit
    searchBooks(event, currentPage, paginationLimit, false)
}

function prev() {
    if(currentPage - paginationLimit >= 0)
    currentPage -= paginationLimit
    searchBooks(event, currentPage, paginationLimit, false)
}
