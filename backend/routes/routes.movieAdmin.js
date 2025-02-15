const express=require("express")

const {addMovie,getAllMovies,getMovie,updateMovie,deleteMovie,getComments,getMoviesByGenre,getAllGeneres}=require("../controllers/controllers.movieAdmin")
const { getLikeCount } = require("../controllers/controllers.MovieUser")

const routes=express.Router()


routes.get("/:id",getMovie)
routes.patch("/:id",updateMovie)
routes.post("/",addMovie)
routes.get("/",getAllMovies)
routes.delete("/:id",deleteMovie)
routes.get("/like/:id",getLikeCount)
routes.get("/comments/:id",getComments)
routes.get("/byGenre/:genre",getMoviesByGenre)
routes.get("/getAllGenres",getAllGeneres)


module.exports=routes