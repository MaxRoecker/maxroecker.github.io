const button = document.getElementById('print-button');
if (button != null) {
  button.addEventListener('click', () => {
    window.print();
  });
}
