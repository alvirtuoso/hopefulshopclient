import axios from 'axios'
// import {fromPromise} from 'rxjs/observable/fromPromise'
// import {from} from 'rxjs/observable/from'
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/share';
import {REVIEWS, ITEMS_URI} from './Constants'
export default {
  /**
   * Sends a http get request using rxjs observable from promise returned by axios.
   * Recommended to use state mgmt store.js
   * @param {*} keywords 
   */
  // geItemsRequest(keywords, page) {
  //     return fromPromise(
  //         axios.get(ITEMS_URI + '/' + keywords + '/' + page)
  //         // axios.get('http://jsonplaceholder.typicode.com/users')
  //       );
  //     // return axios.get('http://127.0.0.1:5000/api/amazon?search=' + keywords);
  // },

  /**
   * Uses axios http get request.
   */
  getItemAveReviews(reviewData){
    reviewData = encodeURIComponent(reviewData);
    return axios.get(
      REVIEWS + reviewData
    )
  }


}