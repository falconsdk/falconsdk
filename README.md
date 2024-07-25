# falcon SDK

[![Lint](https://github.com/falconsdk/falcon-js-sdk/actions/workflows/lint.yml/badge.svg)](https://github.com/falconsdk/falcon-js-sdk/actions/workflows/lint.yml)
[![Unit Test](https://github.com/falconsdk/falcon-js-sdk/actions/workflows/unit-test.yml/badge.svg)](https://github.com/falconsdk/falcon-js-sdk/actions/workflows/unit-test.yml)
[![E2E Test](https://github.com/falconsdk/falcon-js-sdk/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/falconsdk/falcon-js-sdk/actions/workflows/e2e-test.yml)

- Help developers build DeFi applications with the falcon API without handling API requests and responses.
- Support a wide range of common use cases, including token swaps, flash loans, and supply/borrow actions.
- Support multiple blockchain networks.

More details and examples can be found at [SDK Overview](https://docs.falcon.com/integrate-js-sdk/overview)

## Packages

- The `api` package empowers developers to interact with the falcon API.
- The `common` package empowers developers to deal with general information like token and network.
- The `core` package defines the constants and the interfaces used in the falcon API.
- The `lending` package empowers developers to rapidly build intent-centric applications and enhances the user experience for the lending protocols.
- The `smart-accounts` package manages the smart account integrated with the falcon API.
- The `test-helpers` package provides utilities for developers to write tests.

| package                                                          | version                                                                                                                                 | changelog                                  |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [@falcon/api](packages/api/README.md)                       | [![npm version](https://badge.fury.io/js/@falcon%2Fapi.svg)](https://www.npmjs.com/package/@falcon/api)                       | [GO](packages/api/CHANGELOG.md)            |
| [@falcon/common](packages/common/README.md)                 | [![npm version](https://badge.fury.io/js/@falcon%2Fcommon.svg)](https://www.npmjs.com/package/@falcon/common)                 | [GO](packages/common/CHANGELOG.md)         |
| [@falcon/core](packages/core/README.md)                     | [![npm version](https://badge.fury.io/js/@falcon%2Fcore.svg)](https://www.npmjs.com/package/@falcon/core)                     | [GO](packages/core/CHANGELOG.md)           |
| [@falcon/lending](packages/lending/README.md)               | [![npm version](https://badge.fury.io/js/@falcon%2Flending.svg)](https://www.npmjs.com/package/@falcon/lending)               | [GO](packages/lending/CHANGELOG.md)        |
| [@falcon/smart-accounts](packages/smart-accounts/README.md) | [![npm version](https://badge.fury.io/js/@falcon%2Fsmart-accounts.svg)](https://www.npmjs.com/package/@falcon/smart-accounts) | [GO](packages/smart-accounts/CHANGELOG.md) |
| [@falcon/test-helpers](packages/test-helpers/README.md)     | [![npm version](https://badge.fury.io/js/@falcon%2Ftest-helpers.svg)](https://www.npmjs.com/package/@falcon/test-helpers)     | [GO](packages/test-helpers/CHANGELOG.md)   |
