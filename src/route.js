// router.js

const express = require('express');
const { createPerson, deletePerson, getPerson, updatePerson } = require('./controller');

const router = express.Router();

router.post('/', createPerson);
router.get('/', getPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

module.exports = 
    router
;

