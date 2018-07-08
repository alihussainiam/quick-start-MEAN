/**
* @author Hussain Ali
* @email hs.hirani110@gmail.com
* @create date 2018-07-05 11:14:01
* @modify date 2018-07-05 11:14:01
*/

let express = require('express')
let router = express.Router()
let fs = require('fs')
let responseUtils = require('../utils/response')
let apiSuccessResponse = responseUtils.apiSuccessResponse
let apiErrorResponse = responseUtils.apiErrorResponse

// using an anonymous self calling function to avoid cluttering scope with temp vars
// creating a files map to require all the api files in the directory dynamically.
let filesMap =
(function () {
  let dir = './api/routes/'
  let _filesMap = {}
  let files = fs.readdirSync(dir)
  for (let i in files) {
    let name = dir + '/' + files[i]
    if (!fs.statSync(name).isDirectory()) {
      _filesMap[files[i].split('.')[0]] = new (require('./routes/' + files[i]))()
    }
  }
  return _filesMap
})()

router.use(require('body-parser').json())

/* GET users listing. */
router.all('/:endPoint/*', async function (req, res, next) {
  processRequest(req, res, next)
})

router.all('/:endPoint', async function (req, res, next) {
  processRequest(req, res, next)
})

let processRequest = async function (req, res, next) {
  let responseObject = {}
  let endPoint = req.params.endPoint
  if (filesMap.hasOwnProperty(endPoint)) {
    let apiCall = filesMap[endPoint]
    if (typeof apiCall.getMethod === 'function' && apiCall.getMethod() == req.method) {
      if (typeof apiCall.processRequest === 'function') {
        try {
          responseObject = apiSuccessResponse(await apiCall.processRequest(req))
        } catch (e) {
          responseObject = apiErrorResponse(e)
        }
      } else {
        responseObject = apiErrorResponse('function processRequest not found in the apiCall')
      }
    } else {
      responseObject = apiErrorResponse('Method ' + req.method + ' not supported')
    }
  } else {
    responseObject = apiErrorResponse('invalid endPoint ' + endPoint)
  }
  res.send(responseObject)
}

module.exports = router
