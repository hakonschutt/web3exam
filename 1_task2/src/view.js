const View = (function() {
  return {
    setPage(file, cb) {
      $(Module.getDOMstrings().appRoot).load(`content/${file}.html`, () =>
        cb()
      );
    }
  };
})();
