# Examples

Without ES Blocks:

```js
import { client } from './client'
import _ from './queries.js'

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
  console.log(res.body.hits.hits)
}
catch (err) {
  console.log(err)
}
```

Light use; working with the Elasticsearch client to simplify requests:

```js
import { client } from './client'
import _ from 'es-kit/queries'

// use blocks to build the query
const params = {
  index: 'contacts',
  query: _.should([
    _.match('groups', req.params.id),
    _.multiMatch('*', req.query.filter),
  ])
}

try {
  const res = await client.search(params)
  console.log(res.body.hits.hits)
}
catch (err) {
  console.log(err)
}
```

Medium use; using additional utility libraries to simplify responses:

```js
import { client } from './client'
import _ from 'es-kit/queries'
import $ from 'es-kit/helpers'

const params = {
  index: 'contacts',
  query: _.should([
    _.match('groups', req.params.id),
    _.multiMatch('*', req.query.filter),
  ])
}
try {
  const res = await client.search(params)
  console.log($.extractSearch(res))
}
catch (err) {
  $.error(err)
}
```

Full use; using the API wrappers minimise typed code:

```js
import { client } from './client'
import _ from 'es-kit/queries'
import Api from 'es-kit/api'

const params = {
  query: _.should([
    _.match('groups', req.params.id),
    _.multiMatch('*', req.query.filter),
  ])
}
const options = {
  _fields: { code: 'id', label: 'name', desc: 'description' }
}

// makes the call
Api.search('contacts', params, options)
```

