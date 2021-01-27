# data API

# API domain name

All API requests should be made to: **`https://api.covidtracking.com`**

# US Current and Historical Data

## Historic US values

`/v1/us/daily.json`

**Example:** `[https://api.covidtracking.com/v1/us/daily.json](https://api.covidtracking.com/v1/us/daily.json)`

## Current US values

`/v1/us/current.json`

**Example:** `[https://api.covidtracking.com/v1/us/current.json](https://api.covidtracking.com/v1/us/current.json)`

## US historic values for a date

`/v1/us/{date}.json`

**Example:** `[https://api.covidtracking.com/v1/us/20200501.json](https://api.covidtracking.com/v1/us/20200501.json)`

# States Current and Historical Data

## State metadata

Basic information about states, including notes about our methodology and the websites we use to check for data.

`/v1/states/info.json`

**Example:** `[https://api.covidtracking.com/v1/states/info.json](https://api.covidtracking.com/v1/states/info.json)`

## Metadata about a specific state

`/v1/states/{state}/info.json`

**Example:** `[https://api.covidtracking.com/v1/states/ca/info.json](https://api.covidtracking.com/v1/states/ca/info.json)`

## Historic values for all states

Lists all COVID data available for every state since tracking started.

`/v1/states/daily.json`

**Example:** `[https://api.covidtracking.com/v1/states/daily.json](https://api.covidtracking.com/v1/states/daily.json)`

## Current values for all states

`/v1/states/current.json`

**Example:** `[https://api.covidtracking.com/v1/states/current.json](https://api.covidtracking.com/v1/states/current.json)`

## Current values for a single state

The most recent COVID data for a single state. The current value may be different than today. Use lower-case state codes in the URL.

`/v1/states/{state}/current.json`

**Example:** `[https://api.covidtracking.com/v1/states/ca/current.json](https://api.covidtracking.com/v1/states/ca/current.json)`

## Historic values for a single state

`/v1/states/{state}/daily.json`

**Example:** `[https://api.covidtracking.com/v1/states/ca/daily.json](https://api.covidtracking.com/v1/states/ca/daily.json)`

## Values for a single state on a specific date

`/v1/states/{state}/{date}.json`

**Example:** `[https://api.covidtracking.com/v1/states/ca/20200501.json](https://api.covidtracking.com/v1/states/ca/20200501.json)`

# Status

`/v1/status.json`

**Example:** `[https://api.covidtracking.com/v1/status.json](https://api.covidtracking.com/v1/status.json)`

### Fields

- **buildTime**

    string

    The last time the API was built.

- **production**

    boolean

    Whether this is a production build of the API.

- **runNumber**

    integer

    The run ID. Set to zero if it is a non-production run.