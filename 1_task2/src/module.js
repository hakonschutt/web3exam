const Module = (function() {
  return {
    getData() {
      return [
        {
          id: 0,
          type: "pokemon",
          ids: ["#pokemon-nav-btn", "#pokemon-home-btn", "#pokemon-footer-btn"],
          fetch: "https://pokeapi.co/api/v2/pokemon"
        },
        {
          id: 1,
          type: "berries",
          ids: ["#berries-nav-btn", "#berries-home-btn", "#berries-footer-btn"],
          fetch: "https://pokeapi.co/api/v2/berry"
        },
        {
          id: 2,
          type: "items",
          ids: ["#items-nav-btn", "#items-home-btn", "#items-footer-btn"],
          fetch: "https://pokeapi.co/api/v2/item"
        }
      ];
    },
    getDOMstrings() {
      return {
        appRoot: "#app-root",
        homeRoot: "#home-root",
        homeBtn: "#home-btn"
      };
    }
  };
})();
