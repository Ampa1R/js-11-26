const testGoods = [1,2,3,4];

  const testRenderGoodsItem = (price) => {
    return `
      <div class="item">
        <p>${price}</p>
      </div>
    `;
}

const testRenderGoods = (list) => {
    const goodsList = list.map((item) => testRenderGoodsItem(item));
    // document.querySelector('.goods').innerHTML = goodsList;
    document.querySelector('.goods').innerHTML = goodsList.join('');
  }
  
  testRenderGoods(testGoods);