import { SyntheticEvent, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import SongCard from './SongCard';
import "./Library.css";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Song {
  name: string;
  artist_name: string;
  album_name: string;
  album_image: string;
  audio: string;
}

const database = "/graphql";

const Library = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [librarySongs, setLibrarySongs] = useState<Song[]>([]);
  const [mainSongs, setMainSongs] = useState<Song[]>([]);
  const [showAvailableSongs, setShowAvailableSongs] = useState<boolean>(false);
  const [libraryName, setLibraryName] = useState<string>("");
  const [allLibraryNames, setAllLibraryNames] = useState<string[]>([]);
  const [addScreen, setAddScreen] = useState<boolean>(false);

  useEffect(() => {
    getSongs();
    allLibraries();
    setShowAvailableSongs(false);
    setAddScreen(false)
  }, [params]);

  const allLibraries = async () => {
    let input = JSON.parse(localStorage.getItem("user") || "{}").name
    const query = `query Query($input: String!) {
      getAllLibraries(input: $input)
    }`;
    const response = await fetch(database, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { input } }),
    });
    const result = await response.json();
    setAllLibraryNames(result.data.getAllLibraries)
  }

  const getSongs = async () => {
    let lib = "";
    if(params.libname && params.libname != "home"){
      lib = params.libname;
    }
    setLibrarySongs(await getLibrarySongs(lib));
  };

  const getLibrarySongs = async (lib: String)=>{
    let input = JSON.parse(localStorage.getItem("user") || "{}").name+lib;
    const query = `query Query($input: String!) {
      getLibrary(input: $input) {
        name
        artist_name
        album_name
        album_image
        audio
      }
    }`;

    const response = await fetch(database, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { input } }),
    });

    const result = await response.json();
    return result.data.getLibrary;
  }

  const songList = async()=>{
    if(!showAvailableSongs){
      const songs : Song[] = await getLibrarySongs("");
      setMainSongs(songs);
      setShowAvailableSongs(true);
    }
    else{
      setShowAvailableSongs(false);
    }
  }

  const addLibrary = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    let input = JSON.parse(localStorage.getItem("user") || "{}").name;
    input += libraryName;
    const query = `mutation Mutation($input: String!) {
      addLibrary(input: $input)
    }`;

    await fetch(database, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { input } }),
    });

    navigate("/library/"+libraryName)
  }

  const addToLibrary = async(song: Song) => {
    let username = JSON.parse(localStorage.getItem('user')!).name;

    const input = {
        username: username+params.libname,
        name: song.name,
        artist_name: song.artist_name,
        album_name: song.album_name,
        album_image: song.album_image,
        audio: song.audio
    }

    const query = `mutation Mutation($input: libraryInput) {
        addToLibrary(input: $input)
    }`;
    
    await fetch(database, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query, variables:{input}})
    })
    navigate('/library/'+params.libname)
  }

  return (
    <div className="library-container">
      
      {/* My Library Section */}
      <div className="my-library">
        <Typography variant="h4" className="my-library-title">
          {(params.libname != "home") ? params.libname : "My Library"}
        </Typography>
        <Typography variant="subtitle1" className="library-description">
          "Access all your saved songs and albums."
        </Typography>
      </div>

      <div className="library-names" >
        {(params.libname == "home") ? 
          <>
            {allLibraryNames.map(lib=>
              <Link to={"/library/"+lib}>{lib}</Link>
            )}
            <button className="add-library" onClick={()=>setAddScreen(!addScreen)} >+</button>
          </> :
          <>
            <Link to={"/library/home"}>Home</Link>
            <button onClick={()=>songList()} >Add Song</button>
          </>
        }
      </div>

      {/* Add Song in Library */}
      {showAvailableSongs &&
        <div id="songOptions">
          {mainSongs.map(song=> (!librarySongs.includes(song)) &&
            <div className="songOpt">
              <img src={song.album_image} alt={song.name} />
              <p>{song.name}</p>
              <button onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{
                e.preventDefault()
                addToLibrary(song);
              }} >Add</button>
            </div>
          )}
        </div>
      }

      {/* Add Library Screen */}
      {addScreen && 
      <form className="add-library" onSubmit={addLibrary} >
        <label>Library Name</label>
        <input type="text" onChange={(e)=>setLibraryName(e.target.value)} required/>
        <input type="submit" value="Add" />
      </form>}

      {/* Saved Songs Section */}
      <div className="saved-songs">
        {/* <Typography variant="h6" className="section-title">
          Saved Songs
        </Typography> */}
        <div className="song-list">
          {librarySongs.length > 0 ? (
            librarySongs.map((song, index) => (
              < SongCard song={song} mode={params.libname} toast={()=>{}} />
            ))
          ) : (
            <Typography color="blue">No songs found.</Typography>
          )}
        </div>
      </div>

      {/* Controls Section
      <Typography variant="subtitle1" className="library-subtitle">
        Controls for saved songs
      </Typography>
      <div className="controls">
        <Button variant="contained" startIcon={<Shuffle />} onClick={handleShuffle}>
          Shuffle All
        </Button>
        <Button variant="contained" color="primary" startIcon={<PlayArrow />} onClick={handlePlayAll}>
          Play All
        </Button>
        <Button variant="contained" color="error" startIcon={<Delete />} onClick={handleDeleteAll}>
          Delete All
        </Button>
      </div> */}
    </div>
  );
};

export default Library;
