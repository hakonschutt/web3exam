/**
 * Controller is responsiable for controlling all application state and actions
 * @return { Object } - Controller
 */
const Controller = (function($) {
  /**
   * Creates ajax request
   * @params { String } - url - Url to request data from
   * @return { Promise }
   */
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
  /**
   * Formates response about pokeemon
   * @params { Object } - data - Response data
   * @return { Object }
   */
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
  /**
   * Formates response about Berry
   * @params { Object } - data - Response data
   * @return { Object }
   */
  const formatBerryResponse = data => {
    return {
      firmness: data.firmness.name,
      flavors: data.flavors.filter(f => f.potency > 0).map(f => f.flavor.name),
      growth_time: data.growth_time,
      max_harvest: data.max_harvest,
      size: data.size
    };
  };
  /**
   * Formates response about Item
   * @params { Object } - data - Response data
   * @return { Object }
   */
  const formatItemResponse = data => {
    return {
      category: data.category.name,
      cost: data.cost,
      effect: data.effect_entries[0].effect,
      img: data.sprites.default
    };
  };
  /**
   * Formates response to data that View can use
   * @params { Int } - id - Pokemon data type id
   * @params { Object } - data - Response data
   * @return { Object }
   */
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
  /**
   * Creates single item click that can be used on feed item click
   * @params { String } - name - Pokemon name
   * @params { String } - url - fetch url
   * @params { Int } - data - Pokemon data type id
   * @return { Function }
   */
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
  /**
   * Removes active class from header components
   */
  const removeActiveClass = () => {
    const DOM = Module.getDOMstrings();

    Module.getData().forEach(item => {
      $(item.ids[0]).removeClass("active");
    });
  };
  /**
   * Initializes click events
   */
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
  /**
   * Public functions
   */
  return {
    /**
     * Initiates application
     */
    init() {
      setupEvents();

      View.setPage("home", removeActiveClass);
    }
  };
})(jQuery);
