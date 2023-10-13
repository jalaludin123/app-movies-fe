import axios from "axios";

const getMovies = async(skip,limit) => {
    const movies = await axios.get(
        "http://127.0.0.1:8000/api/movies/"+skip+"/"+limit
    );

    return movies.data;
}

export default getMovies;