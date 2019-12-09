
import React from 'react';

class PhotosService {

  getPhotos() {
    return fetch('https://jsonplaceholder.typicode.com/photos');        
  }

}

export default PhotosService;
