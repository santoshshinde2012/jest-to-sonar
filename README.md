<h1 align="center"><a href="https://blog.santoshshinde.com/enhancing-code-quality-a-deep-dive-into-jest-sonarqube-and-github-actions-for-f8862f8e5848" target=”_blank”>jest-to-sonar</a></h1>

<p align="center">Convert the Jest test case report to a Sonar generic test execution report.</p>


<p align="center">
  <a href="https://sonarcloud.io/project/overview?id=santoshshinde2012_jest-to-sonar">
     <img src="https://sonarcloud.io/api/project_badges/measure?project=santoshshinde2012_jest-to-sonar&metric=alert_status" alt="Quality Gate Status" />
  </a>
  <a href="https://github.com/santoshshinde2012/jest-to-sonar/actions/workflows/ci.yml" target=”_blank”>
     <img src="https://github.com/santoshshinde2012/jest-to-sonar/actions/workflows/ci.yml/badge.svg?branch=main" alt="Github action workflow status" />
  </a>
  <a href="https://codeclimate.com/github/santoshshinde2012/jest-to-sonar/maintainability" target=”_blank”>
    <img src="https://api.codeclimate.com/v1/badges/25a158be62f89833fcda/maintainability" alt="maintainability" />
  </a>
  <a href="https://codeclimate.com/github/santoshshinde2012/jest-to-sonar/test_coverage" target=”_blank”>
    <img src="https://api.codeclimate.com/v1/badges/25a158be62f89833fcda/test_coverage" alt="test_coverage" />
  </a>
   <a href="https://snyk.io/test/github/santoshshinde2012/jest-to-sonar" target=”_blank”>
     <img src="https://snyk.io/test/github/santoshshinde2012/jest-to-sonar/badge.svg?style=flat-square" alt="" />
  </a>
</p>


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

Configure the jest config file `jest.config.js`, by adding `jest-to-sonar` to the list of reporters. Once you successfully run the jest test command, a Sonar generic test execution report will be created at `./coverage/sonar-report.xml`.

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
            outputFile: './coverage/sonar-report.xml',
        }]],
    ...
}
```

## Available Options

| Parameter Name | Description          | Default Value | Type       |
|----------------|----------------------|---------------|------------|
| `outputFile`     | Report file name with or without folder path  | `./coverage/sonar-report.xml` | String      |
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