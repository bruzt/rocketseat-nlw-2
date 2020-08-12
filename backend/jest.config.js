
module.exports = {
    "transform": {
        "^.+\\.ts$": "ts-jest"
      },
      "testRegex": "\\.test\\.ts",
      "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
      ],
      "verbose": true,
      "maxWorkers": 1,
      "testTimeout": 10000,
      "collectCoverage": true,
      "coverageDirectory": "./coverage"
}