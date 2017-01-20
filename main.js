

angular.module('todoApp', ['ui.bootstrap', 'ui.layout'])
  .controller('BodyController', function ($scope) {
      var container = document.getElementById('graph_container');
      // Checks if the browser is supported
      if (!mxClient.isBrowserSupported()) {
          // Displays an error message if the browser is not supported.
          mxUtils.error('Browser is not supported!', 200, false);
      }
      else {

          // Creates the graph inside the given container
          var graph = new mxGraph(container);

          // Enables rubberband selection
          //new mxRubberband(graph);

          // Gets the default parent for inserting new cells. This
          // is normally the first child of the root (ie. layer 0).
          var parent = graph.getDefaultParent();

          // Settings for edges

          // Adds cells to the model in a single step

          var edgeStyle = graph.getStylesheet().getDefaultEdgeStyle();
          console.log(mxConstants.STYLE_EDGE)
          //edgeStyle[mxConstants.STYLE_EDGE] = 'Loop';
          //edgeStyle[mxConstants.STYLE_CURVED] = '1';
          

          graph.getModel().beginUpdate();
          try {
              var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
              var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
              var e1 = graph.insertEdge(parent, null, '', v1, v2);
              var e2 = graph.insertEdge(parent, null, '', v1, v1, mxConstants.STYLE_CURVED+'=1;'+mxConstants.STYLE_EDGE+'=Loop');
          }
          finally {
              // Updates the display
              graph.getModel().endUpdate();
          }
          var toolbox = document.getElementById('toolbox');

          
          wnd = new mxWindow('Test', toolbox, (0.8*container.clientWidth) - 200, 50, 200, null, true, true);
          wnd.setMaximizable(false);
          wnd.setScrollable(false);
          wnd.setResizable(false);
          wnd.setMinimizable(false);
          wnd.setVisible(true);

          console.log(v1);
      }
  });

