[![Codecov Coverage](https://img.shields.io/codecov/c/github/pkakelas/keyhole-client/master.svg)](https://codecov.io/gh/pkakelas/keyhole-client/) [![CircleCI](https://circleci.com/gh/pkakelas/keyhole-client.svg?style=shield)](https://circleci.com/gh/pkakelas/keyhole-client) [![npm version](https://badge.fury.io/js/keyhole-client.svg)](https://www.npmjs.com/package/keyhole-client) [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

# keyhole-client

Just a minimal 'n slick wrapper of the [keyhole API](https://apidocs.keyhole).

### Install
```
npm install keyhole-client
```

### Usage
```javascript
import createKeyholeClient from 'heyhole-client'

// Create the client using your keyhole access token
const client = createKeyholeClient('my_access_token')

// Create your tracker
const id = await client.createTracker(['soccer', '#fifa'], ['twitter', 'instagram'])

// Pause your tracker
await client.pauseTracker(id)

// Unpause your tracker
await client.startTracker(id)

// List your available trackers
const trackers = await client.getTrackers()

// Get specific tracker
const tracker = await client.getTracker(id)
```

## Errors
 * `NotFoundError`: Triggered when a tracker is not found
 * `NotAuthenticatedError`: Triggered when your access token is invalid 
 * `MissingParameterError`: Triggered when the parameters inserted are invalid
 * `InternalServerError`: Triggered on unspecified errors or due to rate limiting

## Typescript 
This project is built in typescript and includes TypeScript definitions.
