$(function () {

  var model = {
    results: [],
    patterns: {},
    init: function () {
      results = []
    },
    addResult: function (value) {
      this.results.push(value);
    },
    getResults: function () {
      return this.results
    },
    reset: function () {
      this.results = [];
      this.patterns = {};
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
    fail: function () {
      model.addResult("F")
      view.render();
    },
    reset: function () {
      model.reset();
      view.render();
    },
    results: function () {
      return model.getResults().join("");
    },
    searchPatterns: function () {
      return new Promise(function (resolve, reject) {
        let results = [...model.getResults()];
        let patterns = {};
        let auxPattern = "";
        let auxMatches = 0;
        for (let i = 4; i < results.length; i++) {
          for (let c = 0; c <= results.length - i; c++) {
            auxPattern = results.splice(c, i);
            auxMatches = model.getResults().join("").match(new RegExp(auxPattern.join(""), "g")).length
            if (auxMatches > 1) {
              if (!(auxPattern.join("") in patterns) && auxPattern[auxPattern.length - 1] != "F") {
                patterns[auxPattern.join("")] = auxMatches;
              }
            }
            results = [...model.getResults()];
          }
        }
        for (var key in patterns) {
          if (patterns.hasOwnProperty(key)) {
            for (let chave in patterns) {
              if (patterns.hasOwnProperty(chave) && chave != key) {
                if (chave.match(key)) {
                  delete patterns[key];
                }
              }
            }
          }
        }
        resolve(patterns);
      })
    },
    handleKeyPress: function (e) {
      e = e || window.event;
      if (e.keyCode == 70) {
        controller.fail();
      } else if (e.keyCode == 83) {
        controller.success();
      }
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
      $('#results').val(controller.results());
      controller.searchPatterns()
        .then(patterns => {
          console.log(patterns);
          for (var key in patterns) {
            // check if the property/key is defined in the object itself, not in parent
            if (patterns.hasOwnProperty(key)) {
                $('#patterns table tbody').append("<tr><td>"+key+"</td><td>"+patterns[key]+"</td></tr>")
            }
        }
        })
    }
  }

  controller.init();
});

