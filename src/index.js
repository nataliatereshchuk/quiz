import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import AuthorQuiz from './AuthorQuiz';
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

const state = {
    turnData: getTurnData(authors),
    highlight: ''
};

function onAnswerSelected(answer) {
    let isCorrect = state.turnData.author.books.some(book => book == answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
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

function render() {
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}></AuthorQuiz>, document.getElementById('root'))
}

render();
registerServiceWorker();
