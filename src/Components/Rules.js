import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function Rules({ darkMode }) {
    const [rules, setRules] = useState(false)

    return (
        <div>
            <button onClick={() => setRules(true)}><h6 className='game-rules' >Правила</h6></button>

            <Modal className='modal' centered show={rules} onHide={() => setRules(false)} >
                <Modal.Header className={`centered-modal ${darkMode ? 'dark' : ''}`}>
                    <Modal.Title>Правила игры✅</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`centered-modal ${darkMode ? 'dark' : ''}`}>
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
                <Modal.Footer className={`centered-modal ${darkMode ? 'dark' : ''}`}>
                    <Button className='modal-button' variant="warning" onClick={() => setRules(false)}>
                        Паняяятна
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}