const taskContainer = document.getElementById('task-container');
const filterProject = document.getElementById('filter-project');
const filterStatus = document.getElementById('filter-status');

let tasks = [];
let projects = [];
let people = [];

// Подключаем твои JSON с GitHub
fetch('https://raw.githubusercontent.com/ТВОЙ-ГИТХАБ/SunTracker/main/tasks.json')
  .then(res => res.json())
  .then(data => { tasks = data; renderTasks(); loadProjects(); });

fetch('https://raw.githubusercontent.com/ТВОЙ-ГИТХАБ/SunTracker/main/projects.json')
  .then(res => res.json())
  .then(data => { projects = data; });

fetch('https://raw.githubusercontent.com/ТВОЙ-ГИТХАБ/SunTracker/main/people.json')
  .then(res => res.json())
  .then(data => { people = data; });

filterProject.addEventListener('change', renderTasks);
filterStatus.addEventListener('change', renderTasks);

function loadProjects() {
  projects.forEach(p => {
    const option = document.createElement('option');
    option.value = p.name;
    option.textContent = p.name;
    filterProject.appendChild(option);
  });
}

function renderTasks() {
  taskContainer.innerHTML = '';
  const projectFilter = filterProject.value;
  const statusFilter = filterStatus.value;

  tasks
    .filter(t => (!projectFilter || t.project === projectFilter))
    .filter(t => (!statusFilter || t.status === statusFilter))
    .forEach(task => {
      const card = document.createElement('div');
      card.className = 'task-card';
      card.innerHTML = `
        <h3>${task.name}</h3>
        <strong>Project:</strong> ${task.project}<br>
        <strong>Status:</strong> ${task.status}<br>
        <strong>Owner:</strong> ${task.owner}<br>
        <strong>Reviewer:</strong> ${task.reviewer}<br>
        <strong>Priority:</strong> ${task.priority}<br>
        <strong>Deadline:</strong> ${task.deadline}<br>
        <a href="${task.dropbox}" target="_blank">Open in Dropbox</a>
      `;
      taskContainer.appendChild(card);
    });
}
