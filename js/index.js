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
        //обновляем локальное хранилище, после создания кота
        updateLS(dataFromForm, {type: 'ADD_CAT'})
        popupInst.close();
    })
}

function handleFormLogin(e) {
    e.preventDefault();//собираем данные с карточки
        const elementsFormCat = [...formSignInSubmit.elements];
        const dataFromForm =  serialiseForm(elementsFormCat);
        Cookies.set("email", `email=${dataFromForm.email}`);
        btnOpenFormPopup.classList.remove("visually-hidden");
        btnOpenLoginPopup.classList.add("visually-hidden");
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
        LSData.forEach(function(catData){
            createCat(catData); 
        }) 
        // если нет, то получаем из API
    } else {
        // обрабатываем пришедшие данные с сервера
        api.getAllCats()
        .then(({data})=>{
            // Для каждого элемента массива котов, с параметром инфо о кот
            data.forEach(function(catData) {
                createCat(catData);
            })
            // обновляем хранилище
            updateLS(data, {type: 'ALL_CATS'})
        })
    }
}
// функция обновления локального хранилища
function updateLS(data, action) { 
    // создаем слепок хранилища
    const oldStorage = JSON.parse(localStorage.getItem('cats'));
    // обработка разных сценариев обновления
    switch (action.type) {
        case 'ADD_CAT':
            oldStorage.push(data);
            localStorage.setItem('cats', JSON.stringify(oldStorage))
            return;
        case 'ALL_CATS': 
            localStorage.setItem('cats', JSON.stringify(data));
            setDataRefresh(2, 'catsRefresh');
            return;
        case 'DELETE_CAT':
            // проверка на наличие ид в дате и слепке ЛС
            const newStorage = oldStorage.filter(cat => cat.id !== data.id)
            localStorage.setItem('cats', JSON.stringify(newStorage))
            return;
        default:
            break;
    }
}

// событие открытия попапа
btnOpenFormPopup.addEventListener('click', () => popupInst.open())
btnOpenLoginPopup.addEventListener('click', () => popupLogin.open())

//добавляем событие на клие сабмита в форме
formCatAddSubmit.addEventListener('submit', handleFormAddCat)
formSignInSubmit.addEventListener('submit', handleFormLogin)

const isAuth = Cookies.get("email");

// проверка на наличие куки
if (!isAuth) {
    btnOpenFormPopup.classList.add("visually-hidden");
  } else {
    btnOpenLoginPopup.classList.add("visually-hidden");
}

checkLS();
