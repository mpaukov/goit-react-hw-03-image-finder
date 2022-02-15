import axios from 'axios';

export default class ServiceAPI {
  state = {
    options: {
      key: '25182566-6d97045846fa1b6cae2a84492',
      q: '',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      total_page: 0,
      per_page: 12,
    },
  };

  async getPictures() {
    const response = await axios.get(
      'https://pixabay.com/api/',
      this.state.options,
    );
    this.incrementPage();
    return response;
  }

  incrementPage() {
    this.setState(prevState => {
      const page = prevState.options.page + 1;
      return { page: page };
    });
  }

  resetSearch() {
    this.setState({ page: 1, total_page: 0, q: '' });
  }

  get searchQuery() {
    return this.state.options.q;
  }

  set searchQuery(newQuery) {
    this.setState({ q: newQuery });
  }

  get pageNumber() {
    return this.state.options.page;
  }

  set pageNumber(newNumber) {
    this.setState({ page: newNumber });
  }
}
