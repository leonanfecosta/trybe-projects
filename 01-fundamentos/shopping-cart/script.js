const sectionParent = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');

const setLoading = () => {
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerText = 'carregando...';
  const container = document.querySelector('.container');
  container.appendChild(p);
};

const removeLoading = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
};

// utilizar o split para criar uma função que some todos os valores depois de $ e depois passar em lugares especificos para realizar a soma
const totalPrice = () => {
  const items = document.querySelectorAll('.cart__item');
  const p = document.querySelector('.total-price');
  let total = 0;
  items.forEach((item) => {
    const price = item.innerText.split('$')[1];
    total += Number(price);
  });
  p.innerText = total;
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const getProducts = async () => {
  setLoading();
  const fetchData = await fetchProducts('computador');
  const results = await fetchData.results;
  removeLoading();
  results.forEach((result) => {
    const { id, title, thumbnail } = result;
    const element = createProductItemElement({ sku: id, name: title, image: thumbnail });
    sectionParent.appendChild(element);
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
  totalPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getItemCart = async (item) => {
  const fetchData = await fetchItem(item);
  const { id, title, price } = fetchData;
  const result = createCartItemElement({ sku: id, name: title, salePrice: price });
  cartItems.appendChild(result);
  saveCartItems(cartItems.innerHTML);
  totalPrice();
};

const buttonListener = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', (event) => {
    const sku = getSkuFromProductItem(event.target.parentElement);
    getItemCart(sku);
  }));
};

const loadSaveCartItems = () => {
  const loadStorageList = getSavedCartItems();
  cartItems.innerHTML = loadStorageList;
  const productsCartList = document.querySelectorAll('.cart__item');
  totalPrice();
  productsCartList.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  }); 
};

const removeAllItems = () => {
  const btn = document.querySelector('.empty-cart');
  btn.addEventListener('click', () => {
    cartItems.innerHTML = '';
    saveCartItems(cartItems.innerHTML);
    totalPrice();
  });
};

window.onload = async () => { 
  await getProducts();
  buttonListener();
  removeAllItems();
  loadSaveCartItems();
};
