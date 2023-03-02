const loadCategory=()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res=>res.json())
    .then(data=> showCategory(data.data.news_category))
}
const showCategory=(categories)=>{
         console.log(categories)
         const categoryContainer=document.getElementById('category-container');
         categories.forEach(category=>{
                const div=document.createElement('div');
                div.innerHTML=`
                <button type="button" class="btn btn-primary">${category.category_name}</button>
                `
                categoryContainer.appendChild(div)
         })
}
loadCategory()