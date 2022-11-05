const cardsBox = document.querySelector('.cards');
const btnOpenFormPopup = document.querySelector('#add');
const btnOpenLoginPopup = document.querySelector('#login');
const formCatAddSubmit = document.querySelector('#popup-form-cat');
const formSignInSubmit = document.querySelector('#popup-form-login');


// создаем Инстанс попапа с нужным классом
const popupInst = new Popup ('popup-add-cats');
const popupLogin = new Popup ('popup-login');
// устанавливаем служателя закрытия попапа
popupInst.setEventListener();
popupLogin.setEventListener();


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

// вынесем в отдельную функцию создание карточки кота, чтобы в будущем драбатывать функционал в 1-м месте, а не нескольких
function createCat(dataCat){
     // инициализируем класс карточки
     const cardInst = new Card(dataCat, '#card-template');
     // // получаем готовый элемент карточки
     const newCardElement = cardInst.getElement();
     // // добавляем в контейнер карточек, новый элемент карточки
     cardsBox.append(newCardElement);
     //закрываем форму после сабмита
}

function handleFormAddCat(e) {
    e.preventDefault();
    //собираем данные с карточки
    const elementsFormCat = [...formCatAddSubmit.elements];
    const dataFromForm =  serialiseForm(elementsFormCat);
    api.addNewCat(dataFromForm).then(()=>{
        createCat(dataFromForm);
        popupInst.close();
    })
}

function handleFormLogin(e) {
    e.preventDefault();//собираем данные с карточки
        const elementsFormCat = [...formSignInSubmit.elements];
        const dataFromForm =  serialiseForm(elementsFormCat);
        Cookies.set("email", `email=${dataFromForm.email}`);
        btnOpenFormPopup.classList.remove("visually-hidden");
        popupLogin.close();
    
}
// функция на получение даты и времени данных
function setDataRefresh(minutes, key) {
    // создаем переменную, для установленного времени
    const setTime = new Date(new Date().getTime() + minutes * 60000);
    // добавляем эту переменную в локальное хранилище
    localStorage.setItem(key, setTime);
    return setTime;
  }

// функция проверки локал сторидж
function checkLS(){
    // получаем данные с локальеого хранилища
    const LSData = JSON.parse(localStorage.getItem('cats'));
    // получаем информацию об обновлении котов
    const getTimeExpire = localStorage.getItem('catsRefresh');
    // проверяем на наличие данных и не пустой ли массив и такущие даты и время меньше последнего обновления
    if (LSData && LSData.length && new Date() < new Date(getTimeExpire)){
        // если да, то отрисовываем котиков из локального хранилище
        LSData.forEach(function(infoCat){
            createCat(infoCat); 
        }) 
        // если нет, то получаем из API
    } else {
        // обрабатываем пришедшие данные с сервера
        api.getAllCats()
        .then(({data})=>{
            // Для каждого элемента массива котов, с параметром инфо о кот
            data.forEach(function(infoCat) {
                createCat(infoCat);
            })
            // и записываем в локальное хранилище
            localStorage.setItem('cats', JSON.stringify(data))
            setDataRefresh(1);
        })
    }
}

checkLS();


// событие открытия попапа
btnOpenFormPopup.addEventListener('click', () => popupInst.open())
btnOpenLoginPopup.addEventListener('click', () => popupLogin.open())

//добавляем событие на клие сабмита в форме
formCatAddSubmit.addEventListener('submit', handleFormAddCat)
formSignInSubmit.addEventListener('submit', handleFormLogin)

const isAuth = Cookies.get("email");

if (!isAuth) {
    // popupLogin.open();
    btnOpenFormPopup.classList.add("visually-hidden");
  }