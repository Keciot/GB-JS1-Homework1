var cartSum = 0;
var emptyCart = '<h2>Вы пока ничего не купили, а жаль.</h2>';
var full = '<h2>Ваш заказ</h2>';

/* работа с корзиной */

function cartEvent(cartSum) {
    if (cartSum != 0) {
        document.getElementById('cartWrap').innerHTML = full;
        products.forEach(element => {
            if (element.quantity > 0) {
                list = document.createElement('p');
                list.innerText = element.name + ' ' + element.quantity + 'шт. ' + element.price + '₽';
                document.getElementById('cartWrap').append(list);
            }

        })
        result = document.createElement('h2');
        result.setAttribute('class', 'cart-result')
        result.innerText = 'ИТОГО ' + cartSum + '₽';
        document.getElementById('cartWrap').append(result);

    } else {
        document.getElementById('cartWrap').innerHTML = emptyCart;
    }
}

cartEvent(cartSum);

var cart = [];

function addToCart(х) {
    cart.push(х);
    cartSum += cart[cart.length - 1].price;
    ++cart[cart.length - 1].quantity,
        console.log(cart);
    console.log(cartSum);
    cartEvent(cartSum);
}

/* создание карточек товаров */

products.forEach(element => {
    itemDiv = document.createElement('div'); /* Создали карточку */
    itemDiv.setAttribute('class', 'product');
    document.getElementById('product-holder').append(itemDiv);
    h3 = document.createElement('h3'); /* Создали заголовок карточки */
    h3.innerText = element.name;
    itemDiv.append(h3);
    miniPic = document.createElement('img'); /* Создали превью */
    miniPic.setAttribute('src', element.smallPic);
    miniPic.setAttribute('onclick', 'getBigPic(' + products.indexOf(element) + ')');
    itemDiv.append(miniPic);
    button = document.createElement('button'); /* Создали кнопку купить */
    button.innerText = 'Купить';
    button.setAttribute('onclick', 'addToCart(' + element.name + ')');
    itemDiv.append(button);


});

/* Вылетающая галерея  */

/* var key; */

function galleryAction(arrayIndex, picIndex) {
    leftPicIndex = picIndex - 1;
    rightPicIndex = picIndex + 1;
    picIndex == 0 ? leftPicIndex = products[arrayIndex].bigPic.length - 1 : false;
    picIndex == products[arrayIndex].bigPic.length - 1 ? rightPicIndex = 0 : false;

    document.getElementById('pag-left').setAttribute('onclick', 'galleryAction(' + arrayIndex + ', ' + leftPicIndex+')');
    document.getElementById('pag-right').setAttribute('onclick', 'galleryAction(' + arrayIndex + ', ' + rightPicIndex+')');
    document.getElementById('big-pic-id').style.backgroundImage = 'URL(' +products[arrayIndex].bigPic[picIndex] + ')';


}

function getBigPic(indexKey) {
    console.log(indexKey);
    document.getElementById('big-pic-id').style.display = "block";
    galleryAction(indexKey, 0);

}