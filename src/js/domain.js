ABCD3['Domain'] = {
  auto: function(value) {
    return value;
  },

  startOfDay: function(value) {
    new Date(value).setHours(0, 0, 0, 0);
  }
}