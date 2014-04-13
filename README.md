iron-router-bug
===============

In [client.js](https://github.com/Phosphoros/iron-router-bug/blob/iron-router_bug2/client/client.js) on [line 77](https://github.com/Phosphoros/iron-router-bug/blob/iron-router_bug2/client/client.js#L77), the pizze are fetched. If you now call the method [buy-pizza](https://github.com/Phosphoros/iron-router-bug/blob/iron-router_bug2/server/methods.js#L2), which will update a pizza-object in the mongodb, the router jumps to the next page.
The burgers on [line 28](https://github.com/Phosphoros/iron-router-bug/blob/iron-router_bug2/client/client.js#L28) are referenced by a cursor and work properly regarding the [buy-burger](https://github.com/Phosphoros/iron-router-bug/blob/iron-router_bug2/server/methods.js#L11) method.