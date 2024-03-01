const API_KEY = '5d12e5c309d9bdd31723451426dd447ed0cbce865049e425024e78c4092146f2';

let isbnList=[];
let totalResults = 0;
let page = 1;
const pageSize = 20;
const groupSize = 5;

const getLibrary = async () => {            
    const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=${page}&page_size=${pageSize}`); //isbn
        
    const response = await fetch(url);    
    const data = await response.json();
    isbnList = data.docs;
    totalResults = data.totalResults;    
    render();
    paginationRender();
};

const render = () => {
    //전체리스트
    const newsHTML = isbnList
        .map(news => `
            <div class="row">
                <img src=${news.TITLE_URL}>
                <ol>${news.TITLE.length > 20 ? news.TITLE.slice(0, 20) + '...' : news.TITLE}</ol>
                <ul>${news.AUTHOR.length > 20 ? news.AUTHOR.slice(0, 20) + '...' : news.AUTHOR}</ul>
                <ul>${news.PRE_PRICE}</ul>
            </div>`).join('');
            
  document.getElementById("news-board").innerHTML = newsHTML;
};

const paginationRender = () => {
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);
    const lastPage = pageGroup * groupSize;
    const firstPage = lastPage - (groupSize - 1)<=0? 1:lastPage - (groupSize-1);

    let paginationHTML = '';

    for (let i = firstPage; i <= lastPage ; i++) {
        paginationHTML += `<li class="page-item ${i===page?'active':''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage=(pageNum)=>{    
    page = pageNum;
    getLibrary();
}

//카테고리 함수
const getCategory = async (category) => {
    // category를 URL로 인코딩
    const encodedCategory = encodeURIComponent(category);
    // URL 생성
    const url = `https://www.nl.go.kr/NL/search/openApi/search.do?key=1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212&kwd=${encodedCategory}`;
    // 새 창에서 URL 열기
    window.open(url, '_blank');
    console.log("카테고리")
};


getLibrary();