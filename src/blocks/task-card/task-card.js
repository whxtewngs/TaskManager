export class TaskCard {

  constructor(task) {
    Object.assign(this, task);

    let startDateArray = task.planStartDate.split("-");
    let endDateArray = task.planEndDate.split("-");

    this.startDate = new Date(startDateArray[0], startDateArray[1] -1, startDateArray[2]);
    this.endDate = new Date(endDateArray[0], endDateArray[1] - 1, endDateArray[2]);
  }

  createTaskCard() {
    let taskCard = document.createElement("div");
  
    taskCard.innerHTML = `<span class="task-card__name">${this.subject}</span>
                          <span class="task-card__description">${this.description}</span>`;
    taskCard.classList.add("task-card");
    taskCard.id = this.id;
  
    if (!this.executor) {
      taskCard.querySelector(".task-card__name").classList.add("text_bold");
      taskCard.classList.add("task-card_theme_backlog");
    } else {
      taskCard.classList.add("task-card_theme_calendar", "calendar__task-card");

      let prompt = document.createElement("div");

      prompt.classList.add("task-card__prompt");
      prompt.innerHTML = `<span class="task-card__creation-date"><strong>Дата создания:</strong> ${this.creationDate}</span>
                          <span class="task-card__start-date"><strong>Дата начала:</strong> ${this.planStartDate}</span>
                          <span class="task-card__end-date"><strong>Дата окончания:</strong> ${this.planEndDate}</span>`;

      taskCard.append(prompt);              
    }
    
    return taskCard;
  }
}


