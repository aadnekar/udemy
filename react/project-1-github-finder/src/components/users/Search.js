import React, { Component } from 'react';

export class Search extends Component {
  state = {
    text: '',
  };

  onChange = (event) => {
    this.setState({ text: event.target.value });
  };

  render() {
    return (
      <div>
        <form action='' className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search for users'
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
      </div>
    );
  }
}

export default Search;
