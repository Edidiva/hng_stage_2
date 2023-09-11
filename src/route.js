import express from 'express';
import { createPerson, deletePerson, getPerson, updatePerson } from './controller.js';
const router = express.Router();


router.post('/', createPerson );
router.get('/', getPerson );
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

export { router };
