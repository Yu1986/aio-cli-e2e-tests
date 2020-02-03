/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const execa = require('execa')
const chalk = require('chalk').default
const repositories = require('../repositories.json')
const fs = require('fs-extra')
const auth = require('./auth')

const resDir = '.repos'

function runOne (name, params) {
  console.log(chalk.blue(`> e2e tests for ${chalk.bold(name)}, repo: ${chalk.bold(params.repository)}, branch: ${chalk.bold(params.branch)}`))

  console.log(chalk.dim(`    - cloning repo ${chalk.bold(params.repository)}..`))
  execa.sync('git', ['clone', params.repository, name], { stderr: 'inherit' })
  process.chdir(name)
  console.log(chalk.dim(`    - checking out branch ${chalk.bold(params.branch)}..`))
  execa.sync('git', ['checkout', params.branch], { stderr: 'inherit' })
  console.log(chalk.dim('    - installing npm packages..'))
  execa.sync('npm', ['install'], { stderr: 'inherit' })
  console.log(chalk.bold('    - running tests..'))
  execa.sync('npm', ['run', 'e2e'], { stderr: 'inherit' })
  process.chdir('..')
  console.log(chalk.green(`    - done for ${chalk.bold(name)}`))
}

/* ************************ RUN ************************ */

// run tests
async function runAll () {
  console.log(chalk.blue.bold(`-- e2e testing for ${Object.keys(repositories).toString()} --`))
  console.log()

  const failed = []
  const startDir = process.cwd()
  fs.emptyDirSync(resDir)
  process.chdir(resDir)

  console.log(chalk.dim(`    - create jwt-auth config...`))
  const homedir = require('os').homedir()
  execa.sync('node', [homedir+'/.npm-global/bin/aio', 'config', 'set', 'jwt-auth', '--json', '--file', '../config/jwt_auth_config.json'], { stderr: 'inherit' })

  console.log(chalk.dim(`    - export wsk auth key...`))
  auth_str = execa.sync('cat', ['../config/auth.rc'], { stderr: 'inherit' })
  console.log(auth_str.stdout)
  process.env['AUTH'] = auth_str.stdout

  Object.keys(repositories).forEach(k => {
    try {
      runOne(k, repositories[k])
    } catch (e) {
      console.error(e)
      console.error(chalk.red(`!! e2e tests for ${chalk.bold(k)} failed !!`))
      failed.push(k)
    }
  })
  process.chdir(startDir)

  // success
  console.log()
  if (failed.length === 0) console.log(chalk.green.bold('-- all e2e tests ran successfully --'))
  else console.log(chalk.red(`-- some test(s) failed: ${chalk.bold(failed.toString())} --`))
}

runAll()
  .catch(e => console.error(e))
