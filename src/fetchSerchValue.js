const BACE_URL = 'https://pixabay.com/api/';
export default class FetchSerch {
  constructor() {
    this.serchQuery = '';
    this.page = 1;
    this.storage = [];
  }

  async fetchSerchValue(val) {
    this.serchQuery = val;
    const result = await fetch(
      `${BACE_URL}?key=30100311-f3864219c2c65e8e904a2d1d0&q=${this.serchQuery}&image_type=photo&per_page=20&page=${this.page}&safesearch=true&orientation=horizontal`
    );
    const resJson = await result.json();
    return resJson;
  }
  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
