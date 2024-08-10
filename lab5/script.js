document.addEventListener('DOMContentLoaded', function() {
    const dashboard = document.querySelector('.dashboard');
    const resetButton = document.getElementById('reset');
    
    let draggedWidget = null;

    dashboard.addEventListener('dragstart', function(event) {
        draggedWidget = event.target;
        event.target.style.opacity = 0.5;
    });

    dashboard.addEventListener('dragend', function(event) {
        event.target.style.opacity = 1;
        draggedWidget = null;
    });

    dashboard.addEventListener('dragover', function(event) {
        event.preventDefault(); // Allow drop
    });

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

    resetButton.addEventListener('click', function() {
        localStorage.removeItem('dashboardLayout');
        loadLayout(); // Reset to default layout
    });

    function saveLayout() {
        const widgets = Array.from(document.querySelectorAll('.widget'));
        const layout = widgets.map(widget => widget.innerHTML); // Save only the HTML
        localStorage.setItem('dashboardLayout', JSON.stringify(layout));
    }

    function loadLayout() {
        const savedLayout = JSON.parse(localStorage.getItem('dashboardLayout'));
        if (savedLayout) {
            const widgets = Array.from(document.querySelectorAll('.widget'));
            savedLayout.forEach((html, index) => {
                widgets[index].innerHTML = html;
            });
        }
    }

    loadLayout(); // Load the layout on page load
});

