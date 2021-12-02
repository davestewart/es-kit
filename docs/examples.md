# Examples

The following examples show you how to use a little, a lot or all of ES Kit to simplify your Elasticsearch code.

## Setup

Set up ES JS Client:

```js
// client.js
import { Client } from '@elastic/elasticsearch'

export const client = new Client({
  node: 'http://localhost:9200'
})
```

## No ES Kit

To start with, let's write some ES queries using only the ES JS client:

```js
import { client } from './client'

// query is verbose with difficult to remember syntax
const params = {
  index: 'contacts',
  query: {
    bool: {
      should: [
        {
          match: {
            groups: 123,
          },
        },
        {
          multi_match: {
            fields: [
              '*',
            ],
            query: 'cat',
            type: 'phrase_prefix',
          },
        },
      ],
    },
  },
}

try {
  const res = await client.search(params)
  if (res.body.hits) {
    return res.body.hits.hits.map(hit => {
      return { _id: hit._id, ...hit._source }
    })    
  }
}
catch (err) {
  console.log(err)
  throw err
}
```

## Simplify query building

Now, let's bring in ES Kit's [query](./utilities/queries.md) functions to simplify the building of queries:

```js
import { client } from './client'
import { Queries as _ } from '@davestewart/es-kit'

// use helpers to build the query
const params = {
  index: 'contacts',
  query: _.should([
    _.match('groups', req.params.id),
    _.multiMatch('*', req.query.filter),
  ])
}

try {
  const res = await client.search(params)
  if (res.body.hits) {
    return res.body.hits.hits.map(hit => {
      return { _id: hit._id, ...hit._source }
    })    
  }
}
catch (err) {
  console.log(err)
  throw err
}
```

## Handle responses and errors

Next, let's use ES Kit's [results](utilities/helpers.md) and [error](utilities/helpers.md) helpers to parse results and handle errors, without writing manual code:

```js
import { client } from './client'
import { Queries as _, Helpers as $ } from '@davestewart/es-kit'

const params = {
  index: 'contacts',
  query: _.should([
    _.match('groups', req.params.id),
    _.multiMatch('*', req.query.filter),
  ])
}
try {
  const res = await client.search(params)
  return $.results(res) // convert results to something usable
}
catch (err) {
  throw $.error(err) // logs and throws a simplified error structure
}
```

## Go all-in

Finally, lets use ES Kit's [API](./api) to make the call, parse responses and handle errors (note: internally it uses the helpers!):

```js
import { client } from './client'
import { Queries as _, Api } from '@davestewart/es-kit'

// use the Api class to do everything above
return Api.search('contacts', {
  query: _.should([
    _.match('groups', req.params.id),
    _.multiMatch('*', req.query.filter),
  ])
})
```

## Next

Return to the [docs](README.md).
