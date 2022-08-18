import React from 'react';
import './index.scss';

function Collection({ name, images }) {
  return (
    <div className="collection">
      <img className="collection__big" src={images[0]} alt="Item" />
      <div className="collection__bottom">
        <img className="collection__mini" src={images[1]} alt="Item" />
        <img className="collection__mini" src={images[2]} alt="Item" />
        <img className="collection__mini" src={images[3]} alt="Item" />
      </div>
      <h4>{name}</h4>
    </div>
  );
}

function App() {
  const tagsArray = ['Все','Горы','Море','Архитектура','Города'];
  const pageArray = [];

  const [tag, setTag] = React.useState('Все');
  const [value, setValue] = React.useState('');
  const [page, setPage] = React.useState(1);

  const [photos, setPhotos] = React.useState([]);

  for (let i = 1; i <= photos.length; i++) {
    pageArray.push(i);
  }

  React.useEffect(() => {
    fetch('https://62fe7bf241165d66bfc10d04.mockapi.io/photos')
    .then(response => response.json()).then(data => setPhotos(data)).catch(err => console.log(err));
  }, [])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            tagsArray.map((item, index) => <li className={ item === tag ? 'active' : ''} key={index} onClick={() => setTag(item)}>{item}</li>)
          }
        </ul>
        <input className="search-input" value={value} onBlur={() => setValue('')} onChange={(e) => setValue(e.target.value)} placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {
          photos.filter(item => item.name.toLowerCase().includes(value.toLowerCase() || (tag === 'Все' ? '' : tag.toLowerCase())))
          .map((item, index) => <Collection name={item.name} images={item.photos} key={index}/>)
        }
      </div>
      <ul className="pagination">
        {
          pageArray.map(item => <li className={item === page ? 'active' : ''} key={item} onClick={() => setPage(item)}>{item}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
