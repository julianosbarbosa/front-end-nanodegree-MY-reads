import React from "react";
import Book from "./book";

class BookShelf extends React.Component {
  render() {
    const books = this.props.books;
    const shelf = this.props.shelf;

    return (
      <div className="bookShelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">   
            {books.map(book => (
              <Book
                book={book}
                shelf={shelf}
                key={book.id}
                changeShelf={this.props.changeShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;