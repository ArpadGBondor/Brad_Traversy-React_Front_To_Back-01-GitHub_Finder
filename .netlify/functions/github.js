const fetch = require('node-fetch');
const API_ENDPOINT = 'https://api.github.com/users'

exports.handler = async (event, context) => {
  let response
  try {
    response = await fetch(API_ENDPOINT)
    // handle response
    return { statusCode: 200, body: response };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }



// const axios = require('axios');

// exports.handler = async function (event, context) {
//   try {
//     let response = await axios('https://api.github.com/users');

//     let data = response;
//     return { statusCode: 200, body: data };
//   } catch (err) {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         error: err,
//         statusCode: err.statusCode || 500,
//         message: err.message,
//       }),
//     };
//   }
// };
