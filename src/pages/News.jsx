import React, { useState, useEffect} from "react";
import Article from "../components/Article";
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

export default function News() {
    const [newsData, setNewsData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3003/articles")
        .then((response) => response.json())
        .then((data) => setNewsData(data))
        .catch((error) => console.log(error));
    }, []);

    return (
        <div className="news-container">
            <Navigation />
            <Logo/>
            <h1>News</h1>

            <form>
                <input type="text" placeholder="Nom" />
                <textarea placeholder="Message"></textarea>
                <input type="submit" value="Send" />
            </form>
            
            <ul>
                {newsData.map((article) => (
                    <Article key={article.id} article={article}/>
                ))}
            </ul>
        </div>
    );
};
