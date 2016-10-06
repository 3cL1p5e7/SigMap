#SigMap
Engine for visualization graphs on [Leaflet's](https://github.com/Leaflet/Leaflet) map with ranging by node's and edge's fields in colors and sizes.
[Sigma.js](https://github.com/jacomyal/sigma.js) and WebGL technology allows to render big data in browser's window.
All you need is change settings.json for your custom visual settings and JSON-file (transformed from .gexf with help of sigma.parsers.gexf.js plugin) and link to this file in settings.json.

###Start
Start your page with url-params (not necessary):
* "name" - link to JSON data file. For example: "name=static/Json/input.json"
* "mode" - mode of visualization: "graph" or "map"

Default params:
* name="input.json"
* mode="map"

Example:
http://localhost:63343/index.html?name=TEST.gexf&mode=graph

Using the graph and mapping is done through an object ```sigma.mode```.
To get the object Sigma JS and activate mode:
```javascript
sigma.mode.getInstance()
sigma.mode.activate('graph' || 'map');
```

###Working
Graph object:
```javascript
sigma.mode.getInstance().graph
```
Edges:
```javascript
sigma.mode.getInstance().graph.edges()
```
Nodes:
```javascript
sigma.mode.getInstance().graph.nodes()
```

###Examples of work with the ranking:
```javascript
    // In this example each node and edge contains 'critical' field.
    // Second param - color range
    // Last param - inversion
    // Edges by colors
    sigma.visual.enableRangeEdgeColor('critical', ['#2fff00', '#f02020'], false)
    sigma.visual.disableRangeEdgeColor();

    // Nodes by colors
    sigma.visual.enableRangeNodeColor('critical', undefined, false)
    sigma.visual.enableRangeNodeColor('critical', ['#2fff00', '#f02020'], false)
    sigma.visual.disableRangeNodeColor()

    // Nodes by sizes
    sigma.visual.enableRangeNodeSize('critical', false)
    sigma.visual.enableRangeNodeSize('critical', true) // min to max
    sigma.visual.disableRangeNodeSize();

    // Edges by sizes
    sigma.visual.enableRangeEdgeSize('critical', false)
    sigma.visual.enableRangeEdgeSize('critical', true) // min to max
    sigma.visual.disableRangeEdgeSize();

    // Toggle node label's visualization mode
    sigma.mode.getInstance().settings('drawLabels', !sigma.mode.getInstance().settings('drawLabels'));
    sigma.mode.getInstance().render();

    // Toggle edge label's visualization mode
    sigma.mode.getInstance().settings('drawEdgeLabels', !sigma.mode.getInstance().settings('drawEdgeLabels'));
    sigma.mode.getInstance().render();
```
