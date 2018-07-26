import React from 'react';
import './AddAuthorForm.css';

class AuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            name: ''
        };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddAuthor();
    }

    render() {
        return  <form onSubmit={this.handleSubmit}>
            <div className='AddAuthorForm__input'>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' value={this.state.name} onChange={this.onFieldChange}/>
            </div>
            <div className='AddAuthorForm__input'>
                <label htmlFor='imageUrl'>Image URL</label>
                <input type='text' name='imageUrl' value={this.state.imageUrl} onChange={this.onFieldChange}/>
            </div>
            <div className='AddAuthorForm__input'>
                <input type='submit' value='Add' />
            </div>
        </form>;
    }
}

function AddAuthorForm({match, onAddAuthor}) {
    return <div className='AddAuthorForm'>
        <h1>Add author</h1>
        <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>
}

export default AddAuthorForm;