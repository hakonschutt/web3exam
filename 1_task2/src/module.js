const Module = (function() {
  return {
    getData() {
      return [
        {
          id: 0,
          type: "pokemon",
          ids: ["#pokemon-nav-btn", "#pokemon-footer-btn"],
          url: "https://pokeapi.co/api/v2/pokemon/",
          img: "src/assets/pikachu.png",
          displayName: "Pokemon",
          descriptions:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio."
        },
        {
          id: 1,
          type: "berries",
          ids: ["#berries-nav-btn", "#berries-footer-btn"],
          url: "https://pokeapi.co/api/v2/berry/",
          img: "src/assets/razz-berry.png",
          displayName: "Berries",
          descriptions:
            "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae."
        },
        {
          id: 2,
          type: "items",
          ids: ["#items-nav-btn", "#items-footer-btn"],
          url: "https://pokeapi.co/api/v2/item/",
          img: "src/assets/potion.png",
          displayName: "Items",
          descriptions:
            "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful."
        }
      ];
    },
    getDOMstrings() {
      return {
        appRoot: "#app-root",
        homeRoot: "#home-root",
        feedRoot: "#feed",
        feedHeader: "#feed-header",
        feedAlert: "#feed-alert",
        homeBtn: "#home-btn",
        modal: "#modal",
        modalTitle: "#modal-title",
        modalBody: "#modal-body",
        modalAlert: "#modal-alert"
      };
    }
  };
})();
