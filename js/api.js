// - добавляет информацию о коте на сайт
// - запрашивает все записи с котами
// - запрашивает конкретную запись с котом
// - редактирует информацию у конкретной записи с котом
// - удаляет информацию о коте
// - запрашивает все айдишники

// GET https://sb-cats.herokuapp.com/api/show - отобразить всех котиков
// GET https://sb-cats.herokuapp.com/api/ids - отобразить все возможные айди котиков
// GET https://sb-cats.herokuapp.com/api/show/:id  - отобразить конкретного котика
// POST https://sb-cats.herokuapp.com/api/add - добавить котика
// PUT https://sb-cats.herokuapp.com/api/update/:id - изменить информацию о котике
// DELETE  https://sb-cats.herokuapp.com/api/:id - удалить котика из базы данных

// Ссылки для fetch-запросов (индивидуальные)

// <name> - ваше уникальное имя (строчные латинские буквы). Лучше избегать имен, которые могут повторитьcя (ivan, tatyana, elena...), в противном случае у вас будет одна база данных на двоих =)

// GET - получить информацию обо всех котах
//     http://sb-cats.herokuapp.com/api/2/<name>/show
// GET - получить массив всех существующих id
//     http://sb-cats.herokuapp.com/api/2/<name>/ids
// GET - получить информацию об одном котике по id
//     http://sb-cats.herokuapp.com/api/2/<name>/show/<id кота>
// POST - добавить нового кота (id, name - обязательно!)
//     http://sb-cats.herokuapp.com/api/2/<name>/add
// PUT - изменить информацию о коте (запрещено менять id и name)
//     http://sb-cats.herokuapp.com/api/2/<name>/update/<id кота>
// DELETE - удалить кота
//     http://sb-cats.herokuapp.com/api/2/<name>/delete/<id кота>

const CONFIG_API = {
    url: 'https://sb-cats.herokuapp.com/api/2/jululib',
    headers: {
        'Content-type': 'application/json'
    }
}

class Api {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
        console.log('API');
    }

    getAllCats(){
        fetch(`${this._url}/show`, {
            method: 'GET'
        })
    }


    addNewCat(data){
        fetch(`${this._url}/add`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this._headers
        })
    }

    updateCatById(idCat, data){
        fetch(`${this._url}/update/${idCat}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: this._headers
        })
    }


    getCatById(idCat){
        fetch(`${this._url}/show/${idCat}`, {
            method: 'GET',
        })
    }


    deleteCatById(idCat){
        fetch(`${this._url}/delete/${idCat}`, {
            method: 'DELETE',
        })
    }


}

const api = new Api(CONFIG_API);


