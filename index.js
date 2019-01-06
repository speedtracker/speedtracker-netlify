const config = require('./speedtracker.config.js')
const fs = require('fs')
const MongoDB = require('@speedtracker/mongodb')
const path = require('path')
const SpeedTracker = require('@speedtracker/api')

const database = new MongoDB({
  connectionString: process.env.MONGODB_CONN_STR,
  database: process.env.MONGODB_DATABASE
})
const api = new SpeedTracker({
  baseUrl: process.env.URL,
  config,
  database,
  defaultProfileUrl: process.env.DEFAULT_URL,
  wptApiKey: process.env.WPT_API_KEY
})

module.exports = api
