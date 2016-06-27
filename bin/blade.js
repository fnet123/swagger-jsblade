#!/usr/bin/env node

'use strict';

var app =  require('commander');
var project = require('../lib/commands/project');
var codegen = require('../lib/commands/codegen');
var mock = require('../lib/commands/mock');
var frameworks = Object.keys(project.frameworks).join('|');
var cli = require('../lib/util/cli');
var execute = cli.execute;

app
  .command('create [name]')
  .description('创建一个文件夹包含一个前端项目')
  .option('-f, --framework <framework>', frameworks + " 中的一个" )
  .action(execute(project.create));

app
    .command('api <apiName> <swaggerFile> <toPath>')
    .description('创建一个api接口集合 必填:<api名称> <sawagger文件位置,支持本地和线上> <输出文件位置>')
    .option('-n, --ngHttp', "$http类型")
    .option('-r, --resource', "angular-resource类型")
    .option('-s, --superagent', "superagent类型")
    .option('-S, --surround <mode>', "包围模式(-c时无效) ,将生成的代码包含在UMD-1 AMD-2 CommonJS-3 或 闭包-4 中")
    .option('-c, --custom <tplPath>', "自定义模板")
    .option('-w, --withCredentials', "支持跨域传cookie")
    .action(execute(codegen.create));

app
    .command('mock <swaggerFile>')
    .description('生成含有mock数据的swagger文件 必填:<swagger文件位置,本地或线上yaml或JSON格式文件> <输出JSON文件位置及名称>')
    .option('-f, --file <filePath>', "生成mock file")
    .option('-s, --server [portNum]', "启动mock server,端口号,默认8000")
    .action(execute(mock.create));

app.parse(process.argv);
cli.validate(app);