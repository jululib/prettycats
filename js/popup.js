class Popup{
    constructor(className){
        // создаем экземпляр класса
        this._className = className;
        // ищем класс на странице
        this.popup = document.querySelector(`.${className}`)

        // привязываем контекст этого попапа к функции закрытия по esc
        this._handleEscapeUp = this._handleEscapeUp.bind(this)
    }

    // функция закрытия по нажатию ecs
    _handleEscapeUp(evt){
        if (evt.key === 'Escape'){
            this.close()
        }
    }
    
    open(){
        this.popup.classList.add('popup_active');
        // обработчик по нажатию кнопки на функцию
        document.addEventListener('keyup', this._handleEscapeUp)
    }

    close(){
        this.popup.classList.remove('popup_active');
        // удаление обработчика, нужно чтобы не светить в событиях в браузере
        document.removeEventListener('keyup', this._handleEscapeUp);

    }

    // обработчик события закрытия попапа, по клику оверлея или крестику
    // если наследователь  содержит  класс родителя (попап), его нужно закрыть
    setEventListener(){
        this.popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(this._className) || !!evt.target.closest('.popup__close')){
                this.close()
            }
        })

    }
}