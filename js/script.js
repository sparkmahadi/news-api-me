const loadApi = async() =>{
    try{
        const apiKey = '8b8b6518ea204059b1c1b1caf9c4eec9';
    const url = `https://newsapi.org/v2/everything?q=Apple&from=2022-09-04&sortBy=popularity&apiKey=${apiKey}`;
    const res = await fetch(url)
    const data = await res.json()
    return data;
    }
    catch (error) {
        console.log(error)
    }
}

const newsRow = document.getElementById('news-row');
const displayNews = async(sliceNumber) =>{
    const data = await loadApi();
    const newsArray = data.articles;
    const slicedArray = newsArray.slice(0,sliceNumber);
    slicedArray.forEach(articles => {
      const card = document.createElement('div');
    card.classList.add('col');
    card.innerHTML = `
    <div class="card glass">
    <figure><img class='h-72 w-full' src="${articles.urlToImage}" alt="car!"></figure>
    <div class="card-body">
      <h2 class="card-title">${articles.title.slice(0,40)}...</h2>
      <p>${articles.content.slice(0,200)}</p>
      <p>Published: ${articles.publishedAt}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary"><a href="${articles.url}">News Link</a></button>
      </div>
    </div>
  </div>
    `;
    newsRow.appendChild(card);

    });
}

document.getElementById('load').addEventListener('click', ()=>{
    displayNews(20);
})

document.getElementById('load-all').addEventListener('click', ()=>{
    displayNews();
})