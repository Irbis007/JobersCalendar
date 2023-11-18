const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();
const hour = new Date().getHours();

let weekCount = 0;
const events = [
  {
    date: new Date(year, month, 18),
    time: {
      start: new Date(year, month, 18, 1, 0),
      end: new Date(year, month, 18, 5, 0),
    },
    vacancy: ["Бариста ID 2292", "Менеджер по продажам ID 2919", "Слесарь ID 1202"],
    candidate: ["Валиков Антон", "Григорьев Роман", "Парфенко Александрz"],
    title: "Собеседование",
    from: "Konstantin",
    candidate: "Roman",
    spot: "",
    descr: "",
    id: createId(),
  },
  {
    date: new Date(year, month - 1, 30),
    time: {
      start: new Date(year, month - 1, 30, 1, 0),
      end: new Date(year, month - 1, 30, 5, 0),
    },
    vacancy: ["Бариста ID 2292", "Менеджер по продажам ID 2919", "Слесарь ID 1202"],
    candidate: ["Валиков Антон", "Григорьев Роман", "Парфенко Александрz"],
    title: "Собеседование",
    from: "Konstantin",
    candidate: "Roman",
    spot: "",
    descr: "",
    id: createId(),
  },
  {
    date: new Date(year, month, 14),
    time: {
      start: new Date(year, month, 14, 1, 0),
      end: new Date(year, month, 14, 1, 30),
    },
    vacancy: ["Бариста ID 2292", "Менеджер по продажам ID 2919", "Слесарь ID 1202"],
    candidate: ["Валиков Антон", "Григорьев Роман", "Парфенко Александрz"],
    title: "Собеседование",
    from: "Konstantin",
    candidate: "Roman",
    spot: "",
    descr: "",
    id: createId(),
  },
  {
    date: new Date(year, month, 12),
    time: {
      start: new Date(year, month, 12, 1, 0),
      end: new Date(year, month, 12, 1, 30),
    },
    vacancy: ["Бариста ID 2292", "Менеджер по продажам ID 2919", "Слесарь ID 1202"],
    candidate: ["Валиков Антон", "Григорьев Роман", "Парфенко Александрz"],
    title: "Собеседование",
    from: "Konstantin",
    candidate: "Roman",
    spot: "",
    descr: "",
    id: createId(),
  },
];

class Calendar {
  constructor(divId) {
    this.divId = divId;
    this.daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    this.months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    const currentDate = new Date();
    this.currMonth = currentDate.getMonth();
    this.currYear = currentDate.getFullYear();
    this.currDay = currentDate.getDate();
  }

  showCurrent(y, m, item) {
    this.showMonth(y, m, item);
  }

  showMonth(y, m, item) {
    const firstDayOfMonth = new Date(y, m, 7).getDay();
    const lastDateOfMonth = new Date(y, m + 1, 0).getDate();
    const lastDayOfLastMonth =
      m === 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

    let years = [];
    for (let i = this.currYear - 5; i < this.currYear + 5; i++) {
      years.push(i);
    }

    let html = "<table>";

    html += "<thead><tr>";
    html += `<td colspan="7"><span class="select-month">
      <span class="month-text">${this.months[m]}</span>
      <div class="month-options">
        ${this.months.map((item) => `<div class="month-option">${item}</div>`).join("")}
      </div>
      </span> / <span class="select-year">
        <span class="year-text">${y}</span>
        <div class="year-options">
        ${years.map((item) => `<div class="year-option">${item}</div>`).join("")}
        </div>
      </span></td>`;
    html += "</tr></thead>";

    html += '<tr class="days">';
    for (let i = 0; i < this.daysOfWeek.length; i++) {
      html += `<td class="day-ofWeek">${this.daysOfWeek[i]}</td>`;
    }
    html += "</tr>";

    let i = 1;
    do {
      let dow = new Date(y, m, i).getDay();

      if (dow === 1) {
        html += "<tr>";
      } else if (i === 1) {
        html += "<tr>";
        let k = lastDayOfLastMonth - firstDayOfMonth + 1;
        for (let j = 0; j < firstDayOfMonth; j++) {
          html += `<td class="not-current datapicker-day">${k}</td>`;
          k++;
        }
      }

      const chk = new Date();
      const chkY = chk.getFullYear();
      const chkM = chk.getMonth();
      if (y === this.currYear && m === this.currMonth && i === this.currDay) {
        html += '<td class="today datapicker-day">' + i + "</td>";
      } else if (chkY === this.currYear && chkM === this.currMonth && i > this.currDay) {
        html += '<td class="normal next-day datapicker-day">' + i + "</td>";
      } else {
        html += '<td class="normal datapicker-day">' + i + "</td>";
      }

      if (dow === 0) {
        html += "</tr>";
      } else if (i === lastDateOfMonth) {
        let k = 1;
        for (dow; dow < 7; dow++) {
          html += `<td class="not-current next-day datapicker-day">${k}</td>`;
          k++;
        }
        if ((dow = 6)) {
          html += "<tr>";
          for (dow; dow < 13; dow++) {
            html += `<td class="not-current next-day datapicker-day">${k}</td>`;
            k++;
          }
          html += "</tr>";
        }
      }

      i++;
    } while (i <= lastDateOfMonth);

    html += `
      <tfoot>
        <tr>
          <td class="last-cell" colspan="7">
            выберите период
          </td>
        </tr>
      </tfoot>
    `;
    html += "</table>";

    item.innerHTML = html;
  }

  renderCalendar(y, m, item) {
    this.showMonth(y, m, item);
    someName();
  }
}

function createId() {
  return Math.random() * (10000 - -10000) + -10000;
}

let rows = [];

const theadElement = document.createElement("thead");

function drawThead() {
  if (theadElement) {
    theadElement.innerHTML = "";
  }
  const tHead = document.createElement("thead");
  const headRow = document.createElement("tr");
  for (let i = 0; i <= 7; i++) {
    const headCell = document.createElement("th");
    const isTimeCell = i === 0;
    const content = isTimeCell
      ? "Время"
      : generateWeeklyCalendar(weekCount)[i - 1].dayOfWeek +
        " " +
        generateWeeklyCalendar(weekCount)[i - 1].date;
    headCell.innerHTML = `
      <div class="cell-head">
        <span class="head-date">${content}</span>
      </div>
    `;
    headRow.append(headCell);
  }
  tHead.append(headRow);
  document.querySelector(".table-body").insertAdjacentElement("afterbegin", tHead);
}

const lastHour = 25;

for (let i = 0; i < lastHour; i++) {
  const row = document.createElement("tr");

  for (let k = 0; k <= 7; k++) {
    const cell = document.createElement("td");

    if (k === 0) {
      const newTime = new Date(year, month, day, i, 0);
      const formattedTime = i === lastHour - 1 ? "00:00" : newTime.toTimeString().slice(0, 5);

      cell.innerHTML = `
        <div class="cell">
          <span class="cell-time">${formattedTime}</span>
        </div>`;
    }

    row.append(cell);
  }

  rows.push(row);
}
drawThead();

const table = document.querySelector("table");
const tbody = document.createElement("tbody");

const selfSelect = document.querySelectorAll(".popup-schedule .select .top");
const selfSelectTime = document.querySelectorAll(".select-time .value");
const selfSelectTimeOptions = document.querySelectorAll(".select-time .options");

table.innerHTML += `
  <div class="arrow prev">
    <img src="./img/CaretRight.png" alt="arrow">
  </div>
`;

table.innerHTML += `
  <div class="arrow next">
    <img src="./img/CaretRight.png" alt="arrow">
  </div>
`;

const weekBtnPrev = document.querySelector(".arrow.prev");
const weekBtnNext = document.querySelector(".arrow.next");

const thead = document.querySelectorAll(".calendar-body thead");
const calendar = new Calendar();

weekBtnPrev.addEventListener("click", () => {
  document.querySelectorAll("thead").forEach((item) => {
    item.innerHTML = "";
    item.remove();
  });
  weekCount--;
  generateWeeklyCalendar(weekCount);
  drawWeekEvents(weekCount);
  drawThead();
  addEventForEventCell();
  giveOrderforEvents();
  document.querySelectorAll(".divCal").forEach((item) => {
    calendar.showCurrent(year, month, item);
  });
});
weekBtnNext.addEventListener("click", () => {
  document.querySelectorAll("thead").forEach((item) => {
    item.innerHTML = "";
    item.remove();
  });
  weekCount++;
  generateWeeklyCalendar(weekCount);
  drawWeekEvents(weekCount);
  drawThead();
  addEventForEventCell();
  giveOrderforEvents();
  document.querySelectorAll(".divCal").forEach((item) => {
    calendar.showCurrent(year, month, item);
  });
});

rows.forEach((item) => {
  tbody.append(item);
});

document.querySelector(".table-body").append(tbody);

accardeonToggle(selfSelect);
accardeonToggle(selfSelectTime);

const scheduleOptions = document.querySelectorAll(".popup-schedule  .option input");

function accardeonToggle(list) {
  list.forEach((item, i) => {
    item.addEventListener("click", () => {
      item.parentElement.classList.toggle("active");
      if (!item.classList.contains("value") && item.children[0].classList.contains("active")) {
        item.children[1].children[0].style.display = "none";
        item.children[1].children[1].style.display = "block";
      } else {
        if (item.children[1] && item.children[1].children[1] && item.children[1].children[0]) {
          item.children[1].children[1].style.display = "none";
          item.children[1].children[0].style.display = "block";
        }
      }
    });
  });
}

let firstDayWeek = new Date(
  year,
  generateWeeklyCalendar(weekCount)[0].month,
  generateWeeklyCalendar(weekCount)[0].date
);
let tbodyWidth = tbody.clientWidth;
let tbodyHeight = tbody.clientHeight - 9;
let cellWidth = tbodyWidth / 8;
const eventCells = document.querySelectorAll(".cell-event");

window.addEventListener("resize", () => {
  tbodyWidth = tbody.clientWidth;
  eventCells.forEach((item, i) => {
    item.remove();
  });
});

const eventInfo = [];

function drawWeekEvents() {
  const firstDayWeek = new Date(
    year,
    generateWeeklyCalendar(weekCount)[0].month,
    generateWeeklyCalendar(weekCount)[0].date
  );
  document.querySelectorAll(".cell-event.event").forEach((item) => item.remove());

  for (const event of events) {
    const eventDay = (event.date.getTime() - firstDayWeek.getTime()) / 1000 / 60 / 60 / 24;
    const left = cellWidth + cellWidth * eventDay;
    const top =
      ((event.time.start.getTime() - event.date.getTime() + 3600000) / 1000 / 60 / 60) * 61;
    const bottom =
      tbodyHeight -
      ((event.time.end.getTime() - event.date.getTime() + 3600000) / 1000 / 60 / 60) * 61 +
      9;

    const lastWeekDay = generateWeeklyCalendar(weekCount)[6].date;
    const calendarlastDayMonth = generateWeeklyCalendar(weekCount)[6].month;
    const firstWeekDay = generateWeeklyCalendar(weekCount)[0].date;
    const calendarFirstDayMonth = generateWeeklyCalendar(weekCount)[0].month;

    if (
      new Date(year, calendarlastDayMonth, lastWeekDay).getTime() >= event.date.getTime() &&
      new Date(year, calendarFirstDayMonth, firstWeekDay).getTime() <= event.date.getTime()
    ) {
      tbody.innerHTML += `
        <div class="cell-event event" style="top: ${top}px; bottom: ${bottom}px; left: ${left}px; width: ${cellWidth}px;">
          <span class="event-time">${getEventTime(event)}</span>
          <span class="event-title">${event.title}</span>
          <span class="event-author">от ${event.from}</span>
        </div>`;
      eventInfo.push(event);
    }
  }
}

drawWeekEvents();

function giveOrderforEvents() {
  document.querySelectorAll(".cell-event.event").forEach((item) => {
    if (item.clientHeight < 55) {
      item.style.alignItems = "center";
      item.style.flexDirection = "row";
      item.children[0].style.order = 2;
      item.children[1].style.order = 1;
      item.children[2].style.display = "none";
    }
  });
}
giveOrderforEvents();

const blocks = document.querySelectorAll(".cell-event");

function updateBlockPositions() {
  blocks.forEach((item, i) => {
    tbodyHeight = tbody.clientHeight;
    cellWidth = tbodyWidth / 8;
    const left = cellWidth + (cellWidth * (eventInfo[i].date - firstDayWeek)) / 1000 / 60 / 60 / 24;
    const top =
      ((eventInfo[i].time.start.getTime() - eventInfo[i].date.getTime() + 3600000) /
        1000 /
        60 /
        60) *
      61;
    const bottom =
      tbodyHeight -
      ((eventInfo[i].time.end.getTime() - eventInfo[i].date.getTime() + 3600000) / 1000 / 60 / 60) *
        61;
    item.style.left = left + "px";
    item.style.top = top + "px";
    item.style.bottom = bottom + "px";
    item.style.width = cellWidth + "px";
  });
}

window.addEventListener("resize", updateBlockPositions);

// SELECT TIME INPUT

selfSelectTimeOptions.forEach((item) => {
  for (let i = 0; i < 24 * 4; i++) {
    const block = document.createElement("div");
    block.classList.add("option");
    const newDate = new Date(year, month, day, 0, i * 15);

    const time = newDate.toTimeString().slice(0, 5);
    block.innerHTML = time;

    item.append(block);
  }
});

const optionsTimeList = document.querySelectorAll(".select-time .options .option");

optionsTimeList.forEach((item) => [
  item.addEventListener("click", () => {
    item.parentElement.parentElement.children[0].classList.add("selected");
  }),
]);
// SET TIME INPUT

const selectNewTimeOptionLeft = document.querySelectorAll(
  ".new-schedule .select-time.left .option "
);
const selectNewTimeOptionRight = document.querySelectorAll(
  ".new-schedule .select-time.right .option "
);
const selectEditTimeOptionLeft = document.querySelectorAll(
  ".edit-schedule .select-time.left .option "
);
const selectEditTimeOptionRight = document.querySelectorAll(
  ".edit-schedule .select-time.right .option "
);

const valueTimeOptionLeft = document.querySelectorAll(".select-time.left .value ");
const valueTimeOptionRight = document.querySelectorAll(".select-time.right .value ");
const calendarPopup = document.querySelectorAll(".calendar-popup");
const showSchedule = document.querySelector(".show-schedule.button");

const popupClose = document.querySelectorAll(".popup-close");

let eventCell = document.querySelectorAll(".event");
const eventPopup = document.querySelector(".event-popup");
const eventEdit = document.querySelector(".event-edit");
const editSchedule = document.querySelector(".edit-schedule");
const canselBtn = document.querySelectorAll(".cansel");
const eventDelete = document.querySelector(".event-delete");
const deleteEvent = document.querySelector(".delete-event");
const deleteEventBtn = document.querySelector(".delete-event .delete");
const schedule = document.querySelector(".schedule");
const weekButton = document.querySelector(".week-button");
const weekCalendar = document.querySelector(".calendar-body");
const showDayCalendar = document.querySelector(".day-button.button");
const dayCalendar = document.querySelector(".calendar-day");
const buttonNewSchedule = document.querySelector(".add-events");
const newSchedulePopup = document.querySelector(".new-schedule");

canselBtn.forEach((item) => [
  item.addEventListener("click", () => {
    item.parentElement.parentElement.parentElement.parentElement.classList.remove("active");
  }),
]);

selectTimeOption(selectNewTimeOptionLeft, valueTimeOptionLeft[1], selfSelectTime[2]);
selectTimeOption(selectNewTimeOptionRight, valueTimeOptionRight[1], selfSelectTime[3]);
selectTimeOption(selectEditTimeOptionLeft, valueTimeOptionLeft[0], selfSelectTime[0]);
selectTimeOption(selectEditTimeOptionRight, valueTimeOptionRight[0], selfSelectTime[1]);

function selectTimeOption(time, value, i) {
  time.forEach((item) => {
    item.addEventListener("click", () => {
      value.innerHTML = item.textContent;
      i.parentElement.classList.remove("active");
    });
  });
}

popupClose.forEach((item, i) => {
  item.addEventListener("click", () => {
    calendarPopup[i].classList.remove("active");
  });
});

// CREATE DAY CALENDAR
const dayCalendarWrapper = document.querySelector(".calendar-day");
const dayTitle = document.querySelector(".calendar-day .top .day");
const dayPrev = document.querySelector(".calendar-day .top .prev");
const dayNext = document.querySelector(".calendar-day .top .next");

let dayTitleShow = day;

dayPrev.addEventListener("click", () => {
  dayTitleShow--;
  compareDayShow();
  renderDayEvents();
});
dayNext.addEventListener("click", () => {
  dayTitleShow++;
  compareDayShow();
  renderDayEvents();
});

function compareDayShow() {
  const date = new Date(year, month, dayTitleShow).getDate();
  const monthNow = new Date().toLocaleString("ru-RU", { month: "long" });
  const monthText = new Date(year, month, dayTitleShow).toLocaleString("ru-RU", { month: "long" });
  if (date == day && monthText == monthNow) {
    dayTitle.innerHTML = "Сегодня";
  } else {
    dayTitle.innerHTML = `${date} ${monthText}`;
  }
}

function renderDayEvents(num) {
  const dayCalendarBody = document.querySelector(".calendar-day .body");
  dayCalendarBody.innerHTML = "";
  const dayRows = [];
  for (let i = 0; i < 24; i++) {
    let row = document.createElement("div");

    row.innerHTML = "";

    const newDate = new Date(year, month, day, i, 0);
    const time = newDate.toTimeString().slice(0, 5);

    row.innerHTML = `
        <div class="day-row">
            <span class="row-time">${time}</span>
            <div class="row-line"></div>
        </div>`;

    dayRows.push(row);
  }

  dayRows.forEach((item) => {
    dayCalendarBody.append(item);
  });
  events.forEach((item) => {
    if (
      item.date.toString().slice(0, 15) ==
      new Date(year, month, dayTitleShow).toString().slice(0, 15)
    ) {
      const eventTitle = item.title;
      const eventFrom = item.from;

      const top = `${((item.time.start - item.date) / 1000 / 60 / 60) * 65 + 32}px`;
      const bottom = `${1560 - ((item.time.end - item.date) / 1000 / 60 / 60) * 65 - 34}px`;

      if (new Date() > item.time.end) {
        dayCalendarBody.innerHTML += `
          <div class="day-event passed event" style="top:${top}; bottom: ${bottom};">
            <div class="event-time">${getEventTime(item)}</div>
            <div class="event-title">${eventTitle}</div>
            <div class="event-from">от ${eventFrom}</div>
          </div>
          `;
      } else {
        dayCalendarBody.innerHTML += `
          <div class="day-event event" style="top:${top}; bottom: ${bottom};">
            <div class="event-time">${getEventTime(item)}</div>
            <div class="event-title">${eventTitle}</div>
            <div class="event-from">от ${eventFrom}</div>
          </div>
          `;
      }
    }
  });

  // ADD TIMELINE
  if (
    new Date().toString().slice(0, 15) ==
    new Date(year, month, dayTitleShow).toString().slice(0, 15)
  ) {
    let top =
      ((new Date().getTime() - new Date(year, month, day).getTime()) / 1000 / 60 / 60) * 65 +
      33 -
      6;

    dayCalendarBody.innerHTML += `
      <div class="day-timeline" style="top:${top}px;"></div> `;
  }
  eventCell = document.querySelectorAll(".event");
  addEventForEventCell();
  document.querySelectorAll(".day-event").forEach((item) => {
    if (item.clientHeight < 48) {
      item.style.flexDirection = "row";
      item.style.justifyContent = "unset";
      item.style.flexWrap = "nowrap";
      item.style.gap = "10px";
      item.children[0].style.order = 2;
      item.children[1].style.order = 1;
      item.children[2].style.order = 3;
    }
  });
}
renderDayEvents();

function addEventForEventCell() {
  eventCell = document.querySelectorAll(".event");
  eventCell.forEach((item) => {
    item.addEventListener("click", () => {
      eventPopup.classList.add("active");
    });
  });
}
addEventForEventCell();
buttonNewSchedule.addEventListener("click", () => {
  newSchedulePopup.classList.add("active");
});

popupTarget(eventEdit, editSchedule, eventPopup);
popupTarget(eventDelete, deleteEvent, eventPopup);
popupTarget(eventEdit, editSchedule, eventPopup);

deleteEventBtn.addEventListener("click", () => {
  deleteEvent.classList.remove("active");
});

weekButton.addEventListener("click", () => {
  pagesToggle(weekButton, weekCalendar);
});

showSchedule.addEventListener("click", () => {
  if (showSchedule.classList.contains("active")) {
    pagesToggle(weekButton, weekCalendar);
    editShowScheduleBtn();
  } else {
    pagesToggle(showSchedule, schedule);
  }
});

showDayCalendar.addEventListener("click", () => {
  pagesToggle(showDayCalendar, dayCalendar);
});

function pagesToggle(btn, page) {
  removeActivePage();
  page.classList.add("active");
  btn.classList.add("active");
  editShowScheduleBtn();
}

function editShowScheduleBtn() {
  if (showSchedule.classList.contains("active")) {
    showSchedule.children[0].style.stroke = "#fff";
    showSchedule.children[1].textContent = "Скрыть расписание";
  } else {
    showSchedule.children[0].style.stroke = "#5898FF";
    showSchedule.children[1].textContent = "Показать расписание";
  }
}
editShowScheduleBtn();

function popupTarget(target, open, close) {
  target.addEventListener("click", () => {
    open.classList.add("active");
    if (close) {
      close.classList.remove("active");
    }
  });
}

function removeActivePage() {
  schedule.classList.remove("active");
  showSchedule.classList.remove("active");
  weekCalendar.classList.remove("active");
  weekButton.classList.remove("active");
  showSchedule.classList.remove("active");
  showDayCalendar.classList.remove("active");
  dayCalendar.classList.remove("active");
}

function getEventTime(event) {
  const eventTime = `${
    event.time.start.getHours() < 10
      ? `0${event.time.start.getHours()}`
      : event.time.start.getHours()
  }:${
    event.time.start.getMinutes() < 10
      ? `0${event.time.start.getMinutes()}`
      : event.time.start.getMinutes()
  }-${
    event.time.end.getHours() < 10 ? `0${event.time.end.getHours()}` : event.time.end.getHours()
  }:${
    event.time.end.getMinutes() < 10
      ? `0${event.time.end.getMinutes()}`
      : event.time.end.getMinutes()
  }`;

  return eventTime;
}

function generateWeeklyCalendar(num) {
  const today = new Date(year, month, day + num * 7);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - ((today.getDay() - 1 + 7) % 7));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  const calendar = [];
  let currentDate = new Date(startOfWeek);

  while (currentDate <= endOfWeek) {
    const dayOfWeek = currentDate.toLocaleDateString("ru-RU", { weekday: "short" });
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    calendar.push({ date, dayOfWeek, month });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return calendar;
}

const editScheduleInpSubject = document.querySelector(".edit-schedule .inp-subject");
const editScheduleInpDate = document.querySelector(".edit-schedule .selected_date");
const editScheduleSelectTimeLeft = document.querySelector(
  ".edit-schedule .select-time.left .value"
);
const editScheduleSelectTimeRight = document.querySelector(
  ".edit-schedule .select-time.right .value"
);
const editSelectVacancyInp = document.querySelector(".edit-schedule .vacancy .select-inp");
const editScheduleVacancyOptions = document.querySelectorAll(
  ".edit-schedule .vacancy .option input"
);
const editSelectCandidateInp = document.querySelector(".edit-schedule .candidate .select-inp");
const editScheduleCandidateOptions = document.querySelectorAll(
  ".edit-schedule .candidate .option input"
);
const editScheduleInpPlace = document.querySelector(".edit-schedule .inp-place");
const editScheduleOptionsWrapper = document.querySelectorAll(".edit-schedule .options-wrapper");
const editScheduleDescr = document.querySelector(".edit-schedule .inp.date-descr");
const editScheduleButtonSave = document.querySelector(".edit-schedule .save");

const newScheduleInpSubject = document.querySelector(".new-schedule .inp-subject");
const newScheduleInpDate = document.querySelector(".new-schedule .selected_date");
const newScheduleSelectTimeLeft = document.querySelector(".new-schedule .select-time.left .value");
const newScheduleSelectTimeRight = document.querySelector(
  ".new-schedule .select-time.right .value"
);
const newSelectVacancyInp = document.querySelector(".new-schedule .vacancy .select-inp");
const newScheduleVacancyOptions = document.querySelectorAll(".new-schedule .vacancy .option input");
const newSelectCandidateInp = document.querySelector(".new-schedule .candidate .select-inp");
const newScheduleCandidateOptions = document.querySelectorAll(
  ".new-schedule .candidate .option input"
);
const newScheduleOptionsWrapper = document.querySelectorAll(".new-schedule .options-wrapper");
const newScheduleInpPlace = document.querySelector(".new-schedule .inp-place");
const newScheduleDescr = document.querySelector(".new-schedule .inp.date-descr");
const newScheduleButtonSave = document.querySelector(".new-schedule .save");

editScheduleButtonSave.addEventListener("click", () => {
  checkScheduleFormValid(editScheduleInpSubject);
  checkScheduleFormValid(editScheduleInpPlace);
  checkScheduleFormValid(editScheduleDescr);
  checkScheduleFormValid(editScheduleInpDate);
  compareSheduleTime(editScheduleSelectTimeLeft, editScheduleSelectTimeRight);
  checkScheduleCheckboxValid(editScheduleVacancyOptions);
  checkScheduleCheckboxValid(editScheduleCandidateOptions);
});
newScheduleButtonSave.addEventListener("click", () => {
  checkScheduleFormValid(newScheduleInpSubject);
  checkScheduleFormValid(newScheduleInpPlace);
  checkScheduleFormValid(newScheduleDescr);
  checkScheduleFormValid(newScheduleInpDate);
  compareSheduleTime(newScheduleSelectTimeLeft, newScheduleSelectTimeRight);
  checkScheduleCheckboxValid(newScheduleVacancyOptions);
  checkScheduleCheckboxValid(newScheduleCandidateOptions);
});

function checkScheduleFormValid(element) {
  if (!element.value || element.value == "") {
    element.style.border = "1px solid red";
  } else if (!element.value || element.value.length) {
    element.style.border = "none";
  }
  if (element.type == "text" && element.textContent == "") {
    element.placeholder = "Заполните это поле";
  } else if (element.type == "text" && element.textContent.length) {
    element.placeholder = "Начните печатать";
  }
  if (element.type == "textarea" && element.textContent == "") {
    element.placeholder = "Поле обязательно для заполнения";
  } else if (element.type == "textarea" && element.textContent.length) {
    element.placeholder =
      "Можете прикрепить полезные ссылки или написать  как пройти к переговорной";
  }
  if (element.type == "date" && !element.value) {
    element.parentElement.style.border = "1px solid red";
  } else if (element.type == "date" && element.value) {
    element.parentElement.style.border = "none";
  }
}

function compareSheduleTime(elem1, elem2) {
  let time1 = +elem1.textContent.slice(0, 2) * 100 + (+elem1.textContent.slice(3, 5) + 1);
  let time2 = +elem2.textContent.slice(0, 2) * 100 + (+elem2.textContent.slice(3, 5) + 1);
  if (time1 >= time2) {
    elem1.style.border = "1px solid red";
    elem2.style.border = "1px solid red";
  } else {
    elem1.style.border = "none";
    elem2.style.border = "none";
  }
}

function checkScheduleCheckboxValid(elem) {
  let count = 0;
  elem.forEach((item, i) => {
    if (item.checked) {
      count++;
    }
  });
  if (!count) {
    elem[0].parentElement.parentElement.parentElement.parentElement.childNodes[1].style.border =
      "1px solid red";
  } else {
    elem[0].parentElement.parentElement.parentElement.parentElement.childNodes[1].style.border =
      "none";
  }
}

editScheduleVacancyOptions.forEach((item, i) => {
  onToggleOptions(item, i, editSelectVacancyInp);
});
editScheduleCandidateOptions.forEach((item, i) => {
  onToggleOptions(item, i, editSelectCandidateInp);
});
newScheduleVacancyOptions.forEach((item, i) => {
  onToggleOptions(item, i, newSelectVacancyInp);
});
newScheduleCandidateOptions.forEach((item, i) => {
  onToggleOptions(item, i, newSelectCandidateInp);
});


let text = ''

function onToggleOptions(item, i, input) {
  item.addEventListener("change", () => {
    if (item.checked) {
      if (text.length) {
        text += `, ${item.parentElement.children[1].textContent}`;
      } else {
        text += `${item.parentElement.children[1].textContent}`;
      }
    } else {
      text = text.split(', ').filter(i => i != item.parentElement.children[1].textContent).join(', ')
    }

    closeOptions(input, text);
  });
}

function closeOptions(item, textProp) {
  document.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("option") &&
      !e.target.classList.contains("options") &&
      !e.target.classList.contains("option-checkbox") &&
      !e.target.classList.contains("select-inp") &&
      !e.target.classList.contains("checkbox-text")
    ) {
      item.parentElement.parentElement.classList.remove("active");
      item.value = textProp || '';
      text = ''
      if (item.value.length) {
        item.classList.add("active");
        item.parentElement.style.border = "1px solid transparent";
      }
    }
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("value")) {
    editScheduleSelectTimeLeft.parentElement.classList.remove("active");
    editScheduleSelectTimeRight.parentElement.classList.remove("active");
    newScheduleSelectTimeLeft.parentElement.classList.remove("active");
    newScheduleSelectTimeRight.parentElement.classList.remove("active");
  }
  if (
    !e.target.closest(".sd-container") &&
    !e.target.closest(".select-year") &&
    !e.target.closest(".select-month")
  ) {
    datePicker.forEach((item, i) => {
      item.style.display = "none";
    });
  }
  if (!e.target.closest(".select-month") && e.target.id != "new-date") {
    document.querySelectorAll(".select-month").forEach((item, i) => {
      item.children[1].classList.remove("active");
    });
  }
  if (!e.target.closest(".select-year") && e.target.id != "new-date") {
    document.querySelectorAll(".select-year").forEach((item, i) => {
      item.children[1].classList.remove("active");
    });
  }
});

const dateText = document.querySelectorAll(".sd-container .text");
const dateValue = document.querySelectorAll(".selected_date");

const dateBtn = document.querySelectorAll(".sd-container");
const dateInp = document.querySelectorAll(".sd-container input");
const datePicker = document.querySelectorAll(".sd-container .datapicker-wrapper");
const closeOptionsBtn = document.querySelectorAll(".popup-schedule .select .top .arrow .close");

closeOptionsBtn.forEach((item, i) => {
  item.addEventListener("click", () => {
    item.parentElement.parentElement.children[0].value = "";
    item.parentElement.parentElement.children[0].classList.remove("active");
    scheduleOptions.forEach((checkbox, idx) => {
      if (idx + 1 <= 3 && i + 1 == 1) {
        checkbox.checked = false;
      } else if (idx + 1 > 3 && idx + 1 <= 6 && i + 1 == 2) {
        checkbox.checked = false;
      } else if (idx + 1 > 6 && idx + 1 <= 9 && i + 1 == 3) {
        checkbox.checked = false;
      } else if (idx + 1 > 9 && idx + 1 <= 12 && i + 1 == 4) {
        checkbox.checked = false;
      }
    });
  });
});

dateBtn.forEach((item, i) => {
  item.addEventListener("click", (e) => {
    datePicker[i].style.display = "block";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const calendar = new Calendar("divCal");
  const currentDate = new Date();
  const currMonth = currentDate.getMonth();
  const currYear = currentDate.getFullYear();
  document.querySelectorAll(".divCal").forEach((item) => {
    calendar.showCurrent(currYear, currMonth, item);
  });
  someName();
});

const currentDate = new Date();
let currMonth = currentDate.getMonth();
let currYear = currentDate.getFullYear();

function someName() {
  const calendar = new Calendar("divCal");

  dateValue.forEach((item, i) => {
    const parentClassList = item.closest(".sd-container").classList[0];
    const datapickerDays = document.querySelectorAll(`.${parentClassList} .datapicker-day`);
    const dateContainer = document.querySelectorAll(".sd-container");
    const dateClose = document.querySelectorAll(".sd-container .open-button .close");

    datapickerDays.forEach((day) => {
      day.addEventListener("click", () => {
        const formattedDay = day.textContent.padStart(2, "0");
        const formattedMonth = (currMonth + 1).toString().padStart(2, "0");
        item.value = `${formattedDay}-${formattedMonth}-${currYear}`;
        dateText[i].textContent = item.value;
        dateContainer[i].classList.add("selected");
        dateContainer[i].style.border = "1px solid transparent";
      });
    });

    dateClose[i].addEventListener("click", (e) => {
      dateContainer[i].classList.remove("selected");
      dateText[i].textContent = "Календарь";
    });
  });

  document.addEventListener("click", (event) => {
    var dropdown = document.querySelectorAll(".select-month");
    var dropdownContent = document.querySelectorAll(".month-options");

    dropdown.forEach((item, i) => {
      if (
        event.target.closest(".select-month") === item &&
        event.target.classList &&
        !event.target.classList.contains("month-option")
      ) {
        dropdownContent[i].classList.add("active");
      }
    });
  });

  document.addEventListener("click", (event) => {
    var dropdown = document.querySelectorAll(".select-year");
    var dropdownContent = document.querySelectorAll(".year-options");

    dropdown.forEach((item, i) => {
      if (
        event.target.closest(".select-year") === item &&
        event.target.classList &&
        !event.target.classList.contains("year-option")
      ) {
        dropdownContent[i].classList.add("active");
      }
    });
  });

  const selectMonth = document.querySelectorAll(".month-option");
  const selectYear = document.querySelectorAll(".year-option");

  selectMonth.forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".divCal").forEach((elem) => {
        calendar.renderCalendar(currYear, monthStringToNumber(item.textContent), elem);
      });
      currMonth = monthStringToNumber(item.textContent);
      item.parentElement.classList.remove("active");
    });
  });
  selectYear.forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".divCal").forEach((elem) => {
        calendar.renderCalendar(item.textContent, currMonth, elem);
      });
      currYear = item.textContent;
      item.parentElement.classList.remove("active");
    });
  });

  function monthStringToNumber(str) {
    const month = [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ];
    const monthNumber = month.indexOf(str.toLowerCase());
    return monthNumber;
  }
}

const inputs = document.querySelectorAll(".popup-schedule input");

inputs.forEach((item) => {
  item.addEventListener("focus", () => {
    item.style.border = "none";
  });
  item.addEventListener("blur", () => {
    if (item.value.length == 0 && !item.classList.contains("select-inp")) {
      item.style.border = "1px solid red";
    } else {
      item.style.border = "none";
    }
  });
});
const textareas = document.querySelectorAll(".popup-schedule textarea");

textareas.forEach((item) => {
  item.addEventListener("focus", () => {
    item.style.border = "none";
  });
  item.addEventListener("blur", () => {
    if (item.value.length == 0) {
      item.style.border = "1px solid red";
    } else {
      item.style.border = "none";
    }
  });
});


const config = {
  attributes: true,
  childList: true,
  subtree: true,
};


const observer = new MutationObserver(() => {
  compareSheduleTime(editScheduleSelectTimeLeft, editScheduleSelectTimeRight);
  compareSheduleTime(newScheduleSelectTimeLeft, newScheduleSelectTimeRight);
});

observer.observe(editScheduleSelectTimeLeft, config);
observer.observe(editScheduleSelectTimeRight, config);
observer.observe(newScheduleSelectTimeLeft, config);
observer.observe(newScheduleSelectTimeRight, config);
