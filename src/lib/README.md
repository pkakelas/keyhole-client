# keyhole-client

Just a minimal 'n slick wrapper of the [keyhole API](https://apidocs.keyhole).

## Install
```
npm install keyhole-client
```

## Usage

```javascript
import createKeyholeClient from 'heyhole-client'

// Create the client using your keyhole access token
const client = createKeyholeClient('my_access_token');

// Create your tracker
const id = await client.createTracker(['soccer', '#fifa'], ['twitter', 'instagram'])

// Pause your tracker
await client.pauseTracker(id)

// Unpause your tracker
await client.startTracker(id)

// List your available trackers
const trackers = await client.getTrackers()

// Get a specific tracker
const tracker = await client.getTracker(id)
```

## Errors
 * `NotFoundError`: Triggered when a tracker is not found
 * `NotAuthenticatedError`: Triggered when your access token is invalid 
 * `MissingParameterError`: Triggered when the parameters inserted are invalid
 * `InternalServerError`: Triggered on unspecified errors or due to rate limiting

## Typescript 
This project is built in typescript and includes TypeScript definitions.