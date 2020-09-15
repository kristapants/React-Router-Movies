import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'


export default function Movie(props) {
  const [movie, setMovie] = useState();
  const { id } = useParams()
  // Change ^^^ that line and use a hook to obtain the :id parameter from the URL

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [ ]);

  console.log(props.saved)
  // Uncomment this only when you have moved on to the stretch goals
  const saveMovie = () => { 
    const addSavedToList = props.addToSavedList;
  
    // if( props.saved.indexOf(movie.id) > -1 ) {
      addSavedToList(movie)
    // } else {
    //   console.log('uh uh uhhhhhh')
    // }  
  }


  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <button onClick={saveMovie} className="save-button">Save</button>
    </div>
  );
}
