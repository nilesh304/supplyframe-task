var favorites = Object.keys(localStorage);

function removeFromFavorite(id) {
  localStorage.removeItem(id);
}

const getFavoriteCharacters = async () => {
  const response = await fetch("/get-characters?id=" + favorites.join("&id="));
  const myJson = await response.json(); //extract JSON from the http response
  var container = document.getElementById("characters-container");

  var loader = document.getElementById("loader");
  loader.style.display = "none";
  myJson.results.forEach(function (element) {
    var character_card = document.createElement("div");
    character_card.className = "card character-card";

    var character_card_img_holder = document.createElement("div");
    character_card_img_holder.className = "character-card-image";

    var image = document.createElement("img");
    image.src = element.image.small_url;
    image.className = "card-img-top";
    image.style.height = "316px";

    character_card_img_holder.append(image);

    character_card.appendChild(character_card_img_holder);

    var dot_holder = document.createElement("div");
    dot_holder.style = "display: inline; align-self: end; margin-right: 8px;";
    var sp = document.createElement("span");
    sp.className = "dot";
    dot_holder.appendChild(sp);
    dot_holder.append("\u00A0");
    dot_holder.appendChild(sp.cloneNode(true));
    dot_holder.append("\u00A0");
    dot_holder.appendChild(sp.cloneNode(true));

    character_card.appendChild(dot_holder);

    var flip_card = document.createElement("div");
    flip_card.className = "flip-card";

    var flip_card_inner = document.createElement("div");
    flip_card_inner.className = "flip-card-inner";

    var flip_card_front = document.createElement("div");
    flip_card_front.className = "flip-card-front";

    var flip_card_back = document.createElement("div");
    flip_card_back.className = "flip-card-back";

    flip_card_front.appendChild(character_card);
    flip_card_inner.appendChild(flip_card_front);

    var back_side = document.createElement("div");
    back_side.className = "card character-card";
    back_side.style.height = "100%";

    var text_on_back_card = document.createElement("div");
    text_on_back_card.className = "text-on-back-card";
    text_on_back_card.style = "width: fit-content;margin: auto;";

    var heart_img = document.createElement("img");
    heart_img.src = "/images/heart_filled.png";
    heart_img.className = "heart-img";
    heart_img.id = element.id;
    heart_img.onclick = function name(params) {
      removeFromFavorite(params.target.id);
      flip_card.style.display = "none";
    };

    text_on_back_card.append(heart_img);

    var view_more = document.createElement("a");
    view_more.href = "/character?id=4005-" + element.id;
    view_more.innerHTML = "View More";
    view_more.style = "-webkit-text-stroke: 2px black;color:inherit";

    text_on_back_card.append(view_more);

    back_side.append(text_on_back_card);

    flip_card_back.appendChild(back_side);
    flip_card_inner.appendChild(flip_card_back);

    flip_card.appendChild(flip_card_inner);

    var character_card_info = document.createElement("div");
    character_card_info.className = "character-card-info";
    character_card_info.style.marginLeft = "5px";
    character_card_info.style.marginBottom = "1.5%";

    var character_card_name = document.createElement("div");
    character_card_name.className = "character-card-name-0";

    var character_card_details = document.createElement("div");
    character_card_details.className = "character-card-details";
    var br = document.createElement("br");

    character_card_details.innerHTML =
      "Origin: " +
      element.origin.name +
      " <br /> Comic: " +
      element.publisher.name;
    // character_card_details.append(br)

    character_card_name.innerHTML = element.name;
    character_card_info.appendChild(character_card_name);
    character_card_info.appendChild(character_card_details);

    flip_card_front.append(character_card_info);

    container.appendChild(flip_card);
  });
};
getFavoriteCharacters();
