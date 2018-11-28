const View = (function() {
  const getPokemonModalContent = data => {
    const container = $("<div>", { class: "p-1" });
    const wrapper = $("<div>", { class: "row" });

    const imgWrapper = $("<div>", { class: "col-4 p-0" });
    const img = $("<img>", { height: "150", src: data.img });
    imgWrapper.append(img);

    const infoWrapper = $("<div>", { class: "col-8" });

    const infoLabelWrapper = $("<div>", { class: "row" });
    const infoLabel = $("<strong>").text("Info:");
    infoLabelWrapper.append(infoLabel);
    infoWrapper.append(infoLabelWrapper);

    const sizeWrapper = $("<div>", { class: "row" });
    const weightWrapper = $("<div>", { class: "col-md-12 my-2 clearfix" });
    const weightImg = $("<img>", {
      style: "height: 20px; float:left; margin-right:10px;",
      src: "src/assets/weight.png"
    });
    const weightInfo = $("<strong>").text(`${data.weight} kg`);

    weightWrapper.append(weightImg);
    weightWrapper.append(weightInfo);
    sizeWrapper.append(weightWrapper);

    const heightWrapper = $("<div>", { class: "col-md-12 my-2 clearfix" });
    const heightImg = $("<img>", {
      style: "height: 20px; float:left; margin-right:10px;",
      src: "src/assets/height.png"
    });
    const heightInfo = $("<strong>").text(`${data.height} cm`);

    heightWrapper.append(heightImg);
    heightWrapper.append(heightInfo);
    sizeWrapper.append(heightWrapper);
    infoWrapper.append(sizeWrapper);

    const typeLabelWrapper = $("<div>", { class: "row" });
    const typeLabel = $("<strong>").text("Type:");

    typeLabelWrapper.append(typeLabel);
    infoWrapper.append(typeLabelWrapper);

    const typeListWrapper = $("<div>", { class: "row" });

    data.type.forEach(t => {
      typeListWrapper.append(
        $("<div>", { class: "p-1 m-1 bg-info text-white rounded" }).text(t)
      );
    });

    infoWrapper.append(typeListWrapper);

    const abilityLabelWrapper = $("<div>", { class: "row" });
    const abilityLabel = $("<strong>").text("Abilities:");

    abilityLabelWrapper.append(abilityLabel);
    infoWrapper.append(abilityLabelWrapper);

    const abilityListWrapper = $("<div>", { class: "row" });

    data.abilities.forEach(t => {
      abilityListWrapper.append(
        $("<div>", { class: "p-1 m-1 bg-primary text-white rounded" }).text(t)
      );
    });

    infoWrapper.append(abilityListWrapper);

    const moveWrapper = $("<div>", { class: "col-12" });
    const moveLabelWrapper = $("<div>", { class: "row" });
    const moveLabel = $("<strong>").text("Moves:");

    moveLabelWrapper.append(moveLabel);
    moveWrapper.append(moveLabelWrapper);

    const moveListWrapper = $("<div>", { class: "row" });

    data.moves.forEach(t => {
      moveListWrapper.append(
        $("<div>", { class: "p-1 m-1 bg-danger text-white rounded" }).text(t)
      );
    });

    moveWrapper.append(moveListWrapper);

    wrapper.append(imgWrapper);
    wrapper.append(infoWrapper);
    wrapper.append(moveWrapper);
    container.append(wrapper);

    return container;
  };

  const getBerryModalContent = data => {
    const iterator = [
      { title: "Firmness", property: "firmness" },
      { title: "Growth time", property: "growth_time" },
      { title: "Max harvest", property: "max_harvest" },
      { title: "Size", property: "size" }
    ];

    const container = $("<div>", { class: "p-1" });

    iterator.forEach(item => {
      const div = $("<div>", { class: "d-block" });
      const label = $("<label>").text(`${item.title}: `);
      const strong = $("<strong>").text(data[item.property]);

      div.append(label);
      div.append(strong);

      container.append(div);
    });

    container.append($("<hr>"));

    const wrapper = $("<div>");
    const label = $("<label>").text("Flavors: ");
    const list = $("<div>", { class: "row px-2" });

    data.flavors.forEach(item => {
      const div = $("<div>", {
        class: "p-1 m-1 bg-primary text-white center rounded"
      }).text(item);
      list.append(div);
    });

    wrapper.append(label);
    wrapper.append(list);

    container.append(wrapper);

    return container;
  };

  const getItemModalContent = data => {
    const container = $("<div>", { class: "p-1 row" });
    const imgWrapper = $("<div>", { class: "col-4" });
    const img = $("<img>", {
      src: data.img,
      style: "height: 120px"
    });

    imgWrapper.append(img);

    const infoWrapper = $("<div>", { class: "col-8" });

    const category = $("<strong>", {
      style: "display: block; text-align: left"
    }).text(data.category);

    const priceLabel = $("<strong>").text("Price:");
    const priceWrapper = $("<div>", { class: "pl-2 my-2 clearfix" });
    const priceIcon = $("<img>", {
      src: "src/assets/tag.png",
      style: "float:left; margin-right:10px; height: 20px;"
    });
    const price = $("<strong>").text(data.cost);

    priceWrapper.append(priceIcon);
    priceWrapper.append(price);

    const effectLabel = $("<strong>").text("Effect:");
    const effect = $("<p>").text(data.effect);

    infoWrapper.append(category);
    infoWrapper.append($("<hr>"));
    infoWrapper.append(priceLabel);
    infoWrapper.append(priceWrapper);
    infoWrapper.append(effectLabel);
    infoWrapper.append(effect);

    container.append(imgWrapper);
    container.append(infoWrapper);

    return container;
  };

  const getModalBody = (id, data) => {
    switch (id) {
      case 0:
        return getPokemonModalContent(data);
      case 1:
        return getBerryModalContent(data);
      case 2:
        return getItemModalContent(data);
      default:
        return null;
    }
  };

  return {
    setPage(file, cb) {
      $(Module.getDOMstrings().appRoot).load(`content/${file}.html`, () => {
        if (typeof cb === "function") cb();
      });
    },
    addFeedCard(title, onClick) {
      const container = $("<div>", { class: "col-md-3 my-2" });

      const card = $("<a>", {
        class: "card box-shadow",
        style: "cursor: pointer;"
      }).on("click", onClick);

      const body = $("<div>", { class: "card-body text-center" });
      const header = $("<h5>", { class: "card-title mb-0" }).text(title);

      body.append(header);
      card.append(body);
      container.append(card);

      $(Module.getDOMstrings().feedRoot).append(container);
    },
    setFeedAlert(warning) {
      const alert = $("<div>", { class: "alert alert-danger" });
      const header = $("<h4>", { class: "alert-heading" }).text("Ooops!");
      const info = $("<p>").text(warning);

      alert.append(header);
      alert.append(info);

      $(Module.getDOMstrings().feedAlert).html(alert);
    },
    setFeedHeader(data) {
      const container = $("<div>", { class: "clearfix" });
      const img = $("<img>", {
        class: "pl-5 my-5 float-right",
        height: "150",
        src: data.img
      });
      const header = $("<h1>", { class: "display-4" }).text(data.displayName);
      const para = $("<p>", { class: "lead" }).text(data.descriptions);

      container.append(img);
      container.append(header);
      container.append(para);

      $(Module.getDOMstrings().feedHeader).html(container);
    },
    openModal() {
      $(Module.getDOMstrings().modal).modal("show");
    },
    setModalTitle(title) {
      $(Module.getDOMstrings().modalTitle).text(title);
    },
    setModalError(warning) {
      const alert = $("<div>", { class: "alert alert-danger" });
      const info = $("<p>", { class: "mb-0" }).text(warning);

      alert.append(info);

      $(Module.getDOMstrings().modalAlert).html(alert);
    },
    setModalBody(data, itemType) {
      const html = getModalBody(itemType, data);

      $(Module.getDOMstrings().modalBody).html(html);
    }
  };
})();
