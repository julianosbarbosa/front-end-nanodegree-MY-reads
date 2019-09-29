import React from 'react'
import { Link, Route } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import FindBook from './findBook'
import DashboardBook from './dashboardBook'
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelvedBooks: [],
    shelves: [
      {
        id: "currentlyReading",
        name: "Currently Reading"
      },
      {
        id: "wantToRead",
        name: "Want to Read"
      },
      {
        id: "read",
        name: "Read"
      }
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then(shelvedBooks => {
      this.setState({ shelvedBooks });
    });
  }
  changeShelf = (bookToAdd, shelf) => {
    this.setState(state => {
          const nextState = state.shelvedBooks.filter(book => book.id !== bookToAdd.id).concat( [{...bookToAdd, shelf}] );
          return { shelvedBooks: nextState };
        });
      }

  render() {
    return (
      <div className="app">
        <Route path="/search"
          render={() => (
            <FindBook
              shelvedBooks={this.state.shelvedBooks}
              changeShelf={this.changeShelf}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {this.state.shelves.map(shelf => (
                  <DashboardBook
                    key={shelf.id}
                    shelf={shelf}
                    shelvedBooks={this.state.shelvedBooks}
                    books={this.state.shelvedBooks.filter(shelvedBooks => {
                      return shelvedBooks.shelf === shelf.id;
                    })}
                    changeShelf={this.changeShelf}
                  />
                ))}
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );

  }
}

export default BooksApp
