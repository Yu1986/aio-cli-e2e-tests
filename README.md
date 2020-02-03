# Adobe I/O E2E Tests

E2e tests for Adobe I/O CLI and plugins.

## Requirements

Each tested repository has its own requirements, mostly environment variables to be set.
WSK auth key and JWT auth config are needed for E2E test, please set them correctly under config

## Run

`change config file with correct wsk auth and JWT auth`
`npm install`
`npm run all`

## Tests

- [@adobe/aio-cli-plugin-ims](https://github.com/Yu1986/aio-cli-plugin-ims)
- [@adobe/aio-cli-plugin-target](https://github.com/Yu1986/aio-cli-plugin-target)
- [@adobe/aio-cli-plugin-auth](https://github.com/Yu1986/aio-cli-plugin-auth)
- [@adobe/aio-cli-plugin-boilerplate](https://github.com/Yu1986/aio-cli-plugin-boilerplate)
- [@adobe/aio-cli-plugin-pgb](https://github.com/Yu1986/aio-cli-plugin-pgb)
- [@adobe/aio-cli-plugin-console](https://github.com/Yu1986/aio-cli-plugin-console)
- [@adobe/aio-cli-plugin-jwt-auth](https://github.com/Yu1986/aio-cli-plugin-jwt-auth)
- [@adobe/aio-cli-plugin-config](https://github.com/Yu1986/aio-cli-plugin-config)
- [@adobe/aio-cli-plugin-cloudmanager](https://github.com/Yu1986/aio-cli-plugin-cloudmanager)
- [@adobe/aio-cli-plugin-runtime](https://github.com/Yu1986/aio-cli-plugin-runtime)
- [@adebe/aio-cli](https://github.com/Yu1986/aio-cli)

## Add a new e2e test

- expose a `npm run e2e` command in the repo under test.
- set the repo, branch, requiredEnv and doNotLog fields in `repositories.json`.
- add to the [above section](#tests) a reference to a markdown describing what the test does.

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
