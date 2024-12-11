import { ParticipantModel } from "../models/participantSchema.js";
import ExcelJS from 'exceljs';
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
export const generateExcel = async (req, res) => {
    try {
        const participants = await ParticipantModel.find().sort({ teamName: 1 });
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Participants');
        worksheet.columns = [
            { header: 'Team Name', key: 'teamName', width: 20 },
            { header: 'First Name', key: 'firstName', width: 20 },
            { header: 'Last Name', key: 'lastName', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'National Cart ID', key: 'NationalCartId', width: 20 },
            { header: 'Registration Date', key: 'registrationDate', width: 20 },
            { header: 'Skills', key: 'skills', width: 30 },
            { header: 'Participation Category', key: 'participationCategory', width: 20 },
            { header: 'Participated Before', key: 'participatedBefore', width: 15 },
            { header: 'GitHub Link', key: 'githubLink', width: 30 },
            { header: 'LinkedIn Link', key: 'linkedinLink', width: 30 },
            { header: 'Portfolio Link', key: 'portfolioLink', width: 30 },
        ];
        participants.forEach(participant => {
            worksheet.addRow({
                firstName: participant.firstName,
                lastName: participant.lastName,
                email: participant.email,
                phone: participant.phone,
                NationalCartId: participant.NationalCartId,
                teamName: participant.teamName,
                registrationDate: participant.registrationDate,
                skills: participant.skills.join(', '),
                participationCategory: participant.participationCategory,
                participatedBefore: participant.participatedBefore ? 'Yes' : 'No',
                githubLink: participant.githubLink,
                linkedinLink: participant.linkedinLink || 'N/A',
                portfolioLink: participant.portfolioLink || 'N/A',
            });
        });

        
        let startRow = 2; 
        for (let i = 0; i < participants.length; i++) {
            const currentTeam = participants[i].teamName;
            const nextTeam = participants[i + 1]?.teamName;
            if (currentTeam !== nextTeam || i === participants.length - 1) {
                if (startRow !== i + 2) {
                    worksheet.mergeCells(`F${startRow}:F${i + 2}`);
                }
                startRow = i + 3; 
            }
        }
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=participants.xlsx'
        );
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ message: 'Error generating Excel file', error: error.message });
    }
};


