import { Component } from 'react';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
    status: 'ready',
  };
  handleSubmit = newSearchQuery => {
    this.setState({ searchQuery: newSearchQuery });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.searchQuery && <ImageGallery />}
      </div>
    );
  }
}

/* , <ImageGallery>, <ImageGalleryItem>, <Loader>, <Button> и <Modal></Modal>  */
