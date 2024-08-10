document.addEventListener('DOMContentLoaded', function() {
    const dashboard = document.querySelector('.dashboard');
    const resetButton = document.getElementById('reset');
    
    let draggedWidget = null;

    // Handle drag start
    dashboard.addEventListener('dragstart', function(event) {
        draggedWidget = event.target.closest('.widget'); // Ensure the dragged item is a .widget
        event.target.style.opacity = 0.5;
    });

    // Handle drag end
    dashboard.addEventListener('dragend', function(event) {
        event.target.style.opacity = 1;
        draggedWidget = null;
    });

    // Allow dropping by preventing default behavior
    dashboard.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    // Handle drop
    dashboard.addEventListener('drop', function(event) {
        event.preventDefault();
        const targetWidget = event.target.closest('.widget');

        if (targetWidget && draggedWidget !== targetWidget) {
            // Swap the widgets
            const tempHtml = draggedWidget.innerHTML;
            const tempClass = draggedWidget.className;

            draggedWidget.innerHTML = targetWidget.innerHTML;
            draggedWidget.className = targetWidget.className;

            targetWidget.innerHTML = tempHtml;
            targetWidget.className = tempClass;

            saveLayout(); // Save the new layout
        }
    });

    // Handle reset button click
    resetButton.addEventListener('click', function() {
        localStorage.removeItem('dashboardLayout');
        resetLayout(); // Reset to default layout
    });

    // Save the current layout to local storage
    function saveLayout() {
        const widgets = Array.from(document.querySelectorAll('.widget'));
        const layout = widgets.map(widget => ({
            innerHTML: widget.innerHTML,
            className: widget.className
        })); // Save both HTML and className
        localStorage.setItem('dashboardLayout', JSON.stringify(layout));
    }

    // Load the saved layout from local storage
    function loadLayout() {
        const savedLayout = JSON.parse(localStorage.getItem('dashboardLayout'));
        if (savedLayout) {
            const widgets = Array.from(document.querySelectorAll('.widget'));
            savedLayout.forEach((data, index) => {
                if (widgets[index]) {
                    widgets[index].innerHTML = data.innerHTML;
                    widgets[index].className = data.className;
                }
            });
        }
    }

    // Reset widgets to default layout
    function resetLayout() {
        const defaultLayout = [
            { innerHTML: '<img src="./images/weather-svgrepo-com.svg" alt="Weather Icon"/>', className: 'widget weather' },
            { innerHTML: '<img src="./images/calendar-svgrepo-com.svg" alt="Calendar Icon"/>', className: 'widget calendar' },
            { innerHTML: '<img src="./images/gui-todo-list-svgrepo-com.svg" alt="To-do List Icon"/>', className: 'widget todo' },
            { innerHTML: '<img src="./images/news-svgrepo-com.svg" alt="News Icon"/>', className: 'widget news' }
        ];
        const widgets = Array.from(document.querySelectorAll('.widget'));
        defaultLayout.forEach((data, index) => {
            if (widgets[index]) {
                widgets[index].innerHTML = data.innerHTML;
                widgets[index].className = data.className;
            }
        });
        saveLayout(); // Save the default layout after resetting
    }

    loadLayout(); // Load the layout on page load
});
