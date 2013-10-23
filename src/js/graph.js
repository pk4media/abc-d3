ABCD3['Graph'] = Class.create({
  initialize: function(args) {
    args = args || {};

    // TODO: Error hanlding if no element specified or matched
    this.element = d3.select(args.element);

    this.stacks = args.stacks || [];

    this.renderers = {}; // But don't give yourself away

    // TODO: Get the list of renderers from ABCD3.Renderers
    // Create an instance of each

    this.options = {};

    this.options.step = args.step || null;
    this.options.snap = args.snap || 'left';
    this.options.offset = args.offset || 0;

    this.options.xScale = args.xScale || null;
    this.options.yScale = args.yScale || null;

    this.options.xMin = args.xMin || null;
    this.options.xMax = args.xMax || null;
  },

  width: function() {
    return parseInt(this.element.style('width'), 10);
  },

  height: function() {
    return parseInt(this.element.style('height'), 10);
  },

  xMin: function(min) {
    if (typeof args !== 'undefined') {
      this.options.xMin = min;
    } else {
      min = d3.min(this.stacks.map(function(stack) {
        return stack.xMin();
      }));

      if (typeof this.options.xMin === 'function') {
        min = this.options.xMin(min);
      } else if (typeof this.options.xMin === 'number') {
        min = this.options.xMin;
      }

      return  min;
    }
  },

  xMax: function(max) {
    if (typeof args !== 'undefined') {
      this.options.xMax = max;
    } else {
      max = d3.max(this.stacks.map(function(stack) {
        return stack.xMax();
      }));

      if (typeof this.options.xMax === 'function') {
        max = this.options.xMax(max);
      } else if (typeof this.options.xMax === 'number') {
        max = this.options.xMax;
      }

      return max;
    }
  },

  render: function() {
    this.x = d3.time.scale()
      .domain([this.xMin(), this.xMax()])
      .range(0, this.width());

    this.y = d3.scale.linear()
      .domain([this.yMin(), this.yMax()])
      .range(0, this.height());
  }
});