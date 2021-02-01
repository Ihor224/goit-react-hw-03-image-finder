import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import api from '../Services/pixabay-api';
import Loader from 'react-loader-spinner';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

class ImageGallery extends Component {
  state = {
    hits: [],
    loading: false,
    currentPage: 1,
    showModal: false,
    largeImageURL: '',
    title: '',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevInputValue = prevProps.inputValue;
    const nextInputValue = this.props.inputValue;

    if (prevInputValue !== nextInputValue) {
      this.setState({ hits: [], currentPage: 1, loading: true });

      this.getData();
    }

    this.scrollPage();
  }

  getData = () => {
    const { currentPage } = this.state;
    const { inputValue } = this.props;

    this.setState(prevState => ({ loading: true, hits: prevState.hits }));
    api
      .fetchImages(inputValue, currentPage)
      .then(({ hits }) => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickItem = (src, alt) => {
    this.toggleModal();
    this.setState({ largeImageURL: src, title: alt });
  };

  loadMore = () => {
    this.getData();
  };

  scrollPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const {
      hits,
      showModal,
      largeImageURL,
      title,
      loading,
      error,
    } = this.state;

    return (
      <div>
        {hits && (
          <ul className={s.ImageGallery}>
            <ImageGalleryItem images={hits} onClickItem={this.onClickItem} />
          </ul>
        )}
        {loading && (
          <Loader type="Bars" color="#00BFFF" height={80} width={80} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={title} />
          </Modal>
        )}
        {hits.length > 0 && <Button loadMore={this.loadMore} />}
        {error && <h1>{error.mesage}</h1>}
      </div>
    );
  }
}

export default ImageGallery;
