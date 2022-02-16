import { ServiceAPI } from 'components/API';
import { Component } from 'react';
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
        .then(response => this.setState({ response, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

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
          <li>test</li>
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
      return (
        <ul className={s.ImageGallery}>
          <li>Ничего не происходит</li>
        </ul>
      );
    }
  }
}

export default ImageGallery;
