// Shared JS for index + submit pages

// --- LOCAL STORAGE KEY ---
const STORAGE_KEY = "linkwaveLinks";

// --- SUBMIT FORM ---
const submitForm = document.getElementById("submitForm");
if(submitForm){
  submitForm.addEventListener("submit", e=>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const url = document.getElementById("url").value;
    const platform = document.getElementById("platform").value;
    const category = document.getElementById("category").value;
    const logo = document.getElementById("logo").value;

    const links = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    links.push({name,url,platform,category,logo});
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));

    document.getElementById("submitForm").reset();
    document.getElementById("successMessage").style.display = "block";
  });
}

// --- INDEX LOGIC ---
let currentPlatform="All";
let currentCategory="All";
let currentPage=1;
const linksPerPage=12;

function loadLinks(){
  const container=document.getElementById("cardsContainer");
  if(!container) return;
  container.innerHTML="";
  const links=JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const filteredLinks=links.filter(link=>
    (currentPlatform==="All"||link.platform===currentPlatform) &&
    (currentCategory==="All"||link.category===currentCategory)
  );

  const start=(currentPage-1)*linksPerPage;
  const end=start+linksPerPage;
  const paginatedLinks=filteredLinks.slice(start,end);

  paginatedLinks.forEach(link=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      ${link.logo?`<img src="${link.logo}">`:''}
      <h3>${link.name}</h3>
      <p>${link.description || ''}</p>
      <a class="join" href="${link.url}" target="_blank">Join</a>
    `;
    container.appendChild(card);
  });
  createPagination(filteredLinks.length);
}

function createPagination(total){
  const pagination=document.getElementById("pagination");
  if(!pagination) return;
  pagination.innerHTML="";
  const pages=Math.ceil(total/linksPerPage);
  for(let i=1;i<=pages;i++){
    const btn=document.createElement("button");
    btn.innerText=i;
    btn.className="page-btn";
    if(i===currentPage) btn.classList.add("active");
    btn.onclick=function(){
      currentPage=i;
      loadLinks();
    };
    pagination.appendChild(btn);
  }
}

function loadSubCategories(platform){
  const sub=document.getElementById("subCategoryScroll");
  if(!sub) return;
  sub.innerHTML="";
  let categories=[];
  if(platform==="WhatsApp") categories=["All","Movies","Fun","Gaming","Education","Tech"];
  else if(platform==="Telegram") categories=["All","Movies","Crypto","Anime","Gaming"];
  else if(platform==="Facebook") categories=["All","Movies","Fun","Business","News"];
  else categories=["All"];
  categories.forEach(cat=>{
    const btn=document.createElement("div");
    btn.innerText=cat;
    btn.onclick=function(){
      currentCategory=cat;
      currentPage=1;
      loadLinks();
    };
    sub.appendChild(btn);
  });
}

// --- CATEGORY CLICK ---
document.querySelectorAll("#categoryScroll div").forEach(btn=>{
  btn.onclick=function(){
    currentPlatform=this.dataset.platform;
    currentCategory="All";
    currentPage=1;
    loadSubCategories(currentPlatform);
    loadLinks();
  };
});

// --- SEARCH ---
const searchInput=document.getElementById("searchInput");
if(searchInput){
  searchInput.addEventListener("input",function(){
    const term=this.value.toLowerCase();
    document.querySelectorAll(".card").forEach(card=>{
      const text=card.querySelector("h3").textContent.toLowerCase();
      card.style.display=text.includes(term)?"block":"none";
    });
  });
}

// --- INIT ---
window.addEventListener("load",()=>{
  loadSubCategories("All");
  loadLinks();
});
