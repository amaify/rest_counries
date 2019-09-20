import { http } from "./http";
import { ui } from "./ui";
//Show the countries immediately the DOM is loaded
document.addEventListener("DOMContentLoaded", getCountries);

document
  .querySelector(".navigation__themeSwitcher")
  .addEventListener("mouseup", switchTheme);

function getCountries() {
  http
    .get("https://restcountries.eu/rest/v2/all")
    .then(data => {
      ui.showCountries(data);

      //Country Details
      var countries = document.querySelectorAll(".countries__content");
      countries.forEach(country => {
        country.addEventListener("click", e => {
          e.preventDefault();
          data.forEach(dat => {
            if (country.name === dat.name) {
              showDetailsPage();
              ui.showDetails(dat, data);
              ui.getBorders(data, dat);
            }
          });

          // Removing the country's details
          const back = document.querySelector(".back__btn");
          back.addEventListener("click", e => {
            e.preventDefault();
            showHomePage();
          });
        });
      });
      //End of Country Details

      //Search Query
      let inputField = document.getElementById("search");

      if (inputField) {
        inputField.addEventListener("keyup", e => {
          let keyword = e.target.value;
          keyword.toLowerCase();

          let countries = document.querySelectorAll(".countries__content");

          for (let i = 0; i < countries.length; i++) {
            let country = countries[i];
            let cName = country.name;

            if (cName.toLowerCase().indexOf(keyword) > -1) {
              countries[i].style.display = "block";
            } else {
              countries[i].style.display = "none";
            }
          }
        });
      }
      //End of the Search Query

      //Displaying the regions
      const selectRegion = document.querySelector(".form__group--select");
      ui.showRegions(data);
      selectRegion.addEventListener("click", () => {
        const regions = document.querySelector(".form__group--items");
        regions.classList.toggle("showRegion");
      });
      //End of displaying the region
    })
    .catch(err => {
      ui.showError(err);
    });
}

function switchTheme() {
  //Navigation
  let icon = document.querySelector(".navigation__switcher--img use");
  let formIcon = document.querySelector(".form__group--icon");
  let themeSwitch = document.querySelector(".navigation__themeSwitcher");
  let formGroup = document.querySelectorAll(".form__group");

  //Body
  let body = document.querySelector("body");
  let nav = document.querySelector(".navigation");
  let content = document.querySelectorAll(".countries__content");

  //Details Page
  let backBtn = document.querySelector(".back__btn--link");
  let detailText = document.querySelector(".details__items");
  let borders = document.querySelector(".details__items--countries");

  nav.classList.toggle("navigation__theme");
  body.classList.toggle("body__theme");

  icon.classList.toggle("icons");

  content.forEach(con => {
    con.classList.toggle("content__switch");
  });

  formGroup.forEach(grp => {
    grp.classList.toggle("group");
  });

  if (formIcon) {
    formIcon.classList.toggle("toggleIcon");
  }

  if (themeSwitch.innerHTML === "Light Mode") {
    themeSwitch.innerHTML = "Dark Mode";
  } else {
    themeSwitch.innerHTML = "Light Mode";
  }

  backBtn.classList.toggle("btn");

  detailText.classList.toggle("detail__text");

  borders.classList.toggle("toggle__border");
}

function showHomePage() {
  document.querySelector(".countries").style.display = "";
  document.querySelector(".details").style.visibility = "hidden";
  document.querySelector(".section__form").style.display = "block";
}

function showDetailsPage() {
  document.querySelector(".details").style.visibility = "visible";
  document.querySelector(".countries").style.display = "none";
  document.querySelector(".section__form").style.display = "none";
}

window.onload = showHomePage();

// function onScroll() {
//   let form = document.querySelector(".section__form");
//   let sticky = form.offsetTop;

//   if (window.pageYOffset > sticky) {
//     form.classList.add("stick");
//   } else {
//     form.classList.remove("stick");
//   }
// }

// window.onscroll = function() {
//   onScroll();
// };
