## Existing Check

Firestore, Polymer 3 mixin to check for check for existing values.

Firestore is case sensitive querying database so there are limitations for offline mode and `where` queries, this add another layer of validation and covers the issues that are created when querying the database for existing values.

Lots to do before this is ready for any usage

* Remove dependency to aroma helper
* Rename method so they are clearly defined
* Rename properties
* Rename events so they are clearly defined
* Refactor code
* Add tests

This feature was used in production on a codebase and worked very well, time to tidy it up and make it reusable.
