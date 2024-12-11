import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
    firstName: {
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
        trim: true,
        validate: {
            validator: function(v) {
                return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v);
            },
            message: 'Invalid email format'
        }
    },
    phone: {
        type: String,
        trim: true,
        required: true, 
    },
    NationalCartId: {
        type: Number,
        required: true, 
    },
    teamName: {
        type: String,
        trim: true,
        required: true, 
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    skills: [{
        type: String,
        required: true, 
    }],
    participationCategory: {
        type: String,
        enum: ['frontend developer', 'backend developer', 'fullstack developer', 'designer', 'ai developer', 'mobile developer'], 
        required: true, 
    },
    participatedBefore:{
        type:Boolean,
        required:true,
    },
    githubLink:{
        type: String,
        required:true,
    },
    linkedinLink:{
        type: String,
        required:false,
    },
    portfolioLink:{
        type: String,
        required:false,
    }
});

const ParticipantModel = mongoose.model('Participant', participantSchema);
export { ParticipantModel };
