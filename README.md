README: errorlogging

Intercept frontend errors and save them to mongo with the help of stacktrace.js

Also emits error on `$rootScope` to consume elsewhere:

```
$rootScope.$on('error', function(event, error){
  console.log('rootscope', error);
})
```
