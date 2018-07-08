
const mongo = require('../../db/mongo');

module.exports = class SaveNote {
  getMethod () {
    return 'POST'
  }
  
  async processRequest (req) {
    try {  
      await mongo.insertNote(req.body);
      return null
    } catch (e) {
      throw Error('Unable to add Note')
    }
  }
}
