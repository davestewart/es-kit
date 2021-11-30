# Elastic 101

## Abstract

If you've not worked with Elasticsearch before, you may find the experience frustrating when search doesn't work like you expect.

This document gives you the high-level overview you may not have had, and shares some strategies and tactics to get going.

## TL;DR

Elastic doesn't *directly* store or search for data using the values you supply; it both stores and searches using a *representation* of the both the data and search terms you supply.

As such the query syntax you expect might work, such as `match` or `match_prefix` does not perform *exact* 1:1 match comparisons against the stored documents (like SQL does) but operates instead on the stored *representations*. If you attempt to perform a `term` match (which to all intents and purposes *is* an exact match) you generally get zero results, because "exact term" !== "stored representation".

The rest of this document will expand on that and get you up to speed.