import React, { Component } from 'react';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { images, onClickItem } = this.props;

    return images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <li
        key={id}
        className={s.ImageGalleryItem}
        onClick={() => onClickItem(largeImageURL, tags)}
      >
        <img
          src={webformatURL}
          alt={tags}
          className={s.ImageGalleryItem_image}
        />
      </li>
    ));
  }
}

export default ImageGalleryItem;
