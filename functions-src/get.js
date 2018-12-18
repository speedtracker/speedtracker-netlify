const factory = require('@speedtracker/mongodb')
const instance = factory({
  connectionString: process.env.MONGODB_CONN_STR,
  database: process.env.MONGODB_DATABASE
})

module.exports.handler = function (event, context, callback) {
  const {
    from,
    page,
    to
  } = event.queryStringParameters

  if (typeof page !== 'string') {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing parameter: page'
      })
    })    
  }

  instance.get({
    page,
    timestampFrom: from && parseInt(from),
    timestampTo: to && parseInt(to)
  }).then(results => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(results)
    })
  }).catch(error => {
    callback(error, {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    })
  })
}
