const csv = require('fast-csv')

/* const validateCsv = require('./validateCsv') */

const readCSV = async ({ readableStream, onValidData, onEnd }) => {
  const writer = csv.fromStream(readableStream, {
    headers: [
      'yard_id',
      'employee_id',
      'clock_in',
      'clock_out',
    ],
  })

  return new Promise((resolve, reject) => {
    const errors = []
    let index = 0

    writer
      .on('data', (data) => {
        if (index !== 0) {
          onValidData(data)
        }
        index++
      })
      .on('error', reject)
      .on('end', () => {
        onEnd()
        resolve({ errors })
      })
  })
}

module.exports = readCSV
