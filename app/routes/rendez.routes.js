module.exports = (app) => {
    const rendezs = require('../controllers/rendez.controller.js');


    app.post('/rendezs', rendezs.create);

    
    app.get('/rendezs', rendezs.findAll);

   
    app.get('/rendezs/:rendezId', rendezs.findOne);

    
    app.put('/rendezs/:rendezId', rendezs.update);

    
    app.delete('/rendezs/:rendezId', rendezs.delete);
}
