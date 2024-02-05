import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Logo from './icons/logo.png'
import LightOff from './icons/light-off.png'
import LightOn from './icons/light-on.png'

export default function Header ({ darkMode, setDarkMode }) {
    const [rules, setRules] = useState(false)

    return (
        <div>
            <div className='header'>
                <button onClick={() => setRules(true)}><h6 className='game-rules' >Правила</h6></button>
                <div className='game-info'>
                    <img className='logo' src={Logo} alt='logo' />
                    <h1 className='game-name'>Memezis<span> Beta</span></h1>
                </div>
                <button onClick={() => setDarkMode(!darkMode)}><img className='mode' src={darkMode ? LightOn : LightOff}/></button>
            </div>

            <Modal className='modal' centered show={rules} onHide={() => setRules(false)} >
                <Modal.Header className='centered-modal'>
                    <Modal.Title>Правила игры✅</Modal.Title>
                </Modal.Header>
                <Modal.Body className='centered-modal'>
                    <h6><strong>Коротко ⏳<br /></strong>
                        Перед вами случайная ситуация, все игроки выбирают самый ржачный и подходящий к ней мем, затем голосуют за самый смешной мем из тех, что выбрали другие игроки. Побеждает автор самой смешной связки<br />
                        <br />
                        <strong>Подробнее ⤵️<br /></strong>
                        Перед началом игры у каждого игрока в колоде 9 случайных мемов. По середине экрана написана невыдуманная ситуация, о которой невозможно молчать<br />
                        <br />
                        ✔️ Все игроки подбирают и выкладывают наиболее смешной мем к данной ситуации. За один раунд можно использовать только один мем<br />
                        <br />
                        ✔️ Все игроки голосуют за самый смешной мем из тех, что выбрали другие игроки. За себя голосовать нельзя<br />
                        <br />
                        ✔️ Игроку за чей мем проголосовали добавляются очки<br />
                        <br />
                        ✔️ После того, как все игроки проголосуют начинается новый раунд<br />
                        <br />
                        <br />
                        Продолжайте играть, пока не устанете смеяться:) Игрок, набравший больше всех очков побеждает и становится мемологом вечера 😅</h6>
                </Modal.Body>
                <Modal.Footer className='centered-modal'>
                    <Button className='modal-button' variant="warning" onClick={() => setRules(false)}>
                        Паняяятна
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}