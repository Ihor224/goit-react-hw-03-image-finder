import React, { Component } from 'react';
import s from './Button.module.css';

class Button extends Component {
  render() {
    return (
      <button
        type="button"
        className={s.Button}
        data-action="load-more"
        onClick={this.props.loadMore}
      >
        Load more
      </button>
    );
  }
}

export default Button;
