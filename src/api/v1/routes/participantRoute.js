import express from 'express';
import {
    addParticipant,
    getAllParticipants,
    getParticipantById,
    getParticipantByName,
    generateExcel
} from '../controllers/participantController.js';
const router = express.Router();
router.post('/addParticipant', addParticipant);
router.get('/participant', getAllParticipants);
router.get('/generate-excel', generateExcel);
router.get('/search/by-name', getParticipantByName);
router.get('/:id', getParticipantById);

export default router;

