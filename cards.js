// DISPLAY CARDS FUNCTION
function displayCards(data) {
  // create cards DOM

  const rows = document.getElementById("rows");

  rows.innerHTML = "";

  data.forEach((product) => {
    // COLUMNS
    //col is child of row (cbody > card_group > row > col)
    const col = document.createElement("col"); //<div class="col">
    rows.appendChild(col);

    // CARDS
    // card is child of col (cbody > card_group > row > col > card)
    const card = document.createElement("div"); // <div class="card">
    card.classList.add("card");
    card.classList.add("h-100");
    col.appendChild(card);

    // header is child_1 of card (cbody > card_group > row > col > card > header)
    const header = document.createElement("h5"); // <h5 class="card-header">product.brand</h5>
    header.classList.add("card-header");
    header.classList.add("text-uppercase");
    header.innerHTML = product.brand;
    card.appendChild(header);
    // image is child_2 of card (cbody > card_group > row > col > card > header && image)
    const image = document.createElement("img"); // <img src="product.api_featured_image;" class="card-img-top" alt="...">
    image.classList.add("card-img-top");
    image.setAttribute("src", product.api_featured_image);
    card.appendChild(image);

    // CARD-BODY
    // body is child of card (cbody > card_group > row > col > card > header && image && body)
    const body = document.createElement("div"); //<div class="card-body">
    body.classList.add("card-body");
    card.appendChild(body);
    // title is child of body (cbody > card_group > row > col > card > header && image && (body > title && ))
    const title = document.createElement("h5"); //<h5 class="card-title">product.name;</h5>
    title.classList.add("card-title");
    title.innerHTML = product.name;
    body.appendChild(title);

    // subtitle is child of body (cbody > card_group > row > col > card > header && image && (body > title && subtitle ))
    const subtitle = document.createElement("h6"); //<h6 class="card-subtitle mb-2 text-muted">Price: 5.0 $</h6>
    subtitle.classList.add("card-subtitle");
    subtitle.classList.add("mb-2");
    subtitle.classList.add("text-muted");
    subtitle.innerHTML = product.price + " $";
    body.appendChild(subtitle);

    // text is child of body (cbody > card_group> row > col > card > header && image && (body > title && subtitle && text))
    const text = document.createElement("p"); //<p class="card-text">product.description</p>
    text.classList.add("card-text");

    if (product.description.length >= 100) {
      text.innerText = `${product.description.slice(0, 100)}...`;
      text.setAttribute("data-full", product.description);
      var a = document.createElement("a");
      a.textContent = "Read More";
      a.classList.add("text-decoration-underline");
      a.classList.add("link-dark");
      a.classList.add("fw-semibold");
      a.addEventListener("click", function () {
        text.innerText = product.description;
        var btn = document.createElement("button");
        btn.innerHTML = "Close";
        btn.classList.add("btn");
        btn.classList.add("btn-outline-dark");
        text.appendChild(btn);

        btn.addEventListener("click", function () {
          text.innerText = `${product.description.slice(0, 100)}...`;
          text.setAttribute("data-full", product.description);
          var a = document.createElement("a");
          a.textContent = "Read More";
          a.classList.add("text-decoration-underline");
          a.classList.add("link-dark");
          a.classList.add("fw-semibold");
          text.appendChild(a);
        });
      });

      body.appendChild(text);
      text.appendChild(a);
    } else if (product.description.length < 50) {
      text.innerText = product.description;
    }

    body.appendChild(text);

    // TAGS
    const tags = document.createElement("small"); //<small class="text-muted">product.tag_list</small>
    tags.classList.add("text-muted");

    let jointStr = "";
    let separator = ", ";
    product.tag_list.forEach((input, i) => {
      jointStr += input;
      if (i < product.tag_list.length - 1) jointStr += separator;
    });

    tags.innerHTML = "🏷 Tags: " + jointStr.toLowerCase();

    body.appendChild(tags);

    /// CARD-FOOTER_1
    // footer_1 is child of card (cbody > card_group > row > col > card > header && image && body & footer_1)
    const footer_1 = document.createElement("div"); //<div class="card-footer">
    footer_1.classList.add("card-footer");
    //footer_1.innerHTML = "";
    card.appendChild(footer_1);

    // RATING
    const rating = document.createElement("small"); //<small class="text-muted">product.rating</small>
    rating.classList.add("text-muted");
    rating.innerHTML = "Rating: " + product.rating + " out of 5";
    footer_1.appendChild(rating);

    /// CARD-FOOTER_2
    // footer_2 is child of card (cbody > card_group> row > col > card > header && image && body & footer_1 & footer_2)
    const footer_2 = document.createElement("div"); //<div class="card-footer">
    footer_2.classList.add("card-footer");
    //footer_2.innerHTML = "";
    card.appendChild(footer_2);


    // button is child of body (cbody > card_group > row > col > card > header && image && (body > title && subtitle && text && button))
    const button = document.createElement("button"); // <a href="product.product_api_url" class="btn btn-primary">Buy now</a>
    button.classList.add("btn");
    button.classList.add("btn-dark");
    //button.classList.add("position-absolute");
    //button.classList.add("bottom-0");
    //button.classList.add("end-0");
    button.innerHTML = "Buy now";
    button.addEventListener("click", function () {
     window.open(product.website_link, "_blank")
		// location = ("href", product.website_link); // Navigate to new page
     // target= ("_blank");
    });
    footer_2.appendChild(button);
  });
}
