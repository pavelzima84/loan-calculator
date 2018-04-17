import axios from 'axios'

import * as Cache from './cache'

export function createCancelToken() {
  return axios.CancelToken.source()
}

export function loadConfigPromise(payload, cancelToken) {
  return axios.get('https://js-developer-second-round.herokuapp.com/api/v1/application/constraints', { cancelToken })
}

export function calculatePromise(payload, cancelToken) {
  return axios.get(
    `https://js-developer-second-round.herokuapp.com/api/v1/application/first-loan-offer?amount=${payload.amount}&term=${payload.term}`,
    { cancelToken }
  )
}

// export function cansel(source) {

// }

// export function calculatePromise(payload) {
//   if (source) {
//     source.cancel()
//   }

//   source = CancelToken.source()

//   return axios.get(
//     `https://js-developer-second-round.herokuapp.com/api/v1/application/real-first-loan-offer?amount=${payload.amount}&term=${payload.term}`,
//     {
//        cancelToken: source.token
//     }
//   )
// }


