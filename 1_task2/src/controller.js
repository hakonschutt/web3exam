const Controller = (function($) {
  const makeRequest = url => {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: "GET",
        dataType: "JSON",
        url: url
      })
        .done(response => {
          resolve(response);
        })
        .fail(err => {
          reject(err);
        });
    });
  };

  const formatPokemonResponse = data => {
    return {
      weight: data.weight,
      height: data.height,
      img: data.sprites.front_default,
      type: data.types.map(t => t.type.name),
      abilities: data.abilities.map(a => a.ability.name),
      moves: data.moves.map(m => m.move.name)
    };
  };

  const formatBerryResponse = data => {
    return {
      firmness: data.firmness.name,
      flavors: data.flavors.filter(f => f.potency > 0).map(f => f.flavor.name),
      growth_time: data.growth_time,
      max_harvest: data.max_harvest,
      size: data.size
    };
  };

  const formatItemResponse = data => {
    return {
      category: data.category.name,
      cost: data.cost,
      effect: data.effect_entries[0].effect,
      img: data.sprites.default
    };
  };

  const formatResponse = (id, data) => {
    switch (id) {
      case 0:
        return formatPokemonResponse(data);
      case 1:
        return formatBerryResponse(data);
      case 2:
        return formatItemResponse(data);
      default:
        return null;
    }
  };

  const singleItemClick = (name, url, itemId) => event => {
    event.preventDefault();
    View.openModal();
    View.setModalTitle(name);

    makeRequest(url)
      .then(response => {
        const data = formatResponse(itemId, response);
        View.setModalBody(data, itemId);
      })
      .catch(err => {
        View.setModalError(`Could not fetch info about ${name}`);
      });
  };

  const removeActiveClass = () => {
    const DOM = Module.getDOMstrings();

    Module.getData().forEach(item => {
      $(item.ids[0]).removeClass("active");
    });
  };

  const setupEvents = function() {
    const items = Module.getData();

    items.forEach((item, index) => {
      const clickEvent = event => {
        event.preventDefault();

        View.setPage("feed", () => {
          removeActiveClass();
          $(items[index].ids[0]).addClass("active");
          View.setFeedHeader(item);

          makeRequest(item.url)
            .then(response => {
              response.results.forEach(single => {
                View.addFeedCard(
                  single.name,
                  singleItemClick(single.name, single.url, item.id)
                );
              });
            })
            .catch(err => {
              View.setFeedAlert(
                `Could not fetch info about ${item.displayName}`
              );
            });
        });
      };

      item.ids.forEach(id => {
        $(id).on("click", clickEvent);
      });
    });

    $(Module.getDOMstrings().homeBtn).on("click", event => {
      event.preventDefault();
      View.setPage("home", removeActiveClass);
    });
  };

  return {
    init() {
      setupEvents();

      View.setPage("home", removeActiveClass);
    }
  };
})(jQuery);
