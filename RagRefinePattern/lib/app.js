$(function () {

  var model = {
    slides: [],
    selected: 0,
    init: function () {
      results = []
    },
    addResult: function (value) {
      results.push(value);
    },
    getResults: function () {
      return results
    },
    reset: function () {
      results = [];
    }
  };


  var controller = {
    init: function () {
      model.init();
      view.init();
    },
    success: function () {
      model.addResult("S")
      view.render();
    },
    fail: function (index) {
      model.addResult("F")
      view.render();
    },
    reset: function () {
      model.reset();
      view.render();
    },
    results: function() {
      return model.getResults();
    },
    handleKeyPress: function (e) {
      e = e || window.event;
      console.log(e);
    },

  };

  var view = {
    init: function () {
      $('#success').click(() => controller.success());
      $('#fail').click(() => controller.fail());
      $('#reset').click(() => controller.reset());
      document.onkeydown = controller.handleKeyPress;
      view.render();
    },
    cleanUpInterface: function () {
      $('#results').val("");
    },
    render: function () {
      view.cleanUpInterface();
      $('#results').val(controller.results().join(""));
      console.log("results:", controller.results().join(""));
    }
  }

  controller.init();
});