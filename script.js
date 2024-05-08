
const accessKey = "sSS5hun_BZh-OZ2YTP5VgfI7weLJJX0cGEDBnpI-GRk"

const formEl = document.querySelector('form');
const searchInput =document.getElementById('search-input');
const searchResults = document.querySelector ('.search-results');
const showMore = document.getElementById('Show-more');

let inputData ="";
let page = 1;

async function searchImages () 
{
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&client_id=${accessKey}&query=${inputData}`
    try {

        const response = await fetch(url);

        if (!response.ok )
            {
                throw new Error (`HTTP Error status:${response.status}`);
            } 

        const data = await response.json();
        const results = data.results

        if (page === 1)
            {
                searchResults.innerHTML = "";
            }

            results.forEach((result) =>
                {
                    
                    const imageWrapper = document.createElement('div');
                    imageWrapper.classList.add('search-result');
                    const images = document.createElement('img');
                    images.src = result.urls.small;
                    images.alt = result.alt_description;
                    const imageLink = document.createElement('a');
                    imageLink.href = result.links.html;
                    imageLink.textContent = result.alt_description;
                    imageLink.target = '_blank';

                    imageWrapper.appendChild(images);
                    imageWrapper.appendChild(imageLink);
                    searchResults.appendChild(imageWrapper);
                
                });

            page++;
            if(page > 1)
                {
                    showMore.style.display = 'block';
                }

    } catch (error) {

        console.log('there was a problem with the fetch operation', error);

    }
   
}

formEl.addEventListener('submit', (event) =>
{
    event.preventDefault();
    page = 1;
    searchImages()
})

showMore.addEventListener('click', () =>
{

    searchImages();

})




