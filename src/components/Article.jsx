import axios from 'axios';
import React from 'react'
import { useState } from 'react/cjs/react.development';
import DeleteArticle from './DeleteArticle';

export default function Article({article}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState("");


    const dateParser = (date) => {
        let newDate = new Date(date).toLocaleDateString('en-EN', {
            year: "numeric",
            month: "long",
            day:"numeric",
            hour:"numeric",
            minute:"numeric",
            second:"numeric",
        })
        return newDate
    };

    const handleEdit = () => {
        const data = {
            author: article.author,
            content: editedContent ? editedContent : article.content,
            date: article.date
        }

        axios.put('http://localhost:3003/articles/' + article.id, data)
            .then(() => {
                setIsEditing(false);
            })
    };

    return (
        <div 
            className="article" 
            style={{background: isEditing ? "#f3feff" : "white"}}>
            <div className="card-header">
                <h3>{article.author}</h3>
                <em>Post on {dateParser(article.date)}</em>
            </div>
            {isEditing ? (
                <textarea 
                onChange={(e)=> setEditedContent(e.target.value)} 
                autoFocus 
                defaultValue={editedContent ? editedContent : article.content}></textarea>
            ) : (
                <p>{editedContent ? editedContent : article.content}</p>
            )}
            <div className="btn-container">
                {isEditing ? (
                    <button onClick={handleEdit}>Validate</button>
                ) : (
                    <button onClick={()=> setIsEditing(true)}>Edit</button>
                )}
                <DeleteArticle id={article.id} />
            </div>
        </div>
    )
}
