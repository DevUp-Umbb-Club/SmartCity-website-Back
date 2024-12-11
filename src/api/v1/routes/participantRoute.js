import express from 'express';
import {
    addParticipant,
    getAllParticipants,
    getParticipantById,
    getParticipantByName,
    generateExcel
} from '../controllers/participantController.js';

const router = express.Router();

// Add participant
router.post('/addParticipant', addParticipant);

// Get all participants
router.get('/participant', getAllParticipants);

// Generate Excel file for participants
router.get('/generate-excel', generateExcel);

// Search participant by name
router.get('/search/by-name', getParticipantByName);

// Get participant by ID
router.get('/:id', getParticipantById);

export default router;

