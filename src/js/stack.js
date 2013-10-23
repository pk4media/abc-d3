ABCD3.Stack = Class.create({
  initialize: function(args) {
    this.series = args.series || [];

    this.options.aggregate = args.aggregate || null;
    this.options.step = args.step || null;
  },

  xMin: function() {
    return d3.min(this.series.map(function(series) {
      return d3.min(series.data.map(function(data) {
        return data.x;
      }));
    }));
  },

  xMax: function() {
    return d3.max(this.series.map(function(series) {
      return d3.max(series.data.map(function(data) {
        return data.x
      }));
    }));
  },

  yMin: function(graph) {
    var aggregate = this.options.aggregate || graph.options.aggregate || d3.sum

    return d3.min(this.series.map(function(series) {
      return d3.min(series.data.map(function(data) {
        return data.y;
      }));
    }));
  },

  yMax: function(graph) {
    return d3.max(this.series.map(function(series) {
      return d3.max(series.data.map(function(data) {
        return data.y;
      }));
    }));
  },

  data: function(graph) {
    var stack = this,
        stepLength = this.options.step || graph.options.step,
        snap = this.options.snap || graph.options.snap || 'left',
        aggregate = this.options.aggregate || graph.options.aggregate || d3.sum,
        xMin = this.xMin(),
        xMax = this.xMax(),
        offset = 0;

    if (typeof this.options.offset === 'number') {
      offset = this.options.offset;
    } else if (typeof graph.options.offset === 'number')
      offset = graph.options.offset;
    }

    if (typeof stepLength === 'number' && stepLength > 0) {
      var data = [],
          stepMin,
          stepMax,
          stepCount,
          domainLength;

      // Decide whether the step domain calculations should be based on the min or max value
      if (snap === 'max') {
        // Ensure there is a whole step containing the min value
        stepMax = xMax + (data.stepLength - d3.min([offset, 0]) % stepLength);

        domainLength = stepMax - xMin;
        stepMin = xMin - (data.stepLength - domainLength % stepLength);
      } else {
        // Ensure there is a whole step containing the max value
        stepMin = xMin - (data.stepLength - d3.max([offset, 0]) % stepLength);

        domainLength = xMax - stepMin;
        stepMax = xMax + (data.stepLength - domainLength % stepLength);
      }

      stepCount = Math.floor((stepMax - stepMin) / stepLength) + 1;

      stackData = d3.range(data.stepCount).map(function(value, index) {
        return {
          x: stepMin + (stepLength * index),
          series: stack.series.map(function(series) {
            return {
              color: series.color,
              aggregate: series.aggregate,
              y: null,
              y0: 0,
              data: []
            };
          });
        }
      });

      var stepScale = d3.scale.linear()
        .domain([data.stepMin, data.stepMax])
        .range([0, stepCount - 1])
        .uninterpolate(d3.uninterpolateSteppedFloor(stepLength))
        .interpolate(d3.interpolateRound);

      stack.series.forEach(function(series, index) {
        series.data.forEach(function(data) {
          stackData[stepScale(data.x)][index].data.push(d);
        });
      });

      // Aggregate the accumulated data
      stackData.forEach(function(data) {
        data.series.forEach(function(series, ) {
          series.y = series.aggregate(series.data, function(d) {
            return d.y;
          });

          series.y0 = data.series.reduce
        });
      });

      // This bit will need to be in the specific version
      //graph.element.append('g')
      //  .selectAll('rect')
      //  .data(stackData)
      //  .
    }
  }
});