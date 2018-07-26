import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const state = {
    turnData: {
        books: ['book1', 'book2', 'book3', 'book4', 'book5'],
        author: {
            name: 'Charles Dickens',
            imageUrl: 'images/authors/charledickens.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['David Copperfield', 'A Tale Of Two Cities']
        },
    },
    highlight: 'none'
};

describe('Author Quiz', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AuthorQuiz {...state } onAnswerSelected={ () => {}}/>, div);
    });

    describe('When no answer has been selected', () => {
        let wrapper;
        beforeAll(() => {
            wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>)
        });

        it('should have no background color', () => {
            expect(wrapper.find('div.row.turn').props().style.background).toBe('');
        });
    });

    describe('When wrong answer has been selected', () => {
        let wrapper;
        beforeAll(() => {
            wrapper = mount(<AuthorQuiz {...Object.assign({}, state, { highlight: 'wrong' } )} onAnswerSelected={() => {}}/>)
        });

        it('should have red background color', () => {
            expect(wrapper.find('div.row.turn').props().style.background).toBe('red');
        });
    });

    describe('When correct answer has been selected', () => {
        beforeAll(() => {

        });

        it('should have green background color', () => {

        });
    });
});