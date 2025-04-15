import "./SongCard.css"
import { FaPlay, FaPlus, FaMinus } from 'react-icons/fa';

import { useParams, useNavigate } from 'react-router-dom'

type song = {
    name: string
    artist_name: string
    album_name: string
    album_image: string
    audio: string
}

function SongCard(props:{song: song, mode: string | undefined, toast: (name:string)=>void}){
    const navigate = useNavigate();

    const addToLibrary = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let username = JSON.parse(localStorage.getItem('user')!).name;

        const input = {
            username: username,
            name: props.song.name,
            artist_name: props.song.artist_name,
            album_name: props.song.album_name,
            album_image: props.song.album_image,
            audio: props.song.audio
        }

        const query = `mutation Mutation($input: libraryInput) {
            addToLibrary(input: $input)
        }`;
        
        await fetch("/graphql", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query, variables:{input}})
        })
        props.toast(props.song.name);
    }

    const removeFromLibrary = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let input = JSON.parse(localStorage.getItem("user") || "{}").name;
        let libnames = [input]
        if(props.mode == 'home'){
            const query = `query Query($input: String!) {
                getAllLibraries(input: $input)
              }`;
              const response = await fetch("/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query, variables: { input } }),
              });
              const result = await response.json();
              result.data.getAllLibraries.forEach((lib:string)=>{
                libnames.push(libnames[0]+lib)
              })
        }
        else{
            libnames[0]+=props.mode
        }
        libnames.forEach(async(lib, ind) => {
            const input = {
                username: lib,
                name: props.song.name,
                artist_name: props.song.artist_name,
                album_name: props.song.album_name,
                album_image: props.song.album_image,
                audio: props.song.audio
            }
            const query = `mutation Mutation($input: libraryInput) {
                removeFromLibrary(input: $input)
            }`;
            
            await fetch("/graphql", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query, variables:{input}})
            })
            if(ind == libnames.length - 1){
                navigate('/library/'+props.mode)
            }
        })
    }

    const Play = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/play/"+props.song.name, {state:{src: props.song.audio, album: props.song.album_image}});
    }

    return(
        <>
        <div className="songCard">
            <div>
                <img src={props.song.album_image} alt={props.song.album_name} />
                <h4>{props.song.artist_name}</h4>
                <p>{props.song.name}</p>
            </div>
            <div>
            <button onClick={Play} title="Play"><FaPlay /></button>
    {props.mode === 'main' ? (
      <button onClick={addToLibrary} title="Add to Library"><FaPlus /></button>
    ) : (
      <button onClick={removeFromLibrary} title="Remove from Library"><FaMinus /></button>
    )}
            </div>
        </div>
        </>
    );    
}

export default SongCard;
