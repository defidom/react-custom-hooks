import { useEffect, useState } from 'react';

export default function useArticles() {
    const [articles, setArticles] = useState([]);

    const getArticles = function () {
        fetch('articles.json')
            .then(response => response.json())
            .then(data => {
                setArticles(data)
            }
        );
    }

    useEffect(() => {getArticles()}, []);

   

    const repository = {
        list() {
            return articles;
        },

        count () {
            return articles.length;
        },

        isValidId(id) {
            return id >= 0 && id < articles.length;
        },


        byId(id) {
            if (this.isValidId(id)) {
                return articles[id];  
            } else {
                return null;
            }
        },

        add(title, content) {
            setArticles([...articles, { title, content}]);
        },

        delete(id) {
            articles.splice(id, 1);

            setArticles([...articles]);
        },

        

    };

    return repository;
}

