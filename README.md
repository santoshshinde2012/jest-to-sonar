# jest-to-sonar
 [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=santoshshinde2012_jest-to-sonar&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=santoshshinde2012_jest-to-sonar)![Github action workflow status](https://github.com/santoshshinde2012/jest-to-sonar/actions/workflows/ci.yml/badge.svg?branch=main)![CodeQL](https://github.com/santoshshinde2012/jest-to-sonar/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)![njsscan Analysis](https://github.com/santoshshinde2012/jest-to-sonar/actions/workflows/njsscan.yml/badge.svg?branch=main)![Maintainability](https://api.codeclimate.com/v1/badges/25a158be62f89833fcda/maintainability)![Test Coverage](https://api.codeclimate.com/v1/badges/25a158be62f89833fcda/test_coverage)

Convert the Jest test case report to a Sonar generic test execution report.

## Installation

- Using yarn:

  ```
  yarn add -D jest-to-sonar
  ```

- Using npm:

  ```
  npm i -D jest-to-sonar
  ```

## Configuration

Configure the jest config file `jest.config.js`, by adding `jest-to-sonar` to the list of reporters. Once you successfully run the jest test command, a Sonar generic test execution report will be created at `./coverage/test-report.xml`.

```
module.exports = {
    ...
    reporters: ['default',  'jest-to-sonar'],
    ...
}
```

We can customize the file name and path for the generated Sonar generic test execution report by passing parameters to    `outputFile` in jest config.

```
module.exports = {
    ...
        reporters: ['default',  ['jest-to-sonar', {
            outputFile: 'sonar-test-report.xml',
        }]],
    ...
}
```

## Available Options

| Parameter Name | Description          | Default Value | Type       |
|----------------|----------------------|---------------|------------|
| `outputFile`     | Report file name with path Make sure the folder exists | `sonar-report.xml` | String      |
| ...            | ...                  | ...           | ...        |


### [Contribution](CONTRIBUTING.md)

You can help this project by reporting [bugs](https://github.com/santoshshinde2012/jest-to-sonar/issues/new), asking for features, or sending in pull requests.

<hr/>

### Connect with me on
<div id="badges">
  <a href="https://twitter.com/shindesan2012">
    <img src="https://img.shields.io/badge/shindesan2012-black?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter Badge"/>
  </a>
  <a href="https://www.linkedin.com/in/shindesantosh/">
    <img src="https://img.shields.io/badge/shindesantosh-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
   <a href="https://blog.santoshshinde.com/">
    <img src="https://img.shields.io/badge/Blog-black?style=for-the-badge&logo=medium&logoColor=white" alt="Medium Badge"/>
  </a>
  <a href="https://www.buymeacoffee.com/santoshshin" target="_blank">
   <img src="https://img.shields.io/badge/buymeacoffee-black?style=for-the-badge&logo=buymeacoffee&logoColor=white" alt="Buy Me A Coffee"/>
  </a>
</div>