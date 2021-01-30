function fetchImages(inputValue, currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '19140351-76c1842c7e15bc8b4ebf8f090';

  return fetch(
    `${BASE_URL}?q=${inputValue}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No images on request ${inputValue}`));
  });
}

const api = {
  fetchImages,
};

export default api;
