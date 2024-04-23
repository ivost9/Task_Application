        let tasks = [];
        let completedTasks = [];

        function loadTasks() {
            const storedTasks = localStorage.getItem("tasks");
            if (storedTasks) {
                tasks = JSON.parse(storedTasks);
            }
            const storedCompletedTasks = localStorage.getItem("completedTasks");
            if (storedCompletedTasks) {
                completedTasks = JSON.parse(storedCompletedTasks);
            }
            const selectElement = document.getElementById("taskSelect");            
            selectElement.value = "incompleted";
        }

        function saveTasks() {
            localStorage.setItem("tasks", JSON.stringify(tasks));
            localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        }

        function renderTasks() {
            const taskList = document.getElementById("taskList");
            const completedList = document.getElementById("completedList");
            taskList.innerHTML = "";
            completedList.innerHTML = "";

            tasks.forEach((task, index) => {
                const taskElement = createTaskElement(task, index, false);
                taskList.appendChild(taskElement);
            });

            completedTasks.forEach((task, index) => {
                const taskElement = createTaskElement(task, index, true);
                completedList.appendChild(taskElement);
            });

            saveTasks();
        }

        function createTaskElement(task, index, isCompleted) {
            const taskElement = document.createElement("div");
            taskElement.className = "task";
            taskElement.innerHTML = `
                <span>${task}</span>
                <div class="task-actions">
                    <button onclick="toggleCompletion(${index}, ${isCompleted})">
                        <img src="${isCompleted ? 'images/check.png' : 'images/uncheck.png'}"></button>
                    <button onclick="editTask(${index}, ${isCompleted})"><img src="images/edit.png"></button>   
                    <button onclick="deleteTask(${index}, ${isCompleted})"><img src="images/delete.png"></button>
                </div>
            `;
            return taskElement;

        }



        function openModal() {
            document.getElementById("modal").style.display = "block";
        }

        function closeModal() {
            const taskInput = document.getElementById("taskInput");
            taskInput.value = "";
            document.getElementById("modal").style.display = "none";
        }

        function addTask() {
            const taskInput = document.getElementById("taskInput");
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                tasks.push(taskText);
                renderTasks();
                taskInput.value = "";
                closeModal();
            } else {
                alert("Моля въведете задача!");
            }
            if (tasks.length === 0) {
                document.getElementById("empty").style.display = "block";
            }
            else{
                document.getElementById("empty").style.display = "none"
            }
            if(tasks.length===0 && completedTasks.length>0){
                document.getElementById("done").style.display="block";
            }
            else{
                document.getElementById("done").style.display="none";
            }

        }

        function editTask(index, isCompleted) {
            const taskArray = isCompleted ? completedTasks : tasks;
            const newTaskText = prompt("Редактирай задача:", taskArray[index]);
            if (newTaskText !== null) {
                taskArray[index] = newTaskText.trim();
                renderTasks();
            }
        }

        function deleteTask(index, isCompleted) {
            const taskArray = isCompleted ? completedTasks : tasks;
            taskArray.splice(index, 1);
            renderTasks();
            if (tasks.length === 0) {
                document.getElementById("empty").style.display = "block";
            }
            if(document.getElementById("completedList").style.display=="block"){
                document.getElementById("empty").style.display = "none";
            }
            if(tasks.length===0 && completedTasks.length>0){
                document.getElementById("done").style.display="block";
            }
            else{
                document.getElementById("done").style.display="none";
            }

        }

        function toggleCompletion(index, isCompleted) {
            const taskText = isCompleted ? completedTasks[index] : tasks[index];
            if (isCompleted) {
                completedTasks.splice(index, 1);
                tasks.push(taskText);
            } else {
                tasks.splice(index, 1);
                completedTasks.push(taskText);
            }
            renderTasks();
            if (tasks.length === 0) {
                document.getElementById("empty").style.display = "block";
            }
            else {
                document.getElementById("empty").style.display = "none";
            }
            if(tasks.length===0 && completedTasks.length>0){
                document.getElementById("done").style.display="block";
            }
            else{
                document.getElementById("done").style.display="none";
            }
            if (document.getElementById("taskList").style.display=="block") {
                document.getElementById("done").style.display="none";
            }
        }

        function taskSelectChange() {
            var selectElement = document.getElementById("taskSelect");
            var selectedValue = selectElement.value;

            if (selectedValue === "incompleted") {
                showAllTasks();
            } else if (selectedValue === "completed") {
                showCompletedTasks();
            }
        }

        function showAllTasks() {
            document.getElementById("taskList").style.display = "block";
            document.getElementById("completedList").style.display = "none";
            if (tasks.length === 0) {
                document.getElementById("empty").style.display = "block";
                document.getElementById("done").style.display="none";
            }
            else {
                document.getElementById("empty").style.display = "none";
            }
            document.getElementById("done").style.display="none";
        }

        function showCompletedTasks() {
            document.getElementById("taskList").style.display = "none";
            document.getElementById("completedList").style.display = "block";
            document.getElementById("empty").style.display = "none";
            if(tasks.length===0 && completedTasks.length>0){
                document.getElementById("done").style.display="block";
            }
        }

        loadTasks();
        renderTasks();