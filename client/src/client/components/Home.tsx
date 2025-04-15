import { useEffect, useState } from 'react';
import './Home.css';  

import SongCard from './SongCard';
import { toast, ToastContainer } from 'react-toastify';
const database = '/graphql'

type song = {
  name: string
  artist_name: string
  album_name: string
  album_image: string
  audio: string
}

function Home() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchType, setSearchType] = useState("Title")
  const [searchTerm, setSearchTerm] = useState("");
  const [displaySongs, setDisplaySongs] = useState<song[]>([]);

  useEffect(()=>{
    searchResults();
  }, []);

  const searchResults = async() => {
    
    const input = {
      name: "",
      artist: "",
      album: "",
      genre: ""
    }

    if(searchType == "Title"){
      input.name = searchTerm
    }
    else if(searchType == "Artist"){
      input.artist = searchTerm
    }
    else if(searchType == "Album"){
      input.album = searchTerm
    }
    if(selectedGenre){
      input.genre = selectedGenre
    }

    const query = `
      query Query($input: trackInput) {
      searchTracks(input: $input) {
        name
        album_image
        album_name
        artist_name
        audio
      }
    }
    `;

    const response = await fetch(database, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query, variables:{input}})
    });

    const result = await response.json();
    console.log(result)
    setDisplaySongs(result.data.searchTracks)
  }

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const sendNotification = (name: string) => {
    toast.success(name+" Added to library", {closeOnClick: true});
  }

  return (
    <>
    <ToastContainer />
    <div className="Home">
      <header>
       
        <select id="searchType" value={searchType} onChange={(e)=>setSearchType(e.target.value)}>
          <option value="Title">Title</option>
          <option value="Artist">Artist</option>
          <option value="Album">Album</option>
        </select>

        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-bar" 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
          <button className="search-btn" onClick={(e: React.MouseEvent<HTMLButtonElement>) =>{ e.preventDefault();
            searchResults();
          }}>🔍</button>
          
          {/* Genre filter dropdown */}
          <select className="genre-filter" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">Select Genre</option>
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="jazz">Jazz</option>
            <option value="hip-hop">Hip-Hop</option>
            <option value="classical">Classical</option>
            <option value="country">Country</option>
          </select>
        </div>
      </header>

      <section className="welcome-section">
        <h1>WELCOME TO MUSIC APP!</h1>
        <p >"Explore trending songs and playlists."</p>
      </section>

      {/* Filtered Song List */}
      <section>
        <h2 className='song23'>TRENDING SONGS</h2>
        <div className="song-list">
          {displaySongs.length > 0 ? (
            displaySongs.map(song => (
              < SongCard song={song} mode='main' toast={sendNotification} />
            ))
          ) : (
            <p>No songs available for the selected genre.</p>
          )}
        </div>
      </section>
    </div>
    </>
  );
}

export default Home;
