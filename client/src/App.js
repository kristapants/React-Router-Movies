import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom' ;

import MovieList from './Movies/MovieList';
import SavedList from './Movies/SavedList';
import Movie from './Movies/Movie';;


export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(res => {
          setMovieList(res.data)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = (id) => {
    setSaved([...saved, id])
  };

  return (
    <div>
      <SavedList 
        list={saved} 
      />

      <Route exact path = '/'>
        <MovieList 
          movies={movieList}
        />
      </Route>
      
      <Route path='/movies/:id'>
        <Movie 
          addToSavedList={addToSavedList}
        />
      </Route>
    </div>
  );
}
