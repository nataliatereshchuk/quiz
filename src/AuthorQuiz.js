import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import './AuthorQuiz.css'

function Hero() {
    return (
        <div className='row'>
            <div className='jumbotron col-10 offset-1'>
                <h1>Author Quiz</h1>
                <p>Select the book written by the author shown</p>
            </div>
        </div>
    )
}

function Turn({author, books, highlight, onAnswerSelected}) {
    function highlightToBgColor(highlight) {
        const mapping = {
            'none': '',
            'correct': 'green',
            'wrong': 'red'
        };

        return mapping[highlight];
    }

    return (
        <div className='row turn' style={{background: highlightToBgColor(highlight)}}>
            <div className='col-4 offset-1'>
                <img src={author.imageUrl} className='authorImage' alt='Author'/>
            </div>
            <div className='col-6'>
                {books.map(title => <Book title={title} key={title} onClick={onAnswerSelected}></Book>)}
            </div>
        </div>
    )
}

Turn.propTypes = {
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        imageSource: PropTypes.string.isRequired,
        books: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    onAnswerSelected: PropTypes.func.isRequired,
    highlight: PropTypes.string.isRequired
};

function Continue({show, onContinue}) {
    return (<div className='row continue'>
        {show ?
            <div className='col-11'>
                <button className='btn btn-primary btn-lg continue' onClick={onContinue} >Submit</button>
            </div>
            : null}
    </div>)
}

function Book({title, onClick}) {
    return (
        <div className='answer' onClick={() => onClick(title)}>
            <h1>{title}</h1>
        </div>
    );
}

function Footer() {
    return (
        <div id='footer' className='row'>
            <div className='col-12'>
                <p className='text-muted credit'>Footer ...</p>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        turnData: state.turnData,
        highlight: state.highlight
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onAnswerSelected: (answer) => dispatch({type: 'ANSWER_SELECTED', answer}),
        onContinue: () => { dispatch({type: 'CONTINUE'})}
    }
}

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(function AuthorQuiz(props) {
    return (
        <div className='container-fluid'>
            <Hero/>
            <Turn {...props.turnData} highlight={props.highlight} onAnswerSelected={props.onAnswerSelected}/>
            <Continue show={props.highlight === 'correct'} onContinue={props.onContinue}/>
            <p><Link to='/add'>Add an author</Link></p>
            <Footer/>
        </div>
    )
});

export default AuthorQuiz;