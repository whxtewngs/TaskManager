let backlogHeader = document.querySelector(".backlog__header");
let backlogTitle = backlogHeader.querySelector(".backlog__title");
let searchIcon = backlogHeader.querySelector(".backlog__search-icon");
let searchForm = backlogHeader.querySelector(".backlog__search-form");
let cancelButton = backlogHeader.querySelector(".search-form__cancel");

backlogHeader.addEventListener("click", function (e) {
  if (e.target == searchIcon) {
    searchForm.classList.add("backlog__search-form_open");
    searchIcon.classList.add("backlog__search-icon_hidden");
    backlogTitle.classList.add("backlog__title_hidden");
  } else if (e.target == cancelButton) {
    searchForm.classList.remove("backlog__search-form_open");
    searchIcon.classList.remove("backlog__search-icon_hidden");
    backlogTitle.classList.remove("backlog__title_hidden");
  }
});

