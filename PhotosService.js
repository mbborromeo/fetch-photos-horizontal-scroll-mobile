
import React from 'react';

class PhotosService() {
  constructor() {
    
  }

  getPhotos() {
    return fetch('https://jsonplaceholder.typicode.com/photos')
      .then( response => response.json() )
        .then( json => console.log(json) );
  }
}

export default PhotosService;
