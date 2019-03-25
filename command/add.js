const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'input',
    name: 'name',
    message: 'Set the custom name of the template:',
    validate(val) {
      if (tplList[val]) {
        return 'Template is existed!'
      } else if (val === '') {
        return 'Name is required!'
      } else {
        return true
      }
    }
  },
  {
    type: 'input',
    name: 'owner',
    message: 'Input owner of the git repo:',
    validate(val) {
      if (val !== '') {
        return true
      }
      return 'Repo owner is required!'
    }
  },
  {
    type: 'input',
    name: 'repoName',
    message: 'Input name of the git repo:',
    validate(val) {
      if (val !== '') {
        return true
      }
      return 'Repo name is required!'
    }
  },
  {
    type: 'input',
    name: 'branch',
    message: 'Branch of the git repo:',
    default: 'master'
  }
]

module.exports = prompt(question).then(({ name, owner, repoName, branch }) => {
  tplList[name] = {};
  tplList[name]['owner/name'] = `${owner}/${repoName}`;
  tplList[name]['branch'] = branch;

  writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(tplList, 'New template has been added successfully!')
  })
})