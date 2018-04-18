import axios from 'axios'

export function createCancelToken() {
  return axios.CancelToken.source()
}

export function isCancel(thrown) {
  return axios.isCancel(thrown)
}

export function loadConfigPromise(payload, cancelToken) {
  return axios.get('https://js-developer-second-round.herokuapp.com/api/v1/application/constraints', { cancelToken })
}

export function calculatePromise(payload, cancelToken) {
  return axios.get(
    // there is no random latency
    // `https://js-developer-second-round.herokuapp.com/api/v1/application/first-loan-offer?amount=${payload.amount}&term=${payload.term}`,
    //  there is random latency between 0 and 1000 ms
    `https://js-developer-second-round.herokuapp.com/api/v1/application/real-first-loan-offer?amount=${payload.amount}&term=${payload.term}`,
    { cancelToken }
  )
}
