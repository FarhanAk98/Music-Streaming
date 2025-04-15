const supabaseUrl = process.env.DB_URL;
const supabaseKey = process.env.DB_KEY;
const api = process.env.MUSIC_API
const { createClient } = require('@supabase/supabase-js');
const mysql = require('mysql2');
let db;

function databaseConnect() {
    db = createClient(supabaseUrl, supabaseKey);
}

async function userAuthentication(_, { input }) {
    const email = mysql.escape(input.email).substring(1, input.email.length + 1)
    const password = mysql.escape(input.password).substring(1, input.password.length + 1)
    let { data: user, error } = await db
        .from('user')
        .select("*")
        .eq("email", email)
        .eq("password", password)
    console.log(user, error)
    return user[0].name
}

async function createUser(_, { input }) {
    let name = mysql.escape(input.name).substring(1, input.name.length + 1)
    const email = mysql.escape(input.email).substring(1, input.email.length + 1)
    const password = mysql.escape(input.password).substring(1, input.password.length + 1)
    await db
        .from('user')
        .insert({ name: name, email: email, password: password })
        .select()

    name = name.replace(/\s+/g, "").toLowerCase();
    name += "library";
    await db
        .rpc('create_library', {
            name
        })
}

async function queryTracks(_, { input }) {
    let query = "";
    if (input.name)
        query += "&name=" + input.name;
    if (input.artist)
        query += "&artist_name=" + input.artist;
    if (input.album)
        query += "&album_name=" + input.album;
    if (input.genre)
        query += "&tages=" + input.genre;
    if (!query)
        query += "&boost=popularity_week"
    const response = await fetch(api + query, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json();
    return result.results
}

async function getLibrary(_, { input }) {
    const username = input.replace(/\s+/g, "").toLowerCase();
    const { data, error } = await db.from(username + 'library')
        .select()
    return data
}

async function getAllLibraries(_, { input }) {
    const pattern = input.replace(/\s+/g, "").toLowerCase();
    const { data, error } = await db
        .rpc('get_libraries', {
            pattern
        })
    return data.map((name) => {
        let library = name.substring(pattern.length, name.length - 7);
        if (library.length > 0) {
            library = library.substring(0, 1).toUpperCase() + library.substring(1, library.length)
        }
        return library
    }).filter((lib) => lib.length > 0)
}

async function addLibrary(_, { input }) {
    let name = mysql.escape(input).substring(1, input.length + 1)
    name = name.replace(/\s+/g, "").toLowerCase();
    name += "library";
    await db
        .rpc('create_library', {
            name
        })
}

async function addToLibrary(_, { input }) {
    const username = input.username.replace(/\s+/g, "").toLowerCase();
    const name = mysql.escape(input.name).replace(/\\/, "").replace('&amp;', "");
    const artist = mysql.escape(input.artist_name).replace(/\\/, "").replace('&amp;', "");
    const album = mysql.escape(input.album_name).replace(/\\/, "").replace('&amp;', "");
    const albumImg = mysql.escape(input.album_image).replace(/\\/, "").replace('&amp;', "");
    const audio = mysql.escape(input.audio).replace(/\\/, "").replace('&amp;', "");
    await db.from(username + 'library').insert({
        name: name.substring(1, name.length - 1),
        artist_name: artist.substring(1, artist.length - 1),
        album_name: album.substring(1, album.length - 1),
        album_image: albumImg.substring(1, albumImg.length - 1),
        audio: audio.substring(1, audio.length - 1)
    });
}

async function removeFromLibrary(_, { input }) {
    const username = input.username.replace(/\s+/g, "").toLowerCase();
    await db.from(username + 'library').delete().eq(
        'name', mysql.escape(input.name).substring(1, input.name.length + 1),
        'artist_name', mysql.escape(input.artist_name).substring(1, input.artist_name.length + 1),
        'album_name', mysql.escape(input.album_name).substring(1, input.album_name.length + 1),
        'album_image', mysql.escape(input.album_image).substring(1, input.album_image.length + 1),
        'audio', mysql.escape(input.audio).substring(1, input.audio.length + 1)
    );
}

module.exports = { databaseConnect, userAuthentication, createUser, queryTracks, getLibrary, getAllLibraries, addLibrary, addToLibrary, removeFromLibrary }
