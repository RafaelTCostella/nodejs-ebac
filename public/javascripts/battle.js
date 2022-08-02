const htmlElements = () => ({
  pokemon: document.querySelectorAll('.pokemon-wrapper .battle-figure')[0],
  pokeball: document.querySelectorAll('.pokeball')[0],
  captureButton: document.querySelectorAll('.capture-pokemon')[0],
});

const doCaptureAnimation = () => {
  const {
    pokemon,
    pokeball,
    captureButton,
   } = htmlElements();
  pokemon.classList.add('capture');
  pokeball.classList.add('visible');
  captureButton.classList.add('loading');
  captureButton.textContent = 'TENTANDO CAPTURAR...';
}

const releasePokemon = () => {
  const {
    pokemon,
    pokeball,
    captureButton,
   } = htmlElements();
  pokeball.classList.remove('visible');
  pokemon.classList.remove('capture');
  captureButton.textContent = 'Oh não, ele escapou!! :(';

  setTimeout(() => {
    captureButton.classList.remove('loading');
    captureButton.textContent = 'TENTAR CAPTURAR';
  }, 2000);
}

const makeCaptureRequest = () => {
  const xmlHttp = new XMLHttpRequest();
  const pokeId = document.getElementById('pokeId').value;
  xmlHttp.open('POST', `/api/captura/${pokeId}`, false);
  xmlHttp.send(null);
  const response = JSON.parse(xmlHttp.responseText);

  setTimeout(() => {
    if (response.capturado) {
      const congratulationsMessage = encodeURIComponent('Parabéns!! Pokemon capturado');
      window.location.href = `/pokemons/${response.id}?message=${congratulationsMessage}`;
    } else {
      releasePokemon();
    }
  }, Math.random() * 4000 + 1000);

}

document.addEventListener('click', function (event) {
	if (!event.target.matches('.capture-pokemon') || event.target.matches('.loading')) return;
	event.preventDefault();

  doCaptureAnimation();
  makeCaptureRequest();
}, false);
