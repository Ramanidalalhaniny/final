document.addEventListener('DOMContentLoaded', () => {  
  const searchInput = document.getElementById('searchInput');
  const allButtons = document.querySelectorAll('.searchBtn');
  const searchClose = document.getElementById('searchClose');
  const searchBar = document.querySelector('.searchBar');

  allButtons.forEach(button => {
    button.addEventListener('click', () => {
      searchBar.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
      searchInput.focus();   
      searchBar.style.visibility = 'visible';

    });
  });

  searchClose.addEventListener('click', () => { 
    searchBar.classList.remove('open');
    searchClose.setAttribute('aria-expanded', 'false');
    searchBar.style.visibility = 'hidden';
  });
});
