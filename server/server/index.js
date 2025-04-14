const express = require('express');
require('dotenv').config({path:'./server/env.env'})
const {databaseConnect, userAuthentication, createUser, queryTracks, getLibrary, getAllLibraries, addLibrary, addToLibrary, removeFromLibrary} = require('./db');
const fs = require('fs');
const app = express();

const resolvers = {
    Query: {
        userAuthentication: userAuthentication,
        searchTracks: queryTracks,
        getLibrary: getLibrary,
        getAllLibraries: getAllLibraries
    },
    Mutation: {
        createUser: createUser,
        addLibrary: addLibrary,
        addToLibrary: addToLibrary,
        removeFromLibrary: removeFromLibrary
    }
}

const {ApolloServer} = require('apollo-server-express');
const { get } = require('https');

const server = new ApolloServer({typeDefs: fs.readFileSync('./qlschema.graphql', 'utf-8'), resolvers: resolvers})

server.start().then(
    (res)=>{
        server.applyMiddleware({app,path:'/graphql'});
        databaseConnect();
        app.listen(process.env.SERVER_PORT, ()=>{
            console.log('API server started on port 8000');
        })
    }
);
