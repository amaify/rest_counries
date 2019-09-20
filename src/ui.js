class UI {
  constructor() {
    this.countries = document.querySelector(".countries__wrapper");
    this.detailsWrapper = document.querySelector(".details__items");
    this.regions = document.querySelectorAll(".form__group--item");
    this.cards = document.querySelectorAll(".countries__content");
    this.regionList = document.querySelector(".filter");
  }

  showCountries(countries) {
    let output = "";

    countries.forEach(country => {
      let population = country.population;
      population = this.formatNumbersWithComma(population);

      output += `
            <a href="${country.alpha3Code}" name="${country.name}" id="${country.region}" class="countries__content">
                <div class="countries__content--img">
                    <img src="${country.flag}" alt="${country.name}'s Flag">
                </div>
                <div class="countries__content--details">
                    <h1 class="countries__content--details-heading">${country.name}</h1>
                    <p class="countries__content--details-text"><strong>Population: </strong>${population}</p>
                    <p class="countries__content--details-text"><strong>Region:</strong>${country.region}</p>
                    <p class="countries__content--details-text"><strong>Capital:</strong>${country.capital}</p>
                </div>
            </a>
            `;
    });
    this.countries.innerHTML = output;
  }

  formatNumbersWithComma = num =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  showDetails(detail) {
    event.preventDefault();
    let output = "";

    let population = detail.population;
    population = this.formatNumbersWithComma(population);

    output = `
      <div class="details__items--img">
        <img src="${detail.flag}" alt="Flag">
      </div>
      <div class="details__items--texts">
        <h2 class="details__items--heading">${detail.name}</h2>

        <ul class="details__items--details">
          <li class="details__items--detail"><strong>Native Name: </strong>${
            detail.nativeName
          }</li>
          <li class="details__items--detail"><strong>Population: </strong>${population}</li>
          <li class="details__items--detail"><strong>Region: </strong>${
            detail.region
          }</li>
          <li class="details__items--detail"><strong>Sub Region: </strong>${
            detail.subregion
          }</li>
          <li class="details__items--detail"><strong>Capital: </strong>${
            detail.capital
          }</li>
          <li class="details__items--detail"><strong>Top Level Domain: </strong>${
            detail.topLevelDomain
          }</li>
          <li class="details__items--detail"><strong>Currencies: </strong>${detail.currencies
            .map(c => c.name)
            .join(", ")}</li>
          <li class="details__items--detail"><strong>Languages: </strong>${detail.languages
            .map(l => l.name)
            .join(", ")}</li>
        </ul>

        <div class="details__items--countries">
            <p class="details__items--country-text"><strong>Border Countries: </strong></p>
            <ul class="details__items--country-items">
              ${detail.borders
                .map(b => `<li class="details__items--country-item">${b}</li>`)
                .join("")}
            </ul>
        </div>
      </div>
     `;
    if (this.detailsWrapper) {
      this.detailsWrapper.innerHTML = output;
    }
  }

  getBorders(data, dat) {
    let b = document.querySelectorAll(".details__items--country-item");
    b.forEach(x =>
      x.addEventListener("click", e => {
        e.preventDefault();
        data.forEach(d => {
          if (x.textContent === d.alpha3Code) {
            this.showDetails(d);
            this.getBorders(data, dat);
          }
        });
      })
    );
  }

  showRegions() {
    var regions = this.regions;

    regions.forEach(region => {
      region.addEventListener("click", () => {
        let countries = document.querySelectorAll(".countries__content");
        let dropDown = this.regionList;

        if (region.innerHTML === "All") {
          dropDown.innerHTML = "Filter by Region";
        } else {
          dropDown.innerHTML = region.innerHTML;
        }
        countries.forEach(c => {
          if (region.innerHTML === "All") {
            c.style.display = "block";
          } else {
            if (region.innerHTML === c.id) {
              c.style.display = "block";
            } else {
              c.style.display = "none";
            }
          }
        });
      });
    });
  }

  showError(error) {
    let output;

    output = `
    <div class="error">
      <h2 class="error__text">${error.message}</h2>
    </div>
    `;
    this.countries.innerHTML = output;
  }
}

export const ui = new UI();
