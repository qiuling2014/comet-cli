const { prompt } = require('inquirer')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')

let tplList = require(`${__dirname}/../templates`)
let tplKeys = Object.keys(tplList);
let question;

if (tplKeys.length) {
  question = [
    {
      type: 'list',
      name: 'name',
      message: 'Template name:',
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
      type: 'input',
      name: 'project',
      message: 'Project name:',
      validate(val) {
        if (val !== '') {
          return true
        }
        return 'Project name is required!'
      }
    }
  ]
} else {
  question = [{
    type: 'confirm',
    name: 'text',
    message: 'No template, please add template first!'
  }]
}


module.exports = prompt(question).then(({ name, project }) => {
  if (!name || !project) {
    process.exit()
  }

  const gitPlace = tplList[name]['owner/name']
  const gitBranch = tplList[name]['branch']
  const spinner = ora('Downloading template...')

  spinner.start()

  download(`${gitPlace}#${gitBranch}`, `./${project}`, (err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    spinner.stop()
    console.log(chalk.green('New project has been initialized successfully!'))
  })
})