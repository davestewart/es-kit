# Elastic terms

> A glossary of common Elastic terms and what they mean

## Glossary

If you're just getting to grips with Elastic, there's a lot of jargon to remember and it doesn't all map nicely 1:1 with SQL.

The tables below attempt to provide a bit of comparison, a short explanation, and links.

### Database properties

| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Elastic&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SQL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Information                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [index](https://www.elastic.co/blog/what-is-an-elasticsearch-index) (noun) | table                                                        | The collection of documents stored in the database           |
| [document](https://www.elastic.co/guide/en/elasticsearch/reference/current/documents-indices.html) | row                                                          | A collection of properties which contain both your data and metadata about your data. *It is important to understand that the document is NOT simply the data you added to the database, but additional data which is used by the matching algorithms to match your document during a search.* |
| [field](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/mapping-types.html) | column                                                       | A single document property which holds a single piece of searchable data or meta information about the document. |
| [mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html) | schema                                                       | The information which ES uses to determine the datatypes of the fields of actual data. *Mapping can be dynamic (decided by ES) or explicit (decided by you)* |


### Document properties

| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Elastic&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SQL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Information                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [metadata](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-fields.html) | -                                                            | Additional information about the stored document             |
| [_id](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-id-field.html) | row id                                                       | The unique identifier for the document. *Elastic can generate this or you can provide it when you index the document.* |
| [_type](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-type-field.html) | -                                                            | A way of further subcategorising documents within indices **that has been [depreciated](https://www.elastic.co/guide/en/elasticsearch/reference/current/removal-of-types.html#_schedule_for_removal_of_mapping_types) in ES 7.x** |
| [_source](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/mapping-source-field.html) | row                                                          | The entire JSON object that was provided when indexing (creating) the document |
| [_score](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-filter-context.html#relevance-scores) | -                                                            | A way of ranking documents accordinding to their [relevancy](https://www.elastic.co/guide/en/elasticsearch/guide/2.x/scoring-theory.html) |

### Database interaction
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Elastic&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SQL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Information                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------- |
| [Index](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/docs-index_.html) (verb) | `INSERT`                                                     | To add a document to an index |
| [Query](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html) (verb) | `SELECT * FROM table WHERE`                                  |                               |

### Query properties

| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Elastic&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SQL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Information                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [_source](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/search-fields.html) (paramater) | `SELECT` columns                                             | A way to choose which fields from matched documents are returned |
| [query](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl.html) (parameter) | `WHERE` conditions                                           | A JSON object comprising one or more named query clauses (such as `match` or `match_phrase_prefix`) which tell ES what to search for |
| query (clause)                                               | `WHERE` condition                                            | A single query instruction which may be a **leaf** (single) or **compound** (multiple) query |
| leaf query                                                   | `column = value`                                             | A single query instruction which looks for a particular value in a particular field |
| [compound query](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/compound-queries.html) | `AND` / `OR`                                                 | A set of multiple query clauses which may include leaf **or** further nested compound queries |
| [script](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/modules-scripting.html) | `UPDATE` / `WHERE`                                           | A way to programatically read or write document values on a per-match basis |

### Results properties

| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Elastic&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SQL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Information                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------- |
| [_hits](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/search-fields.html) | the selected rows                                            | An object containing the matching documents          |
| [_source](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/search-fields.html) (object) | the selected rows' values                                    | The data that was returned from the matched document |

