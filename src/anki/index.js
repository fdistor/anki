const axios = require('axios').default;
const actions = require('./actions');

const url = 'http://localhost:8765';

const ankiConnect = async action => {
  return axios.post(url, action).then(res => res.data);
};

module.exports = { ankiConnect, ...actions };
