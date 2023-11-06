import { React, useState } from 'react';
import './App.css';

function App() {
  const [ShowForm, SetShowForm] = useState(true)
  const [NewGame, SetNewGame] = useState(false)

  let [name, SetName] = useState([])
  let name_1 = ''

  const EnterName = () => {
    if (document.querySelector('.input_name').value !== '') {
      SetShowForm(false)
      SetFormName('none')
      console.log(document.querySelector('.input_name').value)
      name_1 = document.querySelector('.input_name').value
      SetNewGame(true)
      SetStartGameBtn('none')
      const socket = new WebSocket('ws://localhost:8080')
      socket.onopen = function(event) {
        console.log('Соединение установлено')
        socket.send(name_1)
        socket.onmessage = function(event) {
          SetName(event.data)
          console.log(event.origin)
        }
      };
    }

    else {
      alert('Заполните поле с именем')
    }
  }

  const Year = new Date().getFullYear()
  const [form_name, SetFormName] = useState('')
  const [start_game_btn, SetStartGameBtn] = useState('')
  const StartGame = () => {console.log('StartGame')}
  const [show_menu, SetShowMenu] = useState(false)

  const menu_exit = () => {
    if (show_menu === true) SetShowMenu(false)
    else SetShowMenu(true)
  }

  const logout = () => {
    SetShowMenu(false)
    SetShowForm(true)
    SetStartGameBtn('')
    SetNewGame(false)
  }

  return (
    <>
      {ShowForm === true ?
        <div className='form_name'>
          <label>Имя</label>
          <input type="text" className='input_name' placeholder='Введите имя...'/>
          <div className={'btn_enter_name ' + form_name} onClick={EnterName}>Ввести имя</div>
        </div>
        :
        <div className={'btn_game'+start_game_btn}>
          <div className={'btn_enter_name margi_auto '+start_game_btn} onClick={StartGame}>Начать играть</div>
        </div>
      }

      {
        NewGame === true ? 
          <div className='game'>
           <div className='header'>
             <div>BlackJack Game</div>
             <div className='name' onClick={menu_exit}>Georgii</div>
             {show_menu === true ? <div className='menu'><div className='tab' onClick={logout}>Выход</div></div> : null}
           </div>
           <div className='body'>
              <div className='game_field'>
                {name}
                <div className='card'>
                  <div className='card_black'>card_black</div>
                </div>
                <div className='bar'>
                  <div>МИН</div>
                  <div>МАКС</div>
                  <div>СТАВКА</div>
                  <div>ПОВТОРИТЬ</div>
                </div>
              </div>
           </div>
           <div className='footer'>{Year} &copy;</div>
          </div>
        : null
      }
    </>
  );
}

export default App;