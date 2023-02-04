// export default async function fetchSerchValue(val) {
//   let page = 1;
//   const result = await fetch(
//     `https://pixabay.com/api/?key=30100311-f3864219c2c65e8e904a2d1d0&q=${val}&image_type=photo&per_page=20&page=${page}&safesearch=true&orientation=horizontal`
//   );
//   const resJson = await result.json();
//   console.log(resJson);
//   return resJson;
// }

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
    console.log(this.page);
    this.page += 1;
  }

  get query() {
    return this.serchQuery;
  }
  set query(search) {
    this.serchQuery = search;
  }
}
