# Comet
Comet，一个简单、易使用的项目初始化脚手架

## 安装

```
1.git clone https://github.com/qiuling2014/comet-cli.git
2.cd comet && npm install
3.npm link
```

## 使用方式

打开终端，输入comet，你将看到相帮助方法。

```
Usage: comet <command>

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  add|a          Add a new template
  list|l         List all the templates
  init|i         Generate a new project
  delete|d       Delete a template
```

## Template

脚手架的关键是template项目，Comet通过`comet add`命令添加template到脚手架，template项目请自行上传到github上
```

1.输入template名称，名称不能与已存在template同名；
2.输入template项目所在github的用户名；
3.输入template项目所在github的项目名；
4.输入template项目分支名称。
```
通过以上步骤完成template项目添加到我们的脚手架，`comet list`命令可查看存在的所有template。

## 项目初始化

通过`comet init`完成项目创建。

```
1.选择template;
2.输入项目名称；
```

通过以上步骤即可完成项目初始化。

## Dependencies

* [Inquirer](https://github.com/SBoudrias/Inquirer.js/#separator): A collection of common interactive command line user interfaces.
* [download-git-repo](https://github.com/flipxfx/download-git-repo): Download and extract a git repository (GitHub, GitLab, Bitbucket) from node.
* [commander](https://github.com/tj/commander.js): node.js command-line interfaces made easy

