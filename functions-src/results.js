const SpeedTracker = require('@speedtracker/api')
const MongoDB = require('@speedtracker/mongodb')
const database = new MongoDB({
  connectionString: process.env.MONGODB_CONN_STR,
  database: process.env.MONGODB_DATABASE
})
const api = new SpeedTracker(database)

module.exports.handler = api.getFunctions().results
