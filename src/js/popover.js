document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('trigger-btn');
  const popover = document.getElementById('popover');

  function positionPopover() {
    const triggerRect = trigger.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const viewportHeight = window.innerHeight;


    const left = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2);

    let top;
    if (triggerRect.top - popoverRect.height - 10 > 0) {
      top = triggerRect.top - popoverRect.height - 10; // Сверху
    } else {
      top = triggerRect.bottom + 10; // Снизу
    }

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (popover.style.display === 'block') {
      popover.style.display = 'none';
    } else {
      popover.style.display = 'block';
      positionPopover();
    }
  });

  document.addEventListener('click', () => {
    popover.style.display = 'none';
  });
});
