document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.header__2 p');
    const contentSections = document.querySelectorAll('.content-section');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        tabs.forEach(t => t.classList.remove('active'));
        contentSections.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        const targetId = this.textContent.toLowerCase();
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
  
        console.log(`Loading content for: ${targetId}`);
      });
    });
  
    if (tabs.length > 0 && contentSections.length > 0) {
      tabs[0].classList.add('active');
      contentSections[0].classList.add('active');
    }
  
    const currencySpan = document.querySelector('.header__3 i');
    if (currencySpan) {
      currencySpan.textContent = '| INR';
    }
  
    const signInButton = document.querySelector('.header__3 p4');
    if (signInButton) {
      signInButton.addEventListener('click', function () {
        window.location.href = '/signin';
        console.log('Sign In clicked');
      });
    }
  
    const searchInput = document.querySelector('.searchbar__input');
    const searchButton = document.querySelector('.searchbar__button');
    const categoryLinks = document.querySelectorAll('.categories p');
    let currentCategory = 'all';
  
    categoryLinks.forEach(link => {
      link.addEventListener('click', function () {
        categoryLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.textContent.toLowerCase().replace(' ', '');
        console.log(`Search category selected: ${currentCategory}`);
        const heading = document.getElementById('main-heading');
        if (heading) {
          const headingMap = {
            "search all": "Where to?",
            "hotels": "Stay somewhere great",
            "things to do": "Do something fun",
            "restaurants": "Find places to eat",
            "flights": "Find the best flight",
            "holiday homes": "Explore places to rent"
          };
  
          const selected = this.textContent.trim().toLowerCase();
          heading.innerText = headingMap[selected] || "Where to?";
        }
      });
    });
  
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        performSearch();
      }
    });
  
    function performSearch() {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        const query = `/search?q=${encodeURIComponent(searchTerm)}&category=${currentCategory}`;
        console.log(`Performing search with query: ${query}`);
        window.location.href = query;
      }
    }
  
    function displaySearchResults(results) {
      const resultsContainer = document.getElementById('searchResults');
      if (resultsContainer) {
        resultsContainer.innerHTML = '';
        if (results && results.length > 0) {
          results.forEach(item => {
            const resultElement = document.createElement('div');
            resultElement.textContent = item.name || 'No Name';
            resultsContainer.appendChild(resultElement);
          });
        } else {
          resultsContainer.textContent = 'No results found.';
        }
      }
    }
  });
  