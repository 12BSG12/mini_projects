import React from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({correctAnswersCount}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correctAnswersCount} ответа из {questions.length}</h2>
      <a href='/'>
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({step, onClickVariant}) {
  const percent = Math.round(step / questions.length * 100)
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percent}%` }} className="progress__inner"></div>
      </div>
      <h1>{questions[step].title}</h1>
      <ul>{questions[step].variants.map((item, index) => <li onClick={() => onClickVariant(index)} key={item}>{item}</li>)}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = React.useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);
  const onClickVariant = (index) => {
    if(questions[step].correct === index) setCorrectAnswersCount(correctAnswersCount + 1);
    setStep(step + 1)
  }
  const showQuiz = step !== questions.length ? <Game step={step} onClickVariant={onClickVariant}/>: <Result correctAnswersCount={correctAnswersCount}/>;
  return (
    <div className="App">
      {showQuiz}
    </div>
  );
}

export default App;
