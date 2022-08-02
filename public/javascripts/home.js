document.addEventListener('click', function (event) {
	if (!event.target.matches('.go-find-pokemon')) return;
	event.preventDefault();

  const elem = document.querySelector('#battle-pre-loading');
  elem.style.display = 'block';

  setTimeout(() => {
    location.href = event.target;
  }, 2000);

}, false);
