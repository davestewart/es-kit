# Elastic API reference

> Links to the official API reference for the subset of APIs ES Kit covers

## APIs

### [Index API](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices.html)

Index management

- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-create-index.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_indices_create) : Create index
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-delete-index.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_indices_delete) : Delete index
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-get-index.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_indices_get) : Get index
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-exists.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_indices_exists) : Exists

### [Search API](https://www.elastic.co/guide/en/elasticsearch/reference/current/search.html)

Search

- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_search) : Search
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-multi-search.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_msearch) : Multi search
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_scroll) : Scroll
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/clear-scroll-api.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_clearscroll) : Clear scroll
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-count.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_count) : Count

### [Document API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs.html)

Single document APIs

- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_index) : Index
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html#docs-index-api-query-params) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_index) : Create
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_get) : Get
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_update) : Update
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_delete) : Delete

Multi-document APIs

- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-get.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_mget) : Multi get
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_bulk) : Bulk
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_deletebyquery) : Delete by query
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_updatebyquery) : Update by query
- [API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html) / [Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_reindex) : Reindex

## Queries

[Full text](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/full-text-queries.html)

- [match](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-match-query.html)
- [match-query](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-match-query-phrase.html)
- [match-query-phrase](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-match-query-phrase-prefix.html)
- [multi-match](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-multi-match-query.html)

Match

- [match-all](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-match-all-query.html)

[Term](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/term-level-queries.html)

- [exists](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-exists-query.html)
- [ids](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-ids-query.html)
- [term](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-term-query.html)
- [terms](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-terms-query.html)
- [prefix](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-prefix-query.html)
- [fuzzy](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-fuzzy-query.html)
- [wildcard](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-wildcard-query.html)
- [regexp](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-regexp-query.html)
- [range](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-range-query.html)

[Compound](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/compound-queries.html)

- [bool](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-bool-query.html)
