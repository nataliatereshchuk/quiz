import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import {BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import {shuffle, sample} from 'underscore';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['book1 - MT', 'book2 - MT', 'book3 - MT']
    },
    {
        name: 'Author2',
        imageUrl: 'images/authors/author2.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['book1 - a2', 'book2 - a2', 'book3 - a2']
    },
    {
        name: 'Author3',
        imageUrl: 'images/authors/author3.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['book1 - a3', 'book2 - a3', 'book3 - a3']
    },
    {
        name: 'Author4',
        imageUrl: 'images/authors/author4.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['book1 - a4', 'book2 - a4', 'book3 - a4']
    }];

function reducer(state = { authors: authors, turnData: getTurnData(authors), highlight: 'none'}, action) {
    switch (action.type) {
        case 'ANSWER_SELECTED':
            let isCorrect = state.turnData.author.books.some(book => book == action.answer);
            return Object.assign({}, state, {highlight:  isCorrect ? 'correct' : 'wrong' });
        case 'CONTINUE':
            return Object.assign({}, state, { turnData: getTurnData(authors), highlight: 'none'})
        case 'ADD_AUTHOR':
            return Object.assign({}, state, { authors: state.authors.concat(action.author)})
    }

    return state;
}

let store = Redux.createStore(reducer);

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c) {
        return p.concat(c.books);
    }, []);

    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);
    let author = authors.find(author => author.books.some(title => title === answer));
    console.log(answer);
    console.log(author);
    return {
        books: fourRandomBooks,
        author: author
    }
}

function App() {
    return <AuthorQuiz/>
}

function AuthorWrapper() {
    return <AddAuthorForm/>
}

ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path='/' component={App}/>
                <Route path='/add' component={AuthorWrapper}/>
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
