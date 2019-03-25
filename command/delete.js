const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)
let tplKeys = Object.keys(tplList);

let question;

if (tplKeys.length) {
  question = [
    {
      type: 'list',
      name: 'name',
      message: 'Which template you want to delete:',
      choices: tplKeys || [],
      validate(val) {
        if (tplList[val]) {
          return true
        } else if (val === '') {
          return 'Name is required!'
        } else if (!tplList[val]) {
          return 'This template doesn\'t exists.'
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'are you sure to delete the template?',
    },
  ];
} else {
  question = [{
    type: 'confirm',
    name: 'text',
    message: 'No template, please add template first!'
  }]
}



module.exports = prompt(question).then(({ name, confirm }) => {
  if (!confirm || !name) {
    process.exit()
  }
  delete tplList[name]
  writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(tplList, 'Template has been deleted successfully!')
  })
})