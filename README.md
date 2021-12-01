# ES Kit

> ES Kit is a "pick and mix" library that simplifies writing Elasticsearch code

<p align="center">
  <img src="https://raw.githubusercontent.com/davestewart/es-kit/ff11c8dca141beaccd8a0d099785ba9cfbd226aa/assets/es-kit.svg" alt="ES Kit logo">
</p>




## Abstract

Elasticsearch's [JavaScript Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html) provides a powerful way to call Elasticsearch [APIs](https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html) but its inherent flexibility can be an issue:

- complex request and response formats can lead to verbose, duplicate or fragile application code
- if you're new to the API, documentation or terminology, it's difficult to know what code to write 

To address this, ES Kit provides a constrained "kit of parts" in the form of reusable, atomic helper functions which fit together to reliably abstract the API lifecycle, making it quick, easy (and reasonably obvious how) to write clean, trial-and-error-free client code.

## Who is this library for?

Whilst primarily aimed at [simplifing Elasticsearch for new users](docs/elastic/README.md), ES Kit aims to be useful for any user:

- **New users**: use the query functions and Api to get up and running quickly
- **Improving users**: use the docs, query functions and helpers to learn how Elasticsearch fits together
- **Experienced users**: customise the core helpers to build requests and parse responses in less overall code

> **New users**: check the [Elasticsearch 101](docs/elastic/101.md) document for a valuable primer on how ES works differently to how you might expect and the [Elasticsearch tips](docs/elastic/tips.md) document on how to work *with* Elastic vs *against* it.

## Overview

ES Kit comprises the following components:

| Type                         | Purpose                                                      | Code example                      |
| ---------------------------- | ------------------------------------------------------------ | --------------------------------- |
| [Queries](docs/utilities/queries.md) | Build Elastic queries using simple functions                 | `_multiMatch('*', 'cat')`         |
| [Scripts](docs/utilities/scripts.md) | Build Elastic scripts from JavaScript functions     | `_removeFromArray('listIds', 24)` |
| [Helpers](docs/utilities/helpers.md) | Abstract key parts of the Elastic API lifecycle | `$paginate(res)`                  |
| [Api](docs/api/README.md)         | Simplified interaction with Elasticsearch's APIs | `Api.search('contacts', params)`  |

Each of the helpers, functions or classes aims to be simple, atomic and [transparent](src/modules); rather than a complex or overly-abstracted monolithic framework, these small self-contained units let you go all-in on abstraction or pick and mix what suits your development style or project.

If a helper doesn't fit your use case:

-  write that bit of code yourself, and quickly move on
- extend the [Helpers](docs/api/README.md) with your new code and use it again 

## Code examples

### Quick and easy

Use the [query](docs/utilities/queries.md) builder functions and [Api](docs/api/README.md) class to handle configuration, loading, parsing, pagination and error handling in a single line:

```js
return Api.search('contacts', _.should([
  _.prefix('name', 'ke')
  _.match('lists', 'sales'),
  _.multiMatch('*', 'san diego'),
]), { size: 20, from: 100 })
```

> **New users**: check the [Elastic tips](docs/elastic/tips.md) document to understand which queries to use and when  

Additionally, unlike Elasticsearch's APIs, ES Kit's [Api](docs/api/README.md) returns simplified, *consistent* response data across all Search and Document API requests, making it super-easy to get started without spending time worrying if you're doing it right or reinventing the wheel:

```
[
  {
    "_id" : "ZRWBNH0Bk8QNffIJQWQp",
    "name" : "Kelly Hill",
    "notes": "Works in the San Diego area"
    "lists": [
    	"sales"
    ]
  },
  {
    "_id" : "lCloSH0Bs3kx_70FRmtW",
    "name" : "Kevin James",
    "office": "San Diego"
    "lists": []
  }
]
```

### Fully customised

ES Kit is designed to be used as a kit of parts; there are helper functions to handle each stage of the request / response lifecycle.

You can create [scripts](docs/utilities/scripts.md) on the fly or pick from ES Kit's library (making [Painless](https://www.elastic.co/guide/en/elasticsearch/painless/master/index.html) relatively pain-free!):

```js
const script = $.script(function (ctx, params) { ... }, { lists: 'sales' })
```

You can build [request options](docs/utilities/helpers.md#requests) passing `query`, `script`, and  ` sort` options to the native client as you would normally:

```js
const res = client.updateByQuery({ index: 'contacts', query, script, sort })
```

Or parse [response data](docs/utilities/helpers.md#responses) without writing lots of call-specific code:

```js
return $.paginate(res, options)
```

## Next steps

Install via NPM:

```
npm i @davestewart/es-kit
```

Then, start writing code:

- [ES Kit Documentation](docs/README.md)

If you're new to Elastic, get up to speed:

- [Elastic Reference](docs/elastic/README.md)

