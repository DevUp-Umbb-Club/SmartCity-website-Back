import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v);
            },
            message: 'Invalid email format'
        }
    },
   
});



const ParticipantModel = mongoose.model('Participant', participantSchema);
export  { ParticipantModel };