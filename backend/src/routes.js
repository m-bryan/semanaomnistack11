const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('../src/controllers/OngController');
const IncidentController = require('../src/controllers/IncidentController');
const ProfileController = require('../src/controllers/ProfileController');
const SessionController = require('../src/controllers/SessionController');

const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }) 
}), IncidentController.delete);

routes.post('/sessions', SessionController.create);

module.exports = routes;