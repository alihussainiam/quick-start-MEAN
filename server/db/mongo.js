'use strict'

const MongoClient = require('mongodb').MongoClient
const config = require('../config/config')
const url = config.mongoURL
let dbo = null
let mongoClient = null

module.exports = {
  getConnection: async function () {
    if (dbo) {
      return dbo
    } else {
      try {
        mongoClient = await MongoClient.connect(url, { useNewUrlParser: true })
        dbo = await mongoClient.db(config.nameDBMongo)
        console.log('connection established with mongo DB')
        return dbo
      } catch (err) {
        console.log(err)
        return null
      }
    }
  },
  getNote: async function (sessionId, limit = 50) {
    if (sessionId) {
      let result = null
      try {
        const db = await this.getConnection()
        result = await db.collection('notes').find({sessionId: sessionId}).project({_id: 0,sessionId:0}).sort({dateTime: -1}).limit((limit > 0) ? limit : null).toArray();
      } catch (error) {
        console.log(error)
      }
      return result
    }
  },
  insertNote: async function (data) {
    if (data.sessionId != undefined && data.sessionId != null) {
      let result = null
      data.dateTime = new Date(data.dateTime)
      try {
        const db = await this.getConnection()
        result = await db.collection('notes').insertOne(data)
      } catch (error) {
        console.log(error)
        return false
      }
      return result
    }
  }
}
