const JasmineConsoleReporter = require('jasmine-console-reporter');
const TestRail = require('testrail');

const dotenv = require('dotenv')
const fs = require('fs')

const envFile = fs.readFileSync('../.env')
const config = dotenv.parse(envFile)

const api = new TestRail({
  host: config.NETWORK_URL,
  user: config.USERNAME,
  password: config.PASSWORD,
});

class Reporter extends JasmineConsoleReporter {
  constructor() {
    super()
    this.caseids = []
    this.results = []

  }

  createRun(runName, projectId, suiteId) {
    let now = new Date();

    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }

    let name = now.toLocaleString(['en-GB'], options)

    if(runName){
      name = runName
    }

    api.addRun(projectId, {
      suite_id: suiteId, name: name, include_all: false, case_ids: this.caseids,
    }).then((r) => {
      console.log('Created new test run: ' + name)
      api.addResultsForCases(r.id, { results: this.results })
        .then(() => {
          console.log('Added test results')
        })
        .catch((error) => { console.log(error.message || error) })
    }).catch((error) => { console.log(error.message || error) }
    )
  }

  specDone(spec) {
    super.specDone(spec)

    const id = spec.description.split(':')[0]
    if (this.verbosity.specs) {
      this.caseids.push(
        parseInt(id, 10),
      )
      switch (spec.status) {
        case 'pending':
          this.results.push({
            case_id: parseInt(id, 10),
            status_id: 2,
            comment: 'Intentionally skipped (xit).',
          })
          break;

        case 'failed':
          this.results.push({
            case_id: parseInt(id, 10),
            status_id: 5,
            comment: spec.failedExpectations[0].message,
          })
          break;

        case 'passed':
          this.results.push({
            case_id: parseInt(id, 10),
            status_id: 1,
            comment: 'Test passed successfully.',
          })
          break;

        default:
          // unknown status
          break;
      }
    }
  }
}

module.exports = Reporter;
