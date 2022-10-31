const cardsBox = document.querySelector('.cards');
const btnOpenFormPopup = document.querySelector('#add');
const formCatAddSubmit = document.querySelector('#popup-form-cat');

// создаем Инстанс попапа с нужным классом
const popupInst = new Popup ('popup-add-cats');


// функция сбора информации с формы
function serialiseForm(elements){
    // объект значений с формы
    const formData = {}
    // для каждого элемента инпута
    elements.forEach(input => {
        // который не типа субмит
         if (input.type === 'submit') return;
        //  который не типа чекбокс
         if (input.type !== 'checkbox') {
            // добавляем в объект значение  равное имени инпута
            formData[input.name] = input.value;
         }
        //  для типа чекбокс, добавляем значение чека
         if (input.type === 'checkbox') {
            formData[input.name] = input.cheсked
         }
    }

    )
    return formData;

}


function handleFormAddCat(e) {
    e.preventDefault();
    //собираем данные с карточки
    const elementsFormCat = [...formCatAddSubmit.elements];
    const dataFromForm =  serialiseForm(elementsFormCat);

    // инициализируем класс карточки
    const cardInst = new Card(dataFromForm, '#card-template');
    // // получаем готовый элемент карточки
    const newCardElement = cardInst.getElement();
    // // добавляем в контейнер карточек, новый элемент карточки
    cardsBox.append(newCardElement);

    //закрываем форму после сабмита
    popupInst.close();

}



// Для каждого элемента массива котов, с параметром инфо о коте
cats.forEach(function(infoCat) {
    // инициализируем класс карточки
    const cardInst = new Card(infoCat, '#card-template');
    // получаем готовый элемент карточки
    const newCardElement = cardInst.getElement();
    // добавляем в контейнер карточек, новый элемент карточки
    cardsBox.append(newCardElement) 
});





// событие открытия попапа
btnOpenFormPopup.addEventListener('click', () => popupInst.open())

//добавляем событие на клие сабмита в форме
formCatAddSubmit.addEventListener('submit', handleFormAddCat)

// устанавливаем служателя закрытия попапа
popupInst.setEventListener();