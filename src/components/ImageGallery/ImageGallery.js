import { ServiceAPI } from 'components/API';
import { Component } from 'react';
import { ImageGalleryItem } from '.';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    page: 1,
    status: 'idle',
    response: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.query !== prevProps.query ||
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'pending' });
      ServiceAPI(this.props.query, this.page)
        .then(this.dataProcessing)
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  dataProcessing = response => {
    const data = response.data.hits.map(data => {
      const { id, largeImageURL: imageURL, webformatURL: src, tag: alt } = data;
      return { id, imageURL, src, alt };
    });
    return this.setState({
      response: data,
      status: 'resolved',
    });
  };

  render() {
    const { status } = this.state;

    if (status === 'rejected') {
      return (
        <ul className={s.ImageGallery}>
          <li>Все плохо</li>
        </ul>
      );
    }

    if (status === 'resolved') {
      return (
        <ul className={s.ImageGallery}>
          <ImageGalleryItem images={this.state.response} />
        </ul>
      );
    }
    if (status === 'pending') {
      return (
        <ul className={s.ImageGallery}>
          <li>Загружаем...</li>
        </ul>
      );
    }

    if (status === 'idle') {
      return <></>;
    }
  }
}

export default ImageGallery;
