const cardContainer = document.querySelector('.card-container');

  cardContainer.addEventListener('wheel', (event) => {
    event.preventDefault();
    cardContainer.scrollLeft += (event.deltaY * 8);
  });
