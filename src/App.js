import React from 'react';
import './index.scss';
import ImageLoader from './Skeleton';

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
  const cats =  [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ];

  const [categoryId, setСategoryId] = React.useState(0);
  const [value, setValue] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [isLoading, setLoading] = React.useState(true)
  const [photos, setPhotos] = React.useState([]);
  
  React.useEffect(() => {
    setLoading(true);
    const category = categoryId ? `category=${categoryId}` : '';
    fetch(`https://62fe7bf241165d66bfc10d04.mockapi.io/photos?page=${page}&limit=3&${category}`)
    .then(response => response.json())
    .then(data => setPhotos(data))
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((item, index) => <li className={ index === categoryId ? 'active' : ''} key={index} onClick={() => setСategoryId(index)}>{item.name}</li>)
          }
        </ul>
        <input className="search-input" value={value} onBlur={() => setValue('')} onChange={(e) => setValue(e.target.value)} placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {
          isLoading ? <ImageLoader/> :
          photos.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
          .map((item, index) => <Collection name={item.name} images={item.photos} key={index}/>)
        }
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((_, index) => <li className={index + 1 === page ? 'active' : ''} key={index} onClick={() => setPage(index + 1)}>{index + 1}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
