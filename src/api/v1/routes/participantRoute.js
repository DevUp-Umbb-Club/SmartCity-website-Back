import express from 'express';
import {
    addParticipant,
    getAllParticipants,
    getParticipantById,
    getParticipantByName,
} from '../controllers/participantController.js';

const router = express.Router();
router.post('/addParticipant', addParticipant);
router.get('/participant', getAllParticipants);
router.get('/:id', getParticipantById);
router.get('/search/by-name', getParticipantByName);

export default router;
