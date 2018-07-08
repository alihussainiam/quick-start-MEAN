
const mongo = require('../../db/mongo');

module.exports = class GetNote {  
  getMethod () {
    return 'GET'
  }

  async processRequest (req) {
    try {  
     let result=await mongo.getNote(req.query.sessionId);
      return result;
    } catch (e) {
      throw Error('Unable to get Note')
    }
  }
}
