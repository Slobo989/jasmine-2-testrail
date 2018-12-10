[![TestRail v4.1](https://img.shields.io/badge/TestRail%20API-v2-green.svg)](http://docs.gurock.com/testrail-api2/start)
# Jasmine2TestRail

Module to use [Protractor](https://www.protractortest.org) in conjunction with [TestRail](http://www.gurock.com/testrail/).

* It can automatically create new test run on TestRail.
* It can automatically push test results to TestRail - after they've been run.

## Install
```code
npm i jasmine-2-testrail
```

## Example - Protractor **conf.js**
The Reporter should be imported and declared outside of the config and included in the onPrepare section.
<br>The "createRun()" method is called for creating run in the afterLaunch section of the config file,<br>with the first parameter being your corresponding TestRail project ID
<br>and the second parameter being the suite ID in which you want to put the newly created run.
```javascript
const Reporter = require('jasmine-2-testrail')
const reporter = new Reporter({
});

exports.config = {

  onPrepare: () => {
    jasmine.getEnv().addReporter(reporter);
  },

  afterLaunch: () => {
    // The first parameter is the project ID, and the second is the suite ID
    reporter.createRun(1, 1)
    // afterLaunch needs to return a promise in order
    // to execute asynchronous code (used the most basic promise)
    return new Promise(() => true)
  },
}

```
## Example - tests
You should put the Case ID from TestRail at the start of each IT description, <br>and separate it from the test name by a colon - ":".
```javascript
describe('Login Page', () => {
  // "1:" this is Case ID from Test Rail
  it('1: Login success', async () => {
    expect(1).toBe(1)
  })

  it('2: Login fail', async () => {
    expect(1).toBe(0)
  })

  xit('3: Registration', async () => {
    expect(1).toBe(1)
  })
})
```
## Example - **testrail-credentials.json**
This file needs to be created in the projects root directory.
<br> It should contain the URL of your TestRail, username (email address) and password (or API key).
<br> This file needs to have all 3 parameters correctly filled.
```javascript
{
  "networkURL": "https://<YourProjectURL>.testrail.io",
  "username": "email address",
  "password": "password or API key"
}
```
## Enable TestRail API
In order to use TestRail API, it needs to be enabled by an administrator in your own TestRail Site Settings
<br> Also if you want to use API authentication instead of your password, enable session authentication for API <br> in the TestRail Site Settings, and add an API key in your User settings.

## Authors
| [<img src="https://avatars.githubusercontent.com/Slobo989" width="100px;"/><br /><sub><b>Slobodan Dušanić</b></sub>](https://github.com/Slobo989)<br /> | [<img src="https://avatars.githubusercontent.com/<username>" width="100px;"/><br /><sub><b>Željko Simić</b></sub>](https://www.npmjs.com/~thezex)<br/> |
|---|---|

## Special thanks

[<img src="https://avatars.githubusercontent.com/markoarsenal" width="100px;"/>
<br /><sub><b>Marko Rajević</b></sub>](https://github.com/markorajevic)<br />

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
