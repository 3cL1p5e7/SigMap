;(function() {
  'use strict';
  sigma.visual_settings = {
    border: {
      border_width_per: 0.3
    },
    node: {
      label: 'label',
      defaultColor: '#3482B9',
      transparency: 1.0,
      rangers:{
        sizing:{
          field: 'critical'
        },
        coloring:{
          field: 'critical',
          range: ['#ffffff', '#f02020']
        }
      },
      min_size: 6,
      max_size: 12
    },
    edge:{
      label: 'label',
      arrowSize: 8.0,
      transparency: 1.0,
      defaultColor: '#3482B9',
      rangers:{
        sizing:{
          field: 'critical'
        },
        coloring:{
          field: 'critical',
          range: ['#ffffff', '#f02020']
        }
      },
      min_size: 1,
      max_size: 5
    }
  };
  sigma.visual = {
    inverseColorNode: false,
    inverseSizeNode: false,

    rangeColorNode: false,
    rangeSizeNode: false,

    inverseColorEdge: false,
    inverseSizeEdge: false,

    rangeColorEdge: false,
    rangeSizeEdge: false,

    colorRangerField: 'color_ranger', // custom field for SHADER
    sizeRangerField: 'size', // general field of SigmaJS

    labelField: 'label',
    mask: 'value',

    enable: function(){
      // coloring enables by renderer
      // because coloring realized in shaders WebGL

      // sizing
      if(this.rangeSizeNode)
        this.enableRangeNodeSize();
      if(this.rangeSizeEdge)
        this.enableRangeEdgeSize();
    },

    enableRangeNodeColor: function (field, range, inverse) {
      var current_coloring = sigma.visual_settings.node.rangers.coloring;

      if(field)
        current_coloring.field = field;
      if(range)
        current_coloring.range = range;

      if(!current_coloring.field || !current_coloring.range)
        return;

      var nodes = sigma.mode.getInstance().graph.nodes();
      for (var i = 0; i < nodes.length; i++) {
        var val = parseFloat(sigma.utils.getMaskedValue(nodes[i], this.mask, current_coloring.field));
        nodes[i][this.colorRangerField] = isNaN(val) ? 0 : val;
      }

      this.rangeColorNode = true;
      this.inverseColorNode = typeof inverse == 'undefined' ? this.inverseColorNode : Boolean(inverse);
      sigma.mode.getInstance().refresh({skipIndexation: true});
    },
    disableRangeNodeColor: function () {
      this.rangeColorNode = false;
      this.inverseColorNode = false;
      sigma.mode.getInstance().refresh({skipIndexation: true});
    },

    enableRangeNodeSize: function(field, inverse) {
      var current_sizing = sigma.visual_settings.node.rangers.sizing;
      if(field)
        current_sizing.field = field;

      if(!current_sizing.field)
        return;

      var getSize;
      var self = this;

      this.inverseSizeNode = typeof inverse == 'undefined' ? this.inverseSizeNode : Boolean(inverse);
      if(this.inverseSizeNode){
        getSize = function(node, ids){
          if(typeof ids != 'undefined' && !ids[node.id]) {
            return sigma.visual_settings.node.max_size;
          }
          var size = sigma.utils.getMaskedValue(node, self.mask, current_sizing.field)
                      || sizing.defaultValue;
          size = sigma.visual_settings.node.min_size +
            (sigma.visual_settings.node.max_size - sigma.visual_settings.node.min_size) * (sizing.max - size) / (sizing.max - sizing.min);
          return size;
        };
      }
      else{
        getSize = function(node, ids){
          if(typeof ids != 'undefined' && !ids[node.id]) {
            return sigma.visual_settings.node.min_size;
          }
          var size = sigma.utils.getMaskedValue(node, self.mask, current_sizing.field)
              || sizing.defaultValue;
          size = sigma.visual_settings.node.min_size +
            (sigma.visual_settings.node.max_size - sigma.visual_settings.node.min_size) * (size - sizing.min) / (sizing.max - sizing.min);
          return size;
        };
      }

      var nodes = sigma.mode.getInstance().graph.nodes();
      var sizing = sigma.utils.getFieldBounds(current_sizing.field, nodes);
      for(var i=0; i<nodes.length; i++) {
        nodes[i][this.sizeRangerField] = getSize(nodes[i]);
      }
      sigma.mode.getInstance().refresh({skipIndexation: true});
    },
    disableRangeNodeSize: function() {
      var nodes = sigma.mode.getInstance().graph.nodes();
      for(var i=0; i<nodes.length; i++) {
        nodes[i][this.sizeRangerField] = sigma.visual_settings.node.min_size;
      }
      this.inverseSizeNode = false;
      sigma.mode.getInstance().refresh({skipIndexation: true});
    },

    enableRangeEdgeColor: function (field, range, inverse) {
      var current_coloring = sigma.visual_settings.edge.rangers.coloring;
      if(field)
        current_coloring.field = field;
      if(range)
        current_coloring.range = range;

      if(!current_coloring.field || !current_coloring.range)
        return;

      var edges = sigma.mode.getInstance().graph.edges();
      for (var i = 0; i < edges.length; i++) {
        var val = parseFloat(sigma.utils.getMaskedValue(edges[i], this.mask, current_coloring.field));
        edges[i][this.colorRangerField] = isNaN(val) ? 0 : val;
      }

      this.rangeColorEdge = true;
      this.inverseColorEdge = typeof inverse == 'undefined' ? this.inverseColorEdge : Boolean(inverse);
      sigma.mode.getInstance().refresh({skipIndexation: true});
    },
    disableRangeEdgeColor: function () {
      this.rangeColorEdge = false;
      this.inverseColorEdge = false;
      sigma.mode.getInstance().refresh({skipIndexation: true});
    },

    enableRangeEdgeSize: function(field, inverse) {
      var current_sizing = sigma.visual_settings.edge.rangers.sizing;
      if(field)
        current_sizing.field = field;

      if(!current_sizing.field)
        return;

      var getSize;
      var self = this;
      this.inverseSizeEdge = typeof inverse == 'undefined' ? this.inverseSizeEdge : Boolean(inverse);
      if(this.inverseSizeEdge){
        getSize = function(edge){
          var size = sigma.utils.getMaskedValue(edge, self.mask, current_sizing.field)
              || sizing.defaultValue;
          size = sigma.visual_settings.edge.min_size +
            (sigma.visual_settings.edge.max_size - sigma.visual_settings.edge.min_size) * (sizing.max - size) / (sizing.max - sizing.min);
          return size;
        };
      }
      else{
        getSize = function(edge){
          var size = sigma.utils.getMaskedValue(edge, self.mask, current_sizing.field)
              || sizing.defaultValue;
          size = sigma.visual_settings.edge.min_size +
            (sigma.visual_settings.edge.max_size - sigma.visual_settings.edge.min_size) * (size - sizing.min) / (sizing.max - sizing.min);
          return size;
        };
      }

      var edges = sigma.mode.getInstance().graph.edges();
      var sizing = sigma.utils.getFieldBounds(current_sizing.field, edges);

      for(var i=0; i<edges.length; i++) {
        edges[i][this.sizeRangerField] = getSize(edges[i]);
      }
      sigma.mode.getInstance().refresh({skipIndexation: true});
    },
    disableRangeEdgeSize: function() {
      var edges = sigma.mode.getInstance().graph.edges();
      for(var i=0; i<edges.length; i++) {
        edges[i][this.sizeRangerField] = sigma.visual_settings.edge.min_size;
      }
      this.inverseSizeEdge = false;
      sigma.mode.getInstance().refresh({skipIndexation: true});
    },

    enableNodeLabels: function(field, isDraw){
      if(field)
        sigma.visual_settings.node.label = field;

      if(!sigma.visual_settings.node.label)
        return;
      var nodes = sigma.mode.getInstance().graph.nodes();
      for (var i = 0; i < nodes.length; i++) {
        var label = sigma.utils.getMaskedValue(nodes[i], this.mask, sigma.visual_settings.node.label);
        nodes[i][this.labelField] = (label != undefined ? label : '').toString();
      }
      if(s && isDraw) {
        sigma.mode.getInstance().settings('drawLabels', true);
        sigma.mode.getInstance().render(); // nodes
      }
    },
    disableNodeLabels: function () {
      sigma.mode.getInstance().settings('drawLabels', false);
      sigma.mode.getInstance().render(); // nodes
    },

    enableEdgeLabels: function(field, isDraw){
      if(field)
        sigma.visual_settings.edge.label = field;

      if(!sigma.visual_settings.edge.label)
        return;
      var edges = sigma.mode.getInstance().graph.edges();
      for (var i = 0; i < edges.length; i++) {
        var label = sigma.utils.getMaskedValue(edges[i], this.mask, sigma.visual_settings.edge.label);
        edges[i][this.labelField] = (label != undefined ? label : '').toString();
      }
      if(s && isDraw) {
        sigma.mode.getInstance().settings('drawEdgeLabels', true);
        sigma.mode.getInstance().render(); // edges
      }
    },
    disableEdgeLabels: function () {
      sigma.mode.getInstance().settings('drawEdgeLabels', false);
      sigma.mode.getInstance().render(); // nodes
    },

    utils: {
      evaluateBounds: function (elements, bounds, minmax) {
        var getSize = function(element){
          var size = element.size;
          if (!size)
            return minmax[0];
          size = minmax[0] +
            (minmax[1] - minmax[0]) * (size - bounds[0]) / (bounds[1] - bounds[0]);
          return size;
        };

        for(var i=0; i < elements.length; i++) {
          elements[i].size = getSize(elements[i]);
        }
      }
    }
  };
})();