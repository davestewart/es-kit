#  Helpers

> Reusable helper functions to help you build request options and parse response data

## Usage

### Importing

You can import the helpers in several ways:

```js
// import as a single object (which will code-complete)
import { Helpers } from `@davestewart/es-kit`

// import and rename as something easier to type
import { Helpers as $ } from `@davestewart/es-kit`

// import individually
import { $painless, $query } from `@davestewart/es-kit`
```

Each of the helpers is typed, so expect proper auto-completion and warnings as you use them.

### Extending

The pupose of ES Kit's helpers is to abstract the repetitive code required at each stage of Elasticsearch's API request / response lifecycle.

They aim to provide sensible defaults, but if that doesn't suit, they can easily be replaced by your own functions, allowing you to change how request and response data is processed. This allows you to continue using the ES Kit [Api](../api/README.md) class without having to break out to vanilla JavaScript each time you want to make an API call.

To replace a helper, simply import the main `Helpers` object, and assign the replacement function:

```js
import { Helpers } from '@davestewart/es-kit'

// return hits as-is
Helpers.doc = function (hit, source) {
  return hit
}
```

> Note that extending `Helpers` will not overwrite the "individual" `$` style helpers, as decribed above.

## Requests

The request helpers help you build configuration to pass to the Elasticsearch client's methods.


### Sort

The `$sort` helper builds an array that sorts search results.

### Painless

The `$painless` helper converts JavaScript code into Painless-esque code by replacing common keywords, and flattening the script into a single line.

### Script

The `$script` helper builds a script configuration block in the same way that the [Query](queries) helpers build query configurations. 

### Query

The `$query` helper is a special helper designed to convert a hash of values into an Elastic query in a reasonably sensible way.

### Bulk

The `$bulk` helper is designed to build queries for the Bulk APIs without having to revert to the redundant `flatMap`.

### Options

The `$options` helper is designed to create a top level options object using defaults you supply during library initialisation.

## Responses

The response helpers help you simplify the verbose and somewhat inconsistent response formats from the Search and Document APIs. 

### Results

The `$results` helper converts results from the Search or Document API to a consistent format.

### Extract

The `$extract` helper...

### Paginate

The `$paginate` helper paginates results in a consistent and intuitive format.

### Doc

The `$doc` helper extracts individual hits, results or responses to a consistent format.

### Fields

The `$fields` helper remaps document fields to alternate structures as required.

## Development

### Log

The `$log` helper outputs both request and response data as the Api makes its calls.

### Error

The `$error` helper converts the various Elastic error responses to a simple, consistent format.

