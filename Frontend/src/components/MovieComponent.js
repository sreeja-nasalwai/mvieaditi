import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
function MovieComponent() {
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    useEffect(() => {
        try {
            axios.get("http://localhost:3001/api/movie/")
                .then(response => setMovies(response.data))
        }
        catch (err) {
            console.log(err)
        }

    }, [movies])
    async function handleSingleMovie(id) {
        //console.log(movie)
        try {
            console.log(id)
            navigate(`/getMovie/${id}`)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <><Container>
            {movies.map((movie) =>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={movie.moviePosterUrl} />
                    <Card.Body>
                        <Card.Title>{movie.movieName}</Card.Title>
                        <Card.Text>
                            {movie.movieCast}
                        </Card.Text>
                        <Card.Link onClick={() => handleSingleMovie(movie._id)} >See More</Card.Link>
                        <br /><br />
                        <Button variant="primary">Play Movie</Button>
                    </Card.Body>
                </Card>
            )}</Container>
        </>
    )

}
export default MovieComponent