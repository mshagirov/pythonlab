document.addEventListener('keydown', (event) => {
  // Check if Ctrl or Cmd key is pressed
  if (event.ctrlKey || event.metaKey) {
    document.querySelectorAll('div').forEach(el => el.blur());

    // Ctrl/Cmd + , (comma)
    if (event.key === ',' || event.code === 'Comma') {
      event.preventDefault(); // Prevent default browser behavior
      const previousLink = document.getElementById('previous');
      if (previousLink) {
        previousLink.focus(); // Focus the link
        previousLink.click(); // Simulate click to navigate
      }
    }
    // Ctrl/Cmd + . (period)
    else if (event.key === '.' || event.code === 'Period') {
      console.log("Next")
      event.preventDefault(); // Prevent default browser behavior
      const nextLink = document.getElementById('next');
      if (nextLink) {
        nextLink.focus(); // Focus the link
        nextLink.click(); // Simulate click to navigate
      }
    }
  }
});
