import React, { useState, useEffect} from "react";
import Article from "../components/Article";
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import axios from "axios";

export default function News() {
    const [newsData, setNewsData] = useState([]);
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);

    // const getData = ()=> {
    //     axios
    //         .get("http://localhost:3003/articles")
    //         .then((res) => setNewsData(res.data));
    // };
    // useEffect(() => {
    //     getData();
    // }, []);

    useEffect(() => {
        fetch("http://localhost:3003/articles")
        .then((response) => response.json())
        .then((data) => setNewsData(data))
        .catch((error) => console.log(error));
    }, [author, content]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (content.length < 140) {
            setError(true)
        } else {

        axios.post("http://localhost:3003/articles", {
            author: author,
            content: content,
            date:Date.now(),
        }).then(() => {
            setError(false);
            setAuthor("");
            setContent("");
            // getData();
        });
      } 
    };

    return (
        <div className="news-container">
            <Navigation />
            <Logo/>
            <h1>News</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                    onChange={(e)=> setAuthor(e.target.value)} 
                    type="text" placeholder="Name"
                    value={author} />
                <textarea
                    style={{border: error ? "1px solid red" : "1px solid #61dafb"}} 
                    onChange={(e)=> setContent(e.target.value)} 
                    placeholder="Message"
                    value={content}
                ></textarea>
                {error && <p>140 minimum car required</p>}
                <input type="submit" value="Send" />
            </form>

            <ul>
                {newsData
                .sort((a, b) => b.date - a.date)
                .map((article) => (
                    <Article key={article.id} article={article}/>
                ))}
            </ul>
        </div>
    );
};
