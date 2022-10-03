class Pagination {
    #currentPage
    #totalPages

    constructor (parent, option){
      const {countPoint, stepInterval, totalPages, onShow} = option;

      this.parent = parent;
      this.#currentPage = 1;
      this.countPoint = countPoint;
      this.stepInterval= stepInterval || countPoint;
      this.#totalPages = totalPages;

      this.onShow = onShow;
      
    //   createMarkUp(parent);
      renderPagination(parent, this.currentPage , this.#totalPages, this.countPoint)
      parent.addEventListener('click', this._handlerOnClick.bind(this))
    }

    _handlerOnClick(e) {
        e.preventDefault();
        
        const usedKey = Object.keys(e.target.dataset);

        if (usedKey.includes("action")){
          this[e.target.dataset["action"]]();
        }

        if (usedKey.includes("index")){        
          this.moveToPage(parseInt(e.target.dataset["index"]))
        }
       
        
    }
    
    moveToPage(page){
      //if (this.currentPage != page) {
        this.currentPage = page;
        renderPagination(this.parent, this.currentPage, this.#totalPages, this.countPoint);
        this.onShow(this.currentPage)
      //}
    }

    set currentPage(newPage){
      this.#currentPage = newPage;
    }

    get currentPage(){
      return this.#currentPage;
    }

    setTotalPages(totalPages){
        this.#totalPages = totalPages;
        renderPagination(this.parent, this.currentPage, this.#totalPages, this.countPoint)
    }

    nextPage() {
      if (this.currentPage +1 < this.#totalPages) {
        this.moveToPage(this.currentPage +1) 
      }
    }

    nextInterval() {
      if (this.currentPage + this.countPoint < this.#totalPages) {
        this.moveToPage(this.currentPage + this.countPoint)
      }
    }

    previosPage() {
      if ((this.#currentPage - 1)){
        this.moveToPage(this.currentPage - 1)
      }      
    }

    previosInterval() {
      if (this.currentPage - this.countPoint > 0){
        this.moveToPage(this.currentPage - this.countPoint);
      }
    }

}

function renderPagination(parent, page, totalPage, countPoint) {
    
    let paginationMarkup = '';
    const isOffset = totalPage > countPoint;
    const rr = Math.ceil(countPoint /2);
    
    let offset = 1; 
    if( page > totalPage - countPoint ){
      offset = totalPage - countPoint}
    else if (page > countPoint && page < (totalPage - rr)){
      offset = page - rr;
    } 
        
    let lCountPoint = countPoint; 
    if (totalPage < countPoint) {
      lCountPoint = totalPage -1;
    }
    else{
      if (page <= countPoint ){
        lCountPoint = countPoint - 1;
      }
      
      else if (page > totalPage - countPoint) {
        lCountPoint = countPoint - 1
      }
    }

    const markup = Array.from(
      { length: lCountPoint },
      (v, k) => k + (1 + offset)
    )
      .map(el => `<a class="pagination__number ${
                    page === el ? 'active' : ''
                  }" data-index = ${el}">${el}</a>`
      ).join('');
      
    paginationMarkup = `<a class="pagination__arrow pagination__arrow--left materials-icons" data-action="previosPage">&larr;</a>
                        <a class="pagination__number ${page === 1 ? "active" : page <= countPoint ? "" : "display-none"}" data-index = ${1}">1</a>
                        ${(isOffset && page > countPoint) ? '<a class="pagination__number display-none" data-action="previosInterval">...</a>': ""}
                        ${markup}
                        ${(isOffset && page < (totalPage - countPoint + 1)) ? `<a class="pagination__number display-none" data-action="nextInterval">...</a>` : ""}
                        ${(isOffset && totalPage > countPoint) ? `<a class="pagination__number ${page === totalPage ? "active" : page > totalPage - countPoint ? "" : "display-none"}" data-index = ${totalPage}">${totalPage}</a>`: ""}
                        <a class="pagination__arrow pagination__arrow--right materials-icons" data-action="nextPage">&rarr;</a>`
      
    parent.innerHTML = paginationMarkup;
  
  }

export { Pagination }; 

