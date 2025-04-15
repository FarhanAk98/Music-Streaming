const supabaseUrl = process.env.DB_URL;
const supabaseKey = process.env.DB_KEY;
const api = process.env.MUSIC_API
const { createClient } = require('@supabase/supabase-js');
const mysql = require('mysql2');
let db;

function databaseConnect(){
    db = createClient(supabaseUrl, supabaseKey);
}

async function userAuthentication(_, {input}){
    const email = mysql.escape(input.email).substring(1, input.email.length+1)
    const password = mysql.escape(input.password).substring(1, input.password.length+1)
    let { data: user, error } = await supabase
        .from('user')
        .select("*")
        .eq("email", email)
        .eq("pssword", password)
    
    console.log(user)
}

async function createUser(_, {input}){
    let name = mysql.escape(input.name).substring(1, input.name.length+1)
    const email = mysql.escape(input.email).substring(1, input.email.length+1)
    const password = mysql.escape(input.password).substring(1, input.password.length+1)
    let query = "insert into user(name, email, password) values(?, ?, ?)"
    await db.promise().query(query, [
        name,
        email,
        password
    ])

    name = name.replace(/\s+/g, "");
    query = "create table "+name+"library("+
        "name varchar(100)," +
        "artist_name varchar(100)," +
        "album_name varchar(100)," +
        "album_image varchar(100)," +
        "audio varchar(100)" +
    ")"
    await db.promise().query(query);
}

async function queryTracks(_, {input}){
    let query = "";
    if(input.name)
        query += "&name=" + input.name;
    if(input.artist)
        query += "&artist_name=" + input.artist;
    if(input.album)
        query += "&album_name=" + input.album;
    if(input.genre)
        query += "&tages=" + input.genre;
    if(!query)
        query += "&boost=popularity_week"
    const response = await fetch(api+query, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
    const result = await response.json();
    return result.results
}

async function getLibrary(_, {input}){
    const username = input.replace(/\s+/g, "").toLowerCase();
    const query = "Select * from "+username+"library";
    const [rows, fields] = await db.promise().query(query);
    return rows
}

async function getAllLibraries(_, {input}){
    const username = input.replace(/\s+/g, "").toLowerCase();
    const query = "show tables where Tables_in_musicservice like '%"+username+"%'";
    const [rows, fields] = await db.promise().query(query);
    return rows.map((r)=>{
        const name = r.Tables_in_musicservice
        let library = name.substring(username.length, name.length-7);
        if(library.length>0){
            library = library.substring(0, 1).toUpperCase() + library.substring(1, library.length)
        }
        return library
    }).filter((lib)=>lib.length>0)
}

async function addLibrary(_, {input}){
    let name = mysql.escape(input).substring(1, input.length+1)
    name = name.replace(/\s+/g, "");
    query = "create table "+name+"library("+
        "name varchar(100)," +
        "artist_name varchar(100)," +
        "album_name varchar(100)," +
        "album_image varchar(100)," +
        "audio varchar(100)" +
    ")"
    await db.promise().query(query);
}

async function addToLibrary(_, {input}){
    const username = input.username.replace(/\s+/g, "").toLowerCase();
    const query = "insert into "+username+"library(name, artist_name, album_name, album_image, audio) values(?, ?, ?, ?, ?)"
    const name = mysql.escape(input.name).replace(/\\/, "").replace('&amp;', "");
    const artist = mysql.escape(input.artist_name).replace(/\\/, "").replace('&amp;', "");
    const album = mysql.escape(input.album_name).replace(/\\/, "").replace('&amp;', "");
    const albumImg = mysql.escape(input.album_image).replace(/\\/, "").replace('&amp;', "");
    const audio = mysql.escape(input.audio).replace(/\\/, "").replace('&amp;', "");
    await db.promise().query(query, [
        name.substring(1, name.length-1),
        artist.substring(1, artist.length-1),
        album.substring(1, album.length-1),
        albumImg.substring(1, albumImg.length-1),
        audio.substring(1, audio.length-1)
    ]);
}

async function removeFromLibrary(_, {input}){
    const username = input.username.replace(/\s+/g, "").toLowerCase();
    const query = "delete from "+username+"library where name = ? and artist_name = ? and album_name = ? and album_image = ? and audio = ?"
    const [rows, fields] = await db.promise().query(query, [
        mysql.escape(input.name).substring(1, input.name.length+1),
        mysql.escape(input.artist_name).substring(1, input.artist_name.length+1),
        mysql.escape(input.album_name).substring(1, input.album_name.length+1),
        mysql.escape(input.album_image).substring(1, input.album_image.length+1),
        mysql.escape(input.audio).substring(1, input.audio.length+1)
    ]);
}

module.exports = {databaseConnect, userAuthentication, createUser, queryTracks, getLibrary, getAllLibraries, addLibrary, addToLibrary, removeFromLibrary}
