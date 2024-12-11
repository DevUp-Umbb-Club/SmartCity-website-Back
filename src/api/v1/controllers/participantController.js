import { ParticipantModel } from "../models/participantSchema.js";
export const addParticipant = async (req, res) => {
    try {
        const participantData = req.body;
        const newParticipant = new ParticipantModel(participantData);
        const savedParticipant = await newParticipant.save();

        res.status(201).json({
            message: 'Participant added successfully',
            data: savedParticipant,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Error adding participant',
            error: error.message,
        });
    }
};

export const getAllParticipants = async (req, res) => {
    try {
        const participants = await ParticipantModel.find();
        res.status(200).json({
            message: 'Participants retrieved successfully',
            data: participants,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error retrieving participants',
            error: error.message,
        });
    }
};

export const getParticipantById = async (req, res) => {
    try {
        const { id } = req.params;

        const participant = await ParticipantModel.findById(id);

        if (!participant) {
            return res.status(404).json({
                message: 'Participant not found',
            });
        }

        res.status(200).json({
            message: 'Participant retrieved successfully',
            data: participant,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error retrieving participant',
            error: error.message,
        });
    }
};

export const getParticipantByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                message: 'Name query parameter is required',
            });
        }
        const participants = await ParticipantModel.find({
            $or: [
                { firstName: { $regex: name, $options: 'i' } }, 
                { lastName: { $regex: name, $options: 'i' } }
            ]
        });

        if (participants.length === 0) {
            return res.status(404).json({
                message: 'No participants found with the given name',
            });
        }

        res.status(200).json({
            message: 'Participants retrieved successfully',
            data: participants,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error retrieving participants by name',
            error: error.message,
        });
    }
};
