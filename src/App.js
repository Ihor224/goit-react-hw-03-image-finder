import React, { Component } from 'react';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import s from './App.css';

class App extends Component {
  state = {
    inputValue: '',
  };

  handleFormSubmit = inputValue => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery inputValue={this.state.inputValue} />
      </div>
    );
  }
}

export default App;
