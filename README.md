iron-router-progress-bug
===============

If you change the route, the last data is removed first which causes a template rerendering. In my example, if no burgers or pizze exist,
the page tells you.
**This doesn't happen without iron-router-progress.**
**The bug described in the branch iron-router_bug doesn't occur here!**
