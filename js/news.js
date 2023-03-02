
const loadCategoryName=()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res=>res.json())
    .then(data=> showCategory(data.data.news_category))
}
const showCategory=(categories)=>{
        //  console.log(categories)
         const categoryContainer=document.getElementById('category-container');
         
         categories.forEach(category=>{
                const div=document.createElement('div');
                div.innerHTML=`
                <button onclick='showCategoryId("${category.category_id}","${category.category_name}")' type="button" class="btn btn-primary">${category.category_name}</button>
                `
                
                categoryContainer.appendChild(div)
         })
}
const showCategoryId=(id,name)=>{
    
    try{
          fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
          .then(res=>res.json())
          .then(data=>showNews(data.data,name))
    }
    catch(error){
        console.log(error)
    }
}
const showNews=(newses,name)=>{
    //  console.log(newses.length,name)

    const inputField=document.getElementById('input');
    inputField.value=(newses.length?newses.length:'No news here')+" "+"news found category name"+" "+name;
    const newsContainer=document.getElementById('news-container');
      newsContainer.innerText=''
     newses.forEach(news=>{
        console.log(news)
        const {thumbnail_url,image_url,title,details}=news
        const div=document.createElement('div');
        div.classList.add('card','mb-3');
        div.innerHTML=`
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${details.slice(0,200)}...</p>
            
          </div>
        </div>
      </div>
        `
        newsContainer.appendChild(div)
     })
}

loadCategoryName()