import { Component } from 'react';
import { Searchbar } from './Searchbar';

export class App extends Component {
  handleSubmit = searchQuery => {
    console.log('🚀 ~ file: App.jsx ~ line 6 ~ App ~ searchQuery', searchQuery);
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

/* , <ImageGallery>, <ImageGalleryItem>, <Loader>, <Button> и <Modal></Modal>  */
