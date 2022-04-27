# Development

## Helper Scripts

### `./bin/buildjs.sh`

This will build a docker container suitable for local, standalone javascript development. It will not require the full back-end service.

### `./bin/testjs.sh`

This will start a test session in a terminal on your newly built docker container using `vitest`.

### `./bin/devjs`

This will start a `vite` server on your docker container that will hot-refresh scripts as you update them during development. It will also
mock any http calls that have definitions in `src/test/data`