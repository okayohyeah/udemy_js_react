var count = 0;

document.getElementById('tomato').addEventListener('click', () => {
  count++;
  document.getElementById('counter').innerText = count;
  logger();
});
