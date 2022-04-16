const fetch = require('node-fetch')

const makeRequest = async () => {
  try {
    const response = await fetch('https://codequiz.azurewebsites.net/', {
      headers: {
        Cookie: 'hasCookie=true',
      },
    })
    const body = await response.text()
    return body
  } catch (error) {
    console.error(error)
  }
}

const htmlStrExtract = (str, tagName) => {
  let innerText = str.split(`<${tagName}>`)
  innerText.shift()
  innerText = innerText.join('').split(`</${tagName}>`)
  innerText.pop()
  return innerText
}

const targetFundCode = process.argv[process.argv.length - 1]
let fundsNav = {}
makeRequest().then((result) => {
  let data = htmlStrExtract(result, 'table') // get inner of table tag
  data = htmlStrExtract(data.join(''), 'tr') // get inner of tr tag

  for (let i = 1; i < data.length; i++) {
    const tableRowData = htmlStrExtract(data[i], 'td') // remove html tag, only inner text is remained
    fundsNav[tableRowData[0].replace(/\s/g, '')] = tableRowData[1] // store FUNDCODE:NAV pair in object
  }
  console.log(fundsNav[targetFundCode]) // print out FUNDCODE's NAV in the console
})
