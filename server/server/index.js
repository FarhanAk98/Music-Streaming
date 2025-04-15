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

async function startServer() {
    const server = new ApolloServer({
        typeDefs: fs.readFileSync(require.resolve('./qlschema.graphql'), 'utf-8'), 
        resolvers: resolvers,
        persistedQueries: {
            cache: 'bounded',
        }
    })
    databaseConnect();

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
}

startServer()

module.exports = app;
