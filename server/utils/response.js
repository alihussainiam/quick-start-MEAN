/**
 * @author Hussain Ali
 * @email hs.hirani110@gmail.com
 * @create date 2018-07-05 11:26:57
 * @modify date 2018-07-05 11:26:57
 * @desc [description]
*/

let utils = {}

utils.apiSuccessResponse = function (data) {
  return {
    'status': {
      'isSuccess': true
    },
    'data': data
  }
}

utils.apiErrorResponse = function (error) {
  return {
    'status': {
      'isSuccess': false,
      'error': error
    }
  }
}

module.exports = utils
