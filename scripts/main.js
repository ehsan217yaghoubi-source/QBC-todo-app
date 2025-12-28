document.addEventListener("DOMContentLoaded", () => {
  // Theme Switch Btn Handler
  const lightModeBtn = document.querySelector(".light-mode");
  const darkModeBtn = document.querySelector(".dark-mode");

  darkModeBtn.addEventListener("click", () => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "dark");
  });

  lightModeBtn.addEventListener("click", () => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", "light");
  });

  window.addEventListener("load", () => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  // Add Todo Handler

  let todos = [];

  const todosWrapper = document.querySelector(".todos-wrapper");
  const noTask = document.querySelector(".no-task");
  const newTaskContent = document.querySelector(".new-task-content");
  const addNewTodo = document.querySelector(".add-new-todo");
  const addTodoBtn = document.querySelector(".add-todo-btn");
  const priorityTagBtn = document.querySelector(".priority-tag-btn");
  const priorityBtns = document.querySelectorAll(".priority-btn");
  const priorityWrapper = document.querySelector(".priority-wrapper");
  const selectPriority = document.querySelector(".select-priority");
  const selectPriorityText = document.querySelector(".select-priority-text");
  const deletePriority = document.querySelector(".delete-priority");
  const navOpenBtn = document.querySelector(".nav-icon");
  const navCloseBtn = document.querySelector(".nav-close-btn");
  const nav = document.querySelector(".nav");
  const overlay = document.querySelector(".overlay");
  const priorityTagSvg = document.querySelector(".priority-tag-svg");

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function loadTodos() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      todos = JSON.parse(savedTodos);
      renderTodos();
    }
  }

  loadTodos();

  let selectedPriority = "پایین";

  function renderTodos() {
    if (todos.length === 0) {
      noTask.classList.remove("hidden");
      todosWrapper.innerHTML = "";
      return;
    }
    noTask.classList.add("hidden");

    todosWrapper.innerHTML = todos
      .map((todo) => {
        return `
        <div class="relative border border-gray-200 dark:border-none dark:bg-compeletedBg mt-4 rounded-xl">
          <!-- Side Line -->
          <span class="${
            todo.priority === "بالا"
              ? "bg-orange-600"
              : todo.priority === "متوسط"
              ? "bg-orange-300"
              : "bg-emerald-600"
          } absolute w-1 h-19 rounded-tl-lg rounded-bl-lg right-0 top-3.5"></span>
          <!-- Task Content -->
          <div class="flex p-3 md:p-6 gap-x-4">
            <!-- Checkbox -->
            <input type="checkbox" class="accent-blue-600 size-4.5 cursor-pointer">
            <!-- Title & Subtitle & Priority -->
            <div class="flex flex-col gap-y-4">
              <div class="flex flex-col items-start justify-start md:flex-row md:gap-x-3 md:items-center gap-y-1">
                <h3 class="font-YekanBakhSemiBold text-sm md:text-base dark:text-white">${
                  todo.title
                }</h3>
                <span class="${
                  todo.priority === "بالا"
                    ? "text-orange-600 dark:text-red-500 bg-red-200 dark:bg-highPriority"
                    : todo.priority === "متوسط"
                    ? "text-orange-300 bg-orange-100 dark:bg-mediumPriority"
                    : "text-emerald-600 bg-teal-100 dark:bg-lowPriority"
                } py-0.5 px-2 rounded-sm text-xs font-YekanBakhSemiBold">${
          todo.priority
        }</span>
              </div>
              <p class="text-gray-400 font-YekanBakhRegular text-xs md:text-sm">${
                todo.description
              }</p>
            </div>
            <!-- Points & Trash Button & Edit Button -->
            <div class="trash-edit-point-content absolute left-4">
              <!-- Points -->
              <div class="points-btn flex flex-col items-center justify-center space-y-1 md:left-6 md:cursor-pointer">
                <span class="size-1 bg-gray-700 dark:bg-white rounded-full"></span>
                <span class="size-1 bg-gray-700 dark:bg-white rounded-full"></span>
                <span class="size-1 bg-gray-700 dark:bg-white rounded-full"></span>
              </div>
              <!-- Trash & Edit Button -->
              <div
                class="trash-edit-wrapper hidden absolute items-center justify-center border border-gray-200 dark:border-trashEdit dark:bg-trashEditBg rounded-lg top-full left-0 p-1 gap-x-2.5">
                <!-- Trash Button -->
                <svg class="md:cursor-pointer text-trashEdit dark:text-white" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 7H20M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7M10 12L14 16M14 12L10 16"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <!-- Devide -->
                <span class="w-px h-5 bg-gray-200 dark:bg-trashEdit"></span>
                <!-- Edit Button -->
                <svg class="md:cursor-pointer text-trashEdit dark:text-white" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  addNewTodo.addEventListener("click", () => {
    newTaskContent.classList.remove("hidden");
    localStorage.setItem("isAddTaskOpen", "true");
  });

  addTodoBtn.addEventListener("click", () => {
    const todoTitleInput = document.querySelector(".todo-title");
    const todoDescriptionInput = document.querySelector(".todo-description");

    if (!todoTitleInput.value.trim()) return;
    if (!todoDescriptionInput.value.trim()) return;

    const todo = {
      id: Date.now(),
      title: todoTitleInput.value,
      description: todoDescriptionInput.value,
      priority: selectedPriority,
    };

    todos.push(todo);
    saveTodos();

    todoTitleInput.value = "";
    todoDescriptionInput.value = "";

    newTaskContent.classList.add("hidden");
    selectPriority.classList.add("hidden");
    priorityTagBtn.classList.remove("hidden");
    deleteLastPriority();

    renderTodos();
  });

  priorityTagBtn.addEventListener("click", () => {
    priorityTagSvg.classList.toggle("rotate-90");

    priorityWrapper.classList.toggle("hidden");
    priorityWrapper.classList.toggle("flex");
  });

  priorityBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedPriority = btn.textContent;
      priorityWrapper.classList.add("hidden");
      priorityTagBtn.classList.add("hidden");
      selectPriority.classList.remove("hidden");
      selectPriority.classList.add("flex");
      selectPriorityText.textContent = btn.textContent;
      if (btn.textContent === "بالا") {
        selectPriority.classList.add("bg-red-200", "dark:bg-highPriority");
        selectPriorityText.classList.add(
          "text-orange-600",
          "dark:text-red-500"
        );
      } else if (btn.textContent === "متوسط") {
        selectPriority.classList.add("bg-orange-100", "dark:bg-mediumPriority");
        selectPriorityText.classList.add("text-orange-300");
      } else {
        selectPriority.classList.add("bg-teal-100", "dark:bg-lowPriority");
        selectPriorityText.classList.add("text-emerald-600");
      }

      priorityTagSvg.classList.remove("rotate-90");

      if (!selectPriority) return;
    });
  });

  function deleteLastPriority() {
    selectPriority.classList.remove("bg-red-200", "dark:bg-highPriority");
    selectPriorityText.classList.remove("text-orange-600", "dark:text-red-500");
    selectPriority.classList.remove("bg-orange-100", "dark:bg-mediumPriority");
    selectPriorityText.classList.remove("text-orange-300");
    selectPriority.classList.remove("bg-teal-100", "dark:bg-lowPriority");
    selectPriorityText.classList.remove("text-emerald-600");
  }

  todosWrapper.addEventListener("click", (e) => {
    const pointsBtn = e.target.closest(".points-btn");

    if (!pointsBtn) return;

    const trashEditWrappr = pointsBtn.parentElement.querySelector(
      ".trash-edit-wrapper"
    );

    trashEditWrappr.classList.toggle("hidden");
    trashEditWrappr.classList.toggle("flex");
  });

  deletePriority.addEventListener("click", () => {
    selectPriority.classList.add("hidden");
    priorityTagBtn.classList.remove("hidden");
    deleteLastPriority();
  });

  // Aside

  navOpenBtn.addEventListener("click", function () {
    nav.classList.remove("-right-68");
    nav.classList.add("right-5");

    overlay.classList.add("overlay-visible");
  });

  navCloseBtn.addEventListener("click", function () {
    nav.classList.remove("right-5");
    nav.classList.add("-right-68");

    overlay.classList.remove("overlay-visible");
  });

  document.addEventListener("click", (e) => {
    const checkbox = e.target;

    // complete
    if (checkbox.type !== "checkbox") return;

    const taskCard = checkbox.closest(".relative");
    if (!taskCard) return;

    const isInActiveSection = taskCard.closest(".todos-wrapper");
    const isInCompletedSection = taskCard.closest(".Task-Compeleted > div");

    const todayTasksTitle = document.querySelector(
      ".add-task .gap-y-1 span:nth-child(2)"
    );
    const completedTasksTitle = document.querySelector(
      ".Task-Compeleted .gap-y-1 span:nth-child(2)"
    );

    if (isInActiveSection) {
      checkbox
        .closest(".flex")
        ?.querySelector("h3")
        ?.classList.add("line-through");

      const activeTasks = document.querySelectorAll(
        ".todos-wrapper .relative"
      ).length;
      const completedTasks = document.querySelectorAll(
        ".Task-Compeleted > div .relative"
      ).length;

      if (activeTasks === 1) {
        todayTasksTitle.textContent = "تسکی برای امروز نداری!";
      } else {
        todayTasksTitle.textContent = `${
          activeTasks - 1
        } تسک را باید انجام دهید.`;
      }

      completedTasksTitle.textContent = `${
        completedTasks + 1
      } تسک انجام شده است.`;

      checkbox.remove();
      const taskContent = taskCard.querySelector(".flex");
      const newCheckbox = document.createElement("input");
      newCheckbox.type = "checkbox";
      newCheckbox.className = "accent-blue-600 size-4.5 cursor-pointer";
      newCheckbox.checked = true;
      taskContent.insertBefore(newCheckbox, taskContent.firstChild);

      const completedSection = document.querySelector(".Task-Compeleted > div");
      completedSection.appendChild(taskCard);
    } else if (isInCompletedSection) {
      checkbox
        .closest(".flex")
        ?.querySelector("h3")
        ?.classList.remove("line-through");

      const activeTasks = document.querySelectorAll(
        ".todos-wrapper .relative"
      ).length;
      const completedTasks = document.querySelectorAll(
        ".Task-Compeleted > div .relative"
      ).length;

      if (activeTasks === 1) {
        todayTasksTitle.textContent = "1 تسک را باید انجام دهید.";
      } else {
        todayTasksTitle.textContent = `${
          activeTasks + 1
        } تسک را باید انجام دهید.`;
      }

      if (completedTasks === 0) {
        completedTasksTitle.textContent = "هیچ تسک انجام شده‌ای وجود ندارد.";
      } else {
        completedTasksTitle.textContent = `${completedTasks} تسک انجام شده است.`;
      }

      checkbox.remove();
      const taskContent = taskCard.querySelector(".flex");
      const newCheckbox = document.createElement("input");
      newCheckbox.type = "checkbox";
      newCheckbox.className = "accent-blue-600 size-4.5 cursor-pointer";
      taskContent.insertBefore(newCheckbox, taskContent.firstChild);

      const activeSection = document.querySelector(".todos-wrapper");
      activeSection.appendChild(taskCard);
    }
  });
});
