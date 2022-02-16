import { Component } from 'react';
import ImageGallery from './ImageGallery';
import { Searchbar } from './Searchbar';

export class App extends Component {
  state = {
    searchQuery: '',
  };
  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery query={this.state.searchQuery} />
      </div>
    );
  }
}

/* , <ImageGallery>, <ImageGalleryItem>, <Loader>, <Button> и <Modal></Modal>  */
