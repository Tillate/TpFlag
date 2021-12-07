import axios from 'axios';
import React from 'react';

export default function DeleteArticle({ id }) {
    const handleDelete = () => {
        axios.delete('http://localhost:3003/articles/' + id);
        window.location.reload();
    };

    return (
        <button onClick={()=> {
            if (window.confirm('Do you really want to delete this article ?')) {
                handleDelete();
            }
        }}>Delete</button>
    )
}
