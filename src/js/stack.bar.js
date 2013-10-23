ABCD3.Stack.Bar = Class.create(ABCD3.Stack, {
  initialize: function($super, args) {
    $super(args);
  },

  xMin: function($super) {
    $super();
  },

  xMax: function($super) {
    $super();
  },

  yMin: function($super, graph) {

  },

  yMax: function($super, graph) {

  },

  render: function(graph) {
    var aggregate = this.options.aggregate || graph.options.aggregate || d3.sum;
    var step = this.options.step || graph.options.step;
    if (isNaN(step)) {
      throw 'Bar stack step is not a number: ' + JSON.stringify(step);
    }
  }
});

new ABCD3.Stack.Bar({
  series: series
});

new ABCD3.Series({
  data: [{x: 0, y: 1, y1: }]
})