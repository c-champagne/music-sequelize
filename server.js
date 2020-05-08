const config = {
    host: 'localhost',
    port: 5432,
    database: 'music_db',
    user: 'postgres',
    password: 'pwhere'
}

const pgp = require('pg-promise')();
const db = pgp(config);

const co = require('co');
const prompt = require('prompt-promise');
let res= [];
let newArtist= [];

//initial prompt
/* prompt('Do you want to create an artist, album, song, or songwriter? ')
    .then(function startCreate (option) {
        if (option == 'artist' || 'Artist') {
            
        }
    }) */


//Create Artist
 prompt('Artist name? ')
    .then(function artistName (val) {
       newArtist.push(val); 
       console.log(newArtist);
       prompt.done();
       //Insert goes here
       let query = `INSERT INTO artist VALUES (default, $1)`;
       db.result(query, newArtist)
           .then((result) => {
                let findArtist = `SELECT * FROM artist WHERE name=$1`;
                db.one(findArtist, newArtist)
                    .then((row) => {
                        console.log('Created artist with an id of ' + row.id + '.');     
                        pgp.end();          
                    })
           .catch((e) => {console.error(e)});
            })
            .catch(function rejected(err) {
                console.log('error: ', err.stack);
                prompt.finish();
   }) 
    
// Create Album
  prompt('Album name? ')
    .then(function albumName(val) {
        res.push(val);
        return prompt('Album year? ')
            .then(function albumYear(val) {
                res.push(val);
                return prompt('Artist ID? ')
                    .then(function artistID(val) {
                        res.push(val);
                        console.log(res);
                        prompt.done();
                        //Insert goes here
                        // let query = `INSERT INTO album VALUES (default, '${res[0], res[1], res[2]}'`;
                        let query = `INSERT INTO album VALUES (default, $1, $2, $3)`;
                        // let query = `INSERT INTO album VALUES (default, Test, 2, 3)`
                        db.result(query, res)
                            .then(function (result) {
                                console.log(result);
                                pgp.end();
                            })
                            .catch((e) => {console.error(e)}); 
                    })
                .catch(function rejected(err) {
                    console.log('error: ', err.stack);
                    prompt.finish();
                })
            })

    })
 


//Create Track
let newTrack = [];
prompt('Track name? ')
    .then(function trackName(val) {
        newTrack.push(val);
        return prompt('Track duration? ')
            .then(function trackDur(val) {
                newTrack.push(val);
                return prompt('Artist ID? ')
                    .then(function artistID(val) {
                        newTrack.push(val);
                        console.log(newTrack);
                        prompt.done();
                        //Insert goes here
                        // let query = `INSERT INTO album VALUES (default, '${res[0], res[1], res[2]}'`;
                        let query = `INSERT INTO song VALUES (default, $1, $2, $3)`;
                        // let query = `INSERT INTO album VALUES (default, Test, 2, 3)`
                        db.result(query, newTrack)
                            .then(function (result) {
                                console.log(result);
                                pgp.end();
                            })
                            .catch((e) => {console.error(e)}); 
                    })
                .catch(function rejected(err) {
                    console.log('error: ', err.stack);
                    prompt.finish();
                })
            })

    })
})
