import axios from 'axios'

// let
//   CancelToken = axios.CancelToken,
//   source

export function loadConfigPromise(payload) {
  return axios.get('https://js-developer-second-round.herokuapp.com/api/v1/application/constraints')
}

export function calculatePromise(payload) {
  return axios.get(
    `https://js-developer-second-round.herokuapp.com/api/v1/application/first-loan-offer?amount=${payload.amount}&term=${payload.term}`
  )
}

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


