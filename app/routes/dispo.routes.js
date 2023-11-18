module.exports = (app) => {
    const dispos = require('../controllers/dispo.controller.js');


    app.post('/dispos', dispos.create);

    
    app.get('/dispos', dispos.findAll);

   
    app.get('/dispos/:dispoId', dispos.findOne);

    
    app.put('/dispos/:dispoId', dispos.update);

    
    app.delete('/dispos/:dispoId', dispos.delete);
}
