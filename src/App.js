import React from 'react';
import './index.scss';

const ModalWindow = ({open, closeModalWindow, children }) => {
  const show = open ? 'show': '';
  return(
    <div className={`overlay animated ${show}`}>
      <div className="modal">
        <svg height="200" viewBox="0 0 200 200" width="200" onClick={closeModalWindow}>
          <title />
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
        {children} 
      </div>
    </div>
  );
}

const App = () => {
  const[open, setOpen] = React.useState(false);
  const openModalWindow = () => {
    setOpen(true)
  }
  const closeModalWindow = () => {
    setOpen(false)
  }
  return (
    <div className="App">
      <button className="open-modal-btn" onClick={openModalWindow}>✨ Открыть окно</button>
      <ModalWindow open={open} closeModalWindow={closeModalWindow}>
        <img src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" />
        <h3>title</h3>
      </ModalWindow>
    </div>
  );
}

export default App;
