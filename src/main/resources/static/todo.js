$(document).ready(function() {
    const apiUrl = '/api/tasks';


    function loadTasks() {
        $.get(apiUrl, function(tasks) {
            $('#taskList').empty();
            tasks.forEach(task => {
                const taskElement = $('<li></li>').text(task.title).data('id', task.id);
                taskElement.on('click', function() {
                    showTaskModal(task);
                });
                $('#taskList').append(taskElement);
            });
        });
    }

    function showTaskModal(task) {
        $('#taskTitle').text(task.title);
        $('#taskDescription').text(task.description);
        $('#taskModal').show();
    }

    $('.close').on('click', function() {
        $('#taskModal').hide();
    });

    $('#searchInput').on('input', function() {
        const query = $(this).val().toLowerCase();
        $('#taskList li').each(function() {
            const title = $(this).text().toLowerCase();
            $(this).toggle(title.includes(query));
        });
    });

    $('#todayTasksBtn').on('click', function() {
        const today = new Date().toISOString().split('T')[0];
        $.get(apiUrl, function(tasks) {
            $('#taskList').empty();
            tasks.filter(task => task.dueDate === today).forEach(task => {
                const taskElement = $('<li></li>').text(task.title).data('id', task.id);
                $('#taskList').append(taskElement);
            });
        });
    });

    $('#incompleteTasksBtn').on('click', function() {
        $.get(apiUrl, function(tasks) {
            $('#taskList').empty();
            const incompleteTasks = tasks.filter(task => !task.completed);
            incompleteTasks.forEach(task => {
                const taskElement = $('<li></li>')
                    .text(task.title)
                    .data('id', task.id)
                    .on('click', function() {
                        $('#taskTitle').text(task.title);
                        $('#taskDescription').text(task.description);
                        $('#taskModal').fadeIn();
                    });
                $('#taskList').append(taskElement);
            });
        });
    });


    loadTasks();
});

