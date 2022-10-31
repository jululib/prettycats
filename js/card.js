class Card{
    // создает готовую ДОМ-ноду, с инфо о котике и шабоном разметки
    constructor(infoCat, selectorTemplate){
        // информация о данных кота из массива
        this._infoCat = infoCat; 
        // шаблон разметки данных
        this._selectorTemplate = selectorTemplate;
    }

    // создание шаблона карточки, недоступен извне
    // находим класс нужного шаблона в документе, с помощью content получаем document-fragment и находим клсс карточки
    // получаем содержимое шаблона
    _getTemplate(){
        return document.querySelector(this._selectorTemplate).content.querySelector('.card') ;
    }

    // создание элемента карточки, доступен снаружи
    getElement(){
        // необходимо клонировать ноду, иначе будем работать с одним и тем же элементом карточки
        this.element = this._getTemplate().cloneNode(true);

        // добавляем классы разметки
        const cardTitle = this.element.querySelector('.card__name');
        const cardImage = this.element.querySelector('.card__image');
        const cardLike = this.element.querySelector('.card__like');
        // const cardAge = this.element.querySelector('.card__age');
        // const cardRate = this.element.querySelector('.card__rate');
        // const cardDesc = this.element.querySelector('.card__desc');

        // условиe отображения лайка
        if (!this._infoCat.favourite){
            cardLike.remove();
        }

        // наполняем данными объекта
        cardTitle.textContent = this._infoCat.name;
        cardImage.src = this._infoCat.img_link;
        // cardAge.textContent = this._infoCat.age;
        // cardRate.textContent = this._infoCat.rate;
        // cardDesc.textContent = this._infoCat.description;

        return this.element;
    }
}

 