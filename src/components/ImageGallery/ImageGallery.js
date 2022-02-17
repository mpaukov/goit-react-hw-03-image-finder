import { ServiceAPI } from 'components/API';
import { Button } from 'components/Button';
import { Component } from 'react';
import { Watch } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ImageGalleryItem } from '.';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    page: 1,
    status: 'idle',
    response: [],
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.setState({ status: 'pending', response: [], page: 1 });
      this.getPicture();
    }
    if (this.state.page !== prevState.page) {
      this.setState({ status: 'pending' });
      this.getPicture();
    }
  }

  getPicture = () => {
    ServiceAPI(this.props.query, this.state.page)
      .then(this.dataProcessing)
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  dataProcessing = response => {
    const data = response.data.hits.map(data => {
      const { id, largeImageURL: imageURL, webformatURL: src, tag: alt } = data;
      return { id, imageURL, src, alt };
    });
    return this.setState(prevState => {
      return {
        response: [...prevState.response, ...data],
        status: 'resolved',
      };
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
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
        <>
          <ul className={s.ImageGallery}>
            <ImageGalleryItem images={this.state.response} />
          </ul>
          <Button onClick={this.handleLoadMore} />
        </>
      );
    }
    if (status === 'pending') {
      return (
        <div className={s.Watch}>
          <Watch color="#00BFFF" height={200} width={200} ariaLabel="loading" />
        </div>
      );
    }

    if (status === 'idle') {
      return <></>;
    }
  }
}

export default ImageGallery;
