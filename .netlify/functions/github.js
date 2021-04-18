import axios from 'axios';

exports.handler = async function (event, context) {
  return { statusCode: 200, body: JSON.stringify({ message: process.env.SECRET }) };
};

// exports.handler = async function (event, context) {
//   return { statusCode: 200, body: JSON.stringify({ message: process.env.SECRET }) };

//   try {
//     let response = await axios('https://api.github.com/users', {
//       headers: {
//         Authorization: `token ${process.env.REACT_APP_GITHUB_PUBLIC_ACCESS_TOKEN}`,
//       },
//     });

//     let data = response;
//     return { statusCode: 200, body: JSON.stringify(data) };
//   } catch (err) {
//     let error = {
//       statusCode: err.statusCode || 500,
//       body: JSON.stringify({ error: err.message }),
//     };
//     return error;
//   }
// };
