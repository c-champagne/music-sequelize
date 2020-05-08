
//Setting up Sequelize and info to connect to db.
const Sequelize = require('sequelize');
const sequelize = new Sequelize('music_db', 'postgres', 'pwhere', {
    host: 'localhost',
    dialect: 'postgres'
});


//Setting up prompt-promise, array to hold inputs
const prompt = require('prompt-promise');
let res= [];

//Testing connection - connection worked!
/* sequelize
    .authenticate()
    .then(() => {
        console.log('Connection established');
    })
    .catch(err => {
        console.error('Unable to connect', err);
    }); */

    //Setting up album "model" for the album table using Sequelize.
    const Model = Sequelize.Model;
    class album extends Model {}

    album.init({
        name: {
            type: Sequelize.STRING,
            allowNull: true     //For BP, these should probably be false, but did not set when original table was created 
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        artist_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
    }, {sequelize, modelName: 'album', tableName: 'album', timestamps: false, freezeTableName: true});  //remove timestamps and freeze name

    //Testing Sequalize .create method with hard coded data - worked!
    /* album.create({name:"Good News", year:"2004", artist_id: 1}).then(album => {
        console.log("Created album:", album.name)
    }) */

    //Used .findAll to test db connection again - worked!
   /*  album.findAll().then((row) => {
        row.forEach((name) => console.log(name));
    }) */


    //Prompt-chain from previous pg-promise exercise, using Sequelize now.
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
                        album.create({name: res[0], year: res[1], artist_id: res[2]}).then(album => {
                            console.log("Created album:", album.name);
                            //Started working on this piece, not finished/working
                            /* return prompt('Create another album?')
                                .then(function addAlbum(response){
                                    if (response == "yes" || "Yes") {
                                        res = [];
                                        prompt('Album name? ')
                                        .then(albumName(val));
                                    }
                                    else {
                                        prompt.finish();
                                    }
                                }) */
                        })
                            .catch((e) => {console.error(e)}); 
                            
                    })
                .catch(function rejected(err) {
                    console.log('error: ', err.stack);
                    prompt.finish();
                    
                })
                
            })

    })
    
 /*    prompt('Create another album?' )
    if (response == 'Yes'|| 'yes') {
        albumPrompt();
    }
    else (prompt.finish()); */