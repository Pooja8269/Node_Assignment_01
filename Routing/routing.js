const express = require('express');
const app = express();
app.use(express.json());
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
var router = express.Router();

/***
 * Json Data 
 */
const movies = [
    {Film_Id: 1, Film_Category: "Bollywood", Film_Title: "Jodha-Akbar", Director : "Ashutosh Gowariker", Release_Date: "1-02-2014", Film_Rating: 4},
    {Film_Id: 2, Film_Category: "Hollywood", Film_Title: "Avengers", Director : "Joss Whedon", Release_Date: "27-04-2019", Film_Rating: 5},
    {Film_Id: 3, Film_Category: "Telugu", Film_Title: "Geetha-Govindam",Director : "Parasuram", Release_Date: "4-05-2016", Film_Rating: 3},
    {Film_Id: 4, Film_Category: "Cartoon", Film_Title: "Frozen",Director : "Jennifer Lee", Release_Date: "1-03-2018", Film_Rating: 4}
]

/**
 * @author Pooja Sharma
 * To fetch all movies data
 */
router.get('/', (req, res) => {
    res.send(movies);
 });


/**
 * @author Pooja Sharma
 * To fetch perticuler movie data by ID
 */
router.get('/:Film_Id', (req, res) => {
   const movieId = movies.find(m => m.Film_Id === parseInt(req.params.Film_Id));
    if(!movieId) return res.status(404).send('This movie id is not available');
     res.send(movieId);
});


/**
 * @author Pooja Sharma
 * To add new movie data
 */
router.post('/', (req, res) => {
     //Valid movie data validation
    const { error } = validateInputdata(req.body);
     if(error) return res.status(400).send(error.details[0].message);
   
  const newMovie = {
        Film_Id: movies.length + 1,
        Film_Category: req.body.Film_Category,
        Film_Title: req.body.Film_Title,
        Director: req.body.Director,
        Release_Date: req.body.Release_Date,
        Film_Rating: req.body.Film_Rating,
    };

    // Add movie data
    movies.push(newMovie);
    res.send(newMovie);
});

/***
 * @author Pooja Sharma
 * Update movie name by ID
 */

router.put('/:Film_Id', (req, res) => {
    //Name validation
    const new_movie_name = movies.find(m => m.Film_Id === parseInt(req.params.Film_Id));
    if(!new_movie_name) return res.status(404).send('This movie id is not available');

    // Movie data validation
    const { error } = validateInputdata(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Update movie data
    new_movie_name.Film_Title = req.body.Film_Title;
    res.send(new_movie_name);
});

/***
 * @author Pooja Sharma
 * Delete movie data by id
 */

router.delete('/:Film_Id', (req, res) => {
    // Category validation
    const old_movie_Id = movies.find(m => m.Film_Id === parseInt(req.params.Film_Id));
    if(!old_movie_Id) return res.status(404).send('This movie id is not available');

    // delete movie data
    const number = movies.indexOf
    
    (old_movie_Id);
    movies.splice(number,1);

    res.send(old_movie_Id);
});

/**
 * Data validation
 */
function validateInputdata(result) {
 
    const schema = {
        Film_Category:Joi.string().min(3).required(),
        Film_Title: Joi.string().min(3).required(),
        Director: Joi.string().min(2).required(), 
        Release_Date:Joi.date().format('DD-MM-YYYY'),
        Film_Rating:Joi.number().min(1).required()
    }

    return Joi.validate(result, schema);
}

module.exports = router;