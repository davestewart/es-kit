# ES Kit

> ES Kit is a "pick and mix" utility library that simplifies writing Elasticsearch code

## Abstract

Elasticsearch's [JavaScript Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html) provides a powerful way to call its [APIs](https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html) but its inherent flexibility and subtle but significant nuances can quickly result in verbose, duplicated and fragile code, whilst modeling even the most basic database setup.

To address this, ES Kit provides a "kit of parts" in the form of simple, reusable and atomic utility functions, which fit together to reliably abstract the request / response lifecycle and make it easy to write simple, clean code and eliminate the trial and error.

## Who is this library for?

Whilst primarily aimed at **simplifing Elasticsearch for new users**, ES Kit aims to be useful for users of all skill levels:

- **New users**: use the query functions and Api to get up and running quickly
- **Improving users**: use the docs, query functions and helpers to learn how Elasticsearch fits together
- **Experienced users**: customise the core helpers to build requests and parse responses whilst keeping your code clean

New users, check the [Elasticsearch 101](docs/elastic-101.md) document for a valuable primer on how ES works differently to how you might expect, and how to work with the database, vs against it.

## Overview

The library comprises the following parts:

| Type                         | Purpose                                                  | Code example                      |
| ---------------------------- | -------------------------------------------------------- | --------------------------------- |
| [Queries](./docs/queries.md) | Build Elastic queries using simple functions             | `_multiMatch('*', 'cat')`         |
| [Scripts](./docs/scripts.md) | Build Elastic scripts from existing JavaScript functions | `_removeFromArray('listIds', 24)` |
| [Helpers](./docs/helpers.md) | Abstract any part of the Elastic query lifecycle         | `$paginate(res)`                  |
| [Api](./docs/api.md)         | One-liner interaction Elastic's Search and Document APIs | `Api.search('contacts', params)`  |

The key takeaway is that you can use as little or as much of ES Kit as required; the level of abstraction is up to you!

Check the [code](src/modules) to see how simple it really is.

## Lifecycle examples

Building queries is simple, flexible and type-safe:

```js
const query = _should([
  _match('lists', 'sales'),
  _multiMatch('*', 'san diego'),
  _must([
    _prefix('name', 'kevin')
  ])
])
```

Scripts can be picked from a library or converted on the fly (making Painless *actually* painless):

```js
const script = $script(function (ctx, params) { ... }, { lists: 'sales' })
```

You can pass `query`, `script`,  ` sort` options and more to the native client:

```js
const res = client.search({ index: 'contacts', query, { sort } })
```

A battery of [helpers](src/modules/helpers.ts) is available to handle the heavy lifting:

```js
return $paginate(res, options)
```

Finally, ES Kit's [Api](src/modules/api.ts) wraps up loading, parsing and error handling in a single line:

```js
return Api.search('contacts', query, { size: 20, from: 100 })
```

## Next steps

Check the docs for:

- Installation
- API
- Tips

