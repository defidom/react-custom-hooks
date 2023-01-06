import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import useArticles from './repository';

function App() {



  const articles = useArticles();

  const [formObject, setFormObject] = useState(
    { title: 'title1', content: 'content1' }
  );

  const [selectedArticleId, setSelectedArticleId] = useState(-1);

  const selectedArticle = articles.byId(selectedArticleId)?.content ||'none';

  const changeHandler = function (event) {
    const name = event.target.name;
    const value = event.target.value;
    formObject[name] = value;
    setFormObject({ ...formObject })
  }

  return (
    <div className={'app'}>
      <h2>React Custom Hooks</h2>
      <ul>   
        {articles.list().map(
          (articles,index) => {
            return <li key={index}
              className={
                (selectedArticleId === index) ? 'selected' : ''
          }
          onClick={(event) => setSelectedArticleId(index)}>
            {articles.title}
          </li>
          }
        )}
      </ul>
      <br /><span className={'bold'}>Selected Article:</span>
      <p>{selectedArticle}</p><br />

      <br />
      <div className={'controls'}>
        <span className={'bold'}>Controls:</span><br />
        <button onClick={() => articles.add(formObject.title, formObject.content)}>Add</button>
        <button onClick={false} disabled={false} >  Delete</button>
        <br />
        <input type={'text'} name={'title'}
          placeholder={'title'} value={formObject.title}
          onChange={(e) => changeHandler(e)}
        /><br />
        <button onClick={false} disabled={!
      articles.isValidId(selectedArticleId)}>Delete</button>
      </div>


    </div>
  );
}

export default App;
