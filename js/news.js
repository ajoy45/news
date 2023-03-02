let fetchData=[];
console.log(fetchData)
let categoryName=''
// console.log(fetchData)
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
          .then(data=>{
            fetchData=data.data;
            categoryName=name;
            showNews(data.data,name)
          })
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
        const {_id,rating,image_url,title,details,author,total_view}=news;
        const date=new Date(author.published_date);
        const dateFormate=date.toDateString()
        // console.log()
        // const dateFormat=date.toDateString();
        const div=document.createElement('div');
        div.classList.add('card','mb-3');
        div.innerHTML=`
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8 d-flex flex-column">
          <div class="card-body ">
           <div>
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details.slice(0,200)}...</p>
           </div>
          </div>
          <div class='ps-3 mb-3 d-flex align-items-center justify-content-around'>
               <div class='d-flex align-items-center'>
                    <img class='rounded-circle'width='50px'height='50px' src="${author.img}" alt="">
               <div class=' ps-2'>
                    <p class='p-0 m-0'>${author.name?author.name:"no author"}</p>
                    <p class='p-0 m-0'>${dateFormate?dateFormate:"no date"}</p>
               </div>
               
               </div>
               <div class='d-flex '>
                 <i class='fas fa-eye '></i>
                 <p class='ps-2'>${total_view?total_view:'No view available'}</p>
               </div>
               <div class='d-flex align-items-baseline'>
                ${generatingRating(rating.number)}
                <p>${rating.number}</p>
               </div>
               <div>
               <i onclick='loadNewsDetails("${_id}")' class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
               </div>
           </div>
        </div>
      </div>
        `
       
        newsContainer.appendChild(div)
     })
}
const loadNewsDetails=(_id)=>{
 try{
     fetch(`https://openapi.programming-hero.com/api/news/${_id}`)
     .then(res=>res.json())
     .then(data=>showNewsDetails(data.data))
 }
 catch(error){
       console.log(error)
 }
}
const showNewsDetails=(newsDetails)=>{
        const modalContainer=document.getElementById('modal-container');
          modalContainer.innerText=''
        newsDetails.forEach(newsDetail=>{
          console.log(newsDetail)
          const {thumbnail_url,details,title,others_info,rating}=newsDetail;
          const div=document.createElement('div')
          div.classList.add("modal-content");
          div.innerHTML=`
          <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">${title}<span class="badge text-bg-warning">${others_info.is_trending? 'Tranding':'No'}</span> </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img src="${thumbnail_url}" alt="">
        <p>${details}</p>
        </div>
        <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          
        </div>
          `
          modalContainer.appendChild(div)

        })
}

const showTrending=()=>{
   const isTrending=fetchData.filter(singleData=>singleData.others_info.is_trending===true)
   showNews(isTrending,categoryName)
   
}
const showTodayPic=()=>{
  const isTodayPic=fetchData.filter(singleData=>singleData.others_info.is_todays_pick===true);
  showNews(isTodayPic,categoryName)
}
// generate rating
const generatingRating=(rating)=>{
   let ratingHTML='';
   for(let i=1;i<=Math.floor(rating);i++){
    ratingHTML+=`<i class='fas fa-star'></i>`
   }
   if(rating-Math.floor(rating)>0){
    ratingHTML+=`<i class='fas fa-star-half'></i>`
   }
   return ratingHTML;
}

loadCategoryName()