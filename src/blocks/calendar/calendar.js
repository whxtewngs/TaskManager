export {createUserCard, insertUserCard, insertTaskCard, scrollWeek, fillingWeek, clearWeek};

function createUserCard(userName, id) {
  let userCard = document.createElement("div");

  userCard.innerHTML = `<span class="user-card__user-name">${userName}</span>`;
  userCard.classList.add("user-card", "calendar__user-card");
  userCard.dataset.userId = id;

  return userCard;
}

function insertUserCard(userCard, row) {
  let calendar = document.querySelector(".calendar");

  userCard.style.gridRow = row;
  userCard.dataset.row = row;

  calendar.append(userCard);
}

function insertTaskCard(taskCard, row, column) {
  let taskCell = document.querySelector(`.calendar__task-cell[style="grid-area: ${row} / ${column} / auto / auto;"]`);

  if (taskCell) {
    taskCell.append(taskCard);
  } else {
    taskCell = createTaskCell();
    taskCell.append(taskCard);
    insertTaskCell(taskCell, row, column);
  }
}

function createTaskCell() {
  let taskCell = document.createElement("div");
  taskCell.classList.add("calendar__task-cell");

  return taskCell;
}

function insertTaskCell(taskCell, row, column) {
  let calendar = document.querySelector(".calendar");

  taskCell.style.gridRow = row;
  taskCell.style.gridColumn = column;
  
  calendar.append(taskCell);
}

function scrollWeek(arrowButton, date) {

  return function() {
    clearWeek();

    if (arrowButton.classList.contains("arrow-button_right")) {
      date.setDate(date.getDate() + 7);
    } else {
      date.setDate( Math.ceil(date.getDate() - 7) );
    } 

    fillingWeek(date);
  }
}

function fillingWeek(date) {
  let weekDays = document.querySelectorAll(".calendar__week-day");
  let dayDate = new Date(date.getTime())
  let column = 2;

  for (let day of weekDays) {
    day.classList.remove("calendar__week-day_today");

    day.textContent = dayDate.getDate() + "." + ((dayDate.getMonth() < 9) ? ("0" + (dayDate.getMonth() + 1)) : (dayDate.getMonth() + 1));
    day.dataset.date = dayDate.getFullYear() + "-" + 
                     + (dayDate.getMonth() + 1)
                     + "-" + dayDate.getDate();
    day.dataset.column = column;
    if (
        dayDate.getDate() == (new Date()).getDate() && 
        dayDate.getMonth() == (new Date()).getMonth() && 
        dayDate.getFullYear() == (new Date()).getFullYear()
       ) {
      day.classList.add("calendar__week-day_today");

    }
    
    dayDate.setDate(dayDate.getDate() + 1);
    column++;
  }
}

function clearWeek() {
  let taskCells = document.querySelectorAll(".calendar__task-cell");

  for (let cell of taskCells) {
    cell.innerHTML = "";
  } 
}

