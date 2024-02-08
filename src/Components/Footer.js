import React from 'react'
import {ReactComponent as GitHub} from './icons/github.svg'
import {ReactComponent as Linkedin} from './icons/linkedin.svg'

export default function Footer ({ 
    gameState, 
    disConnectHandler, 
    voteForStopGame, 
    countUsers, 
    share
    }) {
    
    return (
        <footer>
            <div className='bottom-buttons'>
                <button className='btn btn-warning' onClick={disConnectHandler}>
                    Выйти
                </button>
                <button className='btn btn-warning' onClick={voteForStopGame}>
                    {`Остановить игру ${gameState?.stopGameVotes?.length}/${countUsers}`}
                </button>
                <button className='btn btn-warning' onClick={share}>
                    Поделиться
                </button>
            </div>

            <div className='contacts'>
                <h4><a href='https://t.me/isruslan' target="_blank">prod by isruslan⠀</a></h4>
                    <div className="contact-icons">
                        <a href="https://www.linkedin.com/in/isruslan1/" target="_blank" aria-label="linkedin">
                            <Linkedin />
                        </a>
                        <a href="https://github.com/is1ruslan" target="_blank" aria-label="github">
                            <GitHub />
                        </a>
                    </div>
            </div>
        </footer>
    )
}