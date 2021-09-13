"use strict"

import "./index.scss";
import "./blocks/backlog/backlog"
import {createUserCard, insertUserCard, insertTaskCard, scrollWeek, fillingWeek, clearWeek} from './blocks/calendar/calendar';
import { TaskCard } from './blocks/task-card/task-card';

fetch("https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks")
  .then(response => response.json())
  .then(usersArray => console.log(JSON.stringify(usersArray)));

let usersArray = [
  {"id":1, "username":"user1", "surname":"Петров", "firstName":"Иван", "secondName":""},
  {"id":2, "username":"user2", "surname":"Иванов", "firstName":"Пётр", "secondName":""},
  {"id":3, "username":"user3", "surname":"Васильев", "firstName":"Артём", "secondName":""},
  {"id":4, "username":"user4", "surname":"Кузнецов", "firstName":"Сергей", "secondName":""},
  {"id":5, "username":"user5", "surname":"Некрасов", "firstName":"Артём", "secondName":""}
];

let tasks = [
  {
    "id":"f3ce7090-04df-4405-b560-e3d12b658b7b","subject":"Анализ","description":"",
    "creationAuthor":1,"executor":1,"creationDate":"2021-09-12","planStartDate":"2021-09-12",
    "planEndDate":"2021-09-14","endDate":"2021-09-12","status":1,"order":1
  },
  {
    "id":"0d18f998-f37f-4c04-bcb3-b7456d763c30","subject":"Планирование","description":"",
    "creationAuthor":1,"executor":1,"creationDate":"2021-09-12","planStartDate":"2021-09-13",
    "planEndDate":"2021-09-14","endDate":"2021-09-12","status":1,"order":1
  },
  {
    "id":"acfa110e-bd8a-48bb-87c2-984ebe9142c1","subject":"Проектирование","description":"",
    "creationAuthor":1,"executor":2,"creationDate":"2021-09-12","planStartDate":"2021-09-14",
    "planEndDate":"2021-09-15","endDate":"2021-09-12","status":1,"order":1
  },
  {
    "id":"12e2f6cb-8d72-480d-9495-eacf722912ea","subject":"Разработка","description":"",
    "creationAuthor":1,"executor":3,"creationDate":"2021-09-12","planStartDate":"2021-09-14",
    "planEndDate":"2021-09-17","endDate":"2021-09-12","status":1,"order":1
  },
  {
    "id":"1f12b2d5-ac44-4a42-b8f4-f80eb0c57e4f","subject":"Тестирование","description":"",
    "creationAuthor":1,"executor":null,"creationDate":"2021-09-12","planStartDate":"2021-09-16",
    "planEndDate":"2021-09-17","endDate":"2021-09-12","status":1,"order":1
  }
];

let taskCardArray = [];

for (let task of tasks) {
  taskCardArray.push(new TaskCard(task));
}

addUsers(usersArray);
fillingWeek(taskCardArray[0].startDate);
fillingCalendar(taskCardArray);

let backlog = document.querySelector(".backlog");

backlog.addEventListener("mousedown", function(event) {
  let taskCard = event.target.closest(".task-card");

  if (!taskCard) return

  let cloneTaskCard = taskCard.cloneNode(true);
  taskCard.style.display = "none";

  cloneTaskCard.style.position = "absolute";
  cloneTaskCard.style.zIndex = 1000;
  document.body.append(cloneTaskCard);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    cloneTaskCard.style.left = pageX - cloneTaskCard.offsetWidth / 2 + 'px';
    cloneTaskCard.style.top = pageY - cloneTaskCard.offsetHeight / 2 + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  cloneTaskCard.onmouseup = function(event) {
    document.removeEventListener('mousemove', onMouseMove);
    cloneTaskCard.remove();

    let elementsBelow = document.elementsFromPoint(event.clientX, event.clientY);
    let task = taskCardArray.find(task => task.id === taskCard.id);

    for (let element of elementsBelow) {
      if (element.classList.contains("user-card")) {   
        task.executor = element.dataset.userId;
        addCards(task);

        return;
      } 
    } 
    taskCard.style.display = "flex";
  };
});

let arrowButtons = document.querySelectorAll(".arrow-button");
let firstDay = new Date(taskCardArray[0].startDate.getTime());

for (let arrowButton of arrowButtons) {
  arrowButton.addEventListener("click", scrollWeek(arrowButton, firstDay));
  arrowButton.addEventListener("click", fillingCalendarIIFE(taskCardArray));
}


function addUsers(usersArray) {
  let userRow = 2;

  for (let user of usersArray) {
    let userName = user.surname + " " + user.firstName;
    let userCard = createUserCard(userName, user.id);
  
    insertUserCard(userCard, userRow);
    userRow++;
  }
}

function fillingCalendar(tasks) { 
  for (let task of tasks) {  
      addCards(task);
  }
}

function fillingCalendarIIFE(tasks) { 
  return function() {
    fillingCalendar(tasks)
  } 
}

function addCards(task) {
  let weekDays = document.querySelectorAll(".calendar__week-day");
  let userCard = document.querySelector(`.calendar__user-card[data-user-id='${task.executor}']`);
  
  let dateInterval = (task.endDate - task.startDate) / 8.64e7;
  
  for (let weekDay of weekDays) {
    let date = new Date(task.startDate);

    for (let i = 0; i <= dateInterval; i++) {
      if (new Date(weekDay.dataset.date.split("-")) - date === 0) {
        if (task.executor === null && !document.getElementById(task.id)) {
          let backlog = document.querySelector(".backlog__task-container");
          let taskCard = task.createTaskCard();
      
          backlog.append(taskCard);
          
          return;
        }

        let taskCard = task.createTaskCard();
        insertTaskCard(taskCard, userCard.dataset.row, weekDay.dataset.column);  
      }   

      date.setDate(date.getDate() + 1);
    }           
  }
}