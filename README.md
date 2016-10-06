#SigMap
Графовый движок, предназначенный для визуализации графов на карте с последующим их ранжированием по цветам и размерам.
Благодаря [sigma.js](https://github.com/jacomyal/sigma.js) и кастомным WebGL-рендерщикам приложение позволяет отрисовывать большое количество узлов и ребер.
Имеется режим "граф" и режим "карта", а также переключение между ними, пока, на уровне консоли.

Все, что необходимо - положить преобразованный в JSON файл GEXF в любое место и в файле settings.json указать путь до него и необходимые настройки.

###Запуск
Запускать с URL-параметрами (необязательно):
* "name" - в котором содержится путь до файла gexf. Например: "name=TEST.gexf"
* "mode" - режим отображения: "graph" или "map"

Например:
http://localhost:63343/index.html?name=TEST.gexf&mode=graph

Если параметры будут пусты, то по-умолчанию используется:
* name="input.gexf"
* mode="map"

Работа с графом и отображением ведется через объект "sigma.mode".
Чтобы получить объект SigmaJS и активировать режим: 
```javascript
sigma.mode.getInstance()
sigma.mode.activate('graph' || 'map');
```

###Работа с данными:
Объект графа:
```javascript
sigma.mode.getInstance().graph
```
Ребра:
```javascript 
sigma.mode.getInstance().graph.edges()
```
Узлы:
```javascript
sigma.mode.getInstance().graph.nodes()
```
Возвращаются ссылки на данные.

###Примеры работы с ранжированием в online режиме:
```javascript
    // Последний параметр отвечает за инверсию
    // Ребра по цветам
    sigma.visual.enableRangeEdgeColor('critical', ['#2fff00', '#f02020'], false)
    sigma.visual.disableRangeEdgeColor();

    // Узлы по цветам
    sigma.visual.enableRangeNodeColor('year', undefined, false)
    sigma.visual.enableRangeNodeColor('year', ['#2fff00', '#f02020'], false)
    sigma.visual.disableRangeNodeColor()

    // Узлы по размеру
    sigma.visual.enableRangeNodeSize('year', false)
    sigma.visual.enableRangeNodeSize('critical', false)

    // Ребра по размеру
    sigma.visual.enableRangeEdgeSize('critical', false)
    sigma.visual.enableRangeEdgeSize('summary_current_flow', false)

    // Лейблы
    sigma.mode.getInstance().settings('drawLabels', !sigma.mode.getInstance().settings('drawLabels'));
    sigma.mode.getInstance().render(); // nodes
    sigma.mode.getInstance().settings('drawEdgeLabels', !sigma.mode.getInstance().settings('drawEdgeLabels'));
    sigma.mode.getInstance().render(); // edges
```
