import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import MovieCard from './MovieCard';
import SavedList from './SavedList';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    const id = this.props.match.params.id;
    this.fetchMovie(id);
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentWillReceiveProps(newProps){
    if(this.props.match.params.id !== newProps.match.params.id){
      this.fetchMovie(newProps.match.params.id);
    }
  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie)
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    const movie = this.state.movie;
    return (
      <div className="save-wrapper">
          <MovieCard movie={movie}/>
        <div className="save-button" onClick={(event) => {
          this.props.addToSavedList(movie)
        }}>Save</div>
      </div>
      
    );
  }
}
