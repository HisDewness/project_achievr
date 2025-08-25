# project_achievr

A web app for helping gamers get achievements/trophies for their games.

## API

The API uses Helmet for security headers, validates payloads, and only accepts requests from whitelisted origins.
Configure allowed origins with the `ALLOWED_ORIGINS` environment variable:

```
ALLOWED_ORIGINS=http://localhost:3000
```

Invalid payloads or malformed JSON trigger `400` responses, while requests from unauthorized origins receive a `403` error.

### Testing

Run unit tests with:

```
npm test
```
