import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillLike } from "react-icons/ai";
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { useNavigate, useParams } from 'react-router-dom';

function SingleMovieComponent() {
    const navigate = useNavigate()
    const params = useParams()
    var [movie, setMovie] = useState({})
    var [like, setLike] = useState(false)
    useEffect(() => {
        const { id } = params
        axios.get(`http://localhost:3001/api/movie/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err))
    })
    function handleLike(id) {
        const token = localStorage.getItem("token")
        console.log(token)
        if (token) {
            axios.get(`http://localhost:3001/api/movie/like/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    if (res.data.status)
                        navigate("/login")
                    else
                        setLike(res.data.liked)
                })

            if (!like) {
                axios.put(`http://localhost:3001/api/movie/like/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        if (res.status === 200) {
                            setLike(true)
                            document.getElementById("like_button").style.color = "red"
                        }
                    })
                    .catch(err => console.log(err))
            }
            else {
                axios.delete(`http://localhost:3001/api/movie/like/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        if (res.status === 200) {
                            setLike(true)
                            document.getElementById("like_button").style.color = "black"
                        }
                    })
                    .catch(err => console.log(err))
            }
        }
        else {
            navigate("/login")
        }
    }
    function addComment(id) {
        const token = localStorage.getItem("token")
        axios.put(`http://localhost:3001/api/comment/${id}`,)

    }
    return (
        <>
            <center>
                <img src={movie.moviePosterUrl}></img>
                <h1>{movie.movieName}</h1>
                <p>{movie.movieCast}</p>
                <AiFillLike onClick={handleLike} id="like_button" />
            </center>

        </>
    )
}
export default SingleMovieComponent
