const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  // Default MongoDB _id
    // school_id: { type: Number, unique: true },  // Custom school_id field
    name: { type: String, required: true },
    address: { type: String, required: true },
    // cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },  // Reference to City model
});

// Pre-save hook to auto-increment the school_id before saving a new school
schoolSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.school_id = await getNextSequence('school');  // Get the next sequence for school
    }
    next();
});

module.exports = mongoose.model('School', schoolSchema);
