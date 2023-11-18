module.exports = (app) => {
    const parks = require('../controllers/park.controller.js');


    app.post('/parks', parks.create);

    
    app.get('/parks', parks.findAll);

   
    app.get('/parks/:parkId', parks.findOne);

    
    app.put('/parks/:parkId', parks.update);

    
    app.delete('/parks/:parkId', parks.delete);
}
