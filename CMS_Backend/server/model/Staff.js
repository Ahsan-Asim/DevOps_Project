const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  // Default MongoDB _id
    staff_id: { type: Number, unique: true },  // Custom staff_id field
    name: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String, required: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },  // Reference to School model
});

// Pre-save hook to auto-increment the staff_id before saving a new staff
staffSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.staff_id = await getNextSequence('staff');  // Get the next sequence for staff
    }
    next();
});

module.exports = mongoose.model('Staff', staffSchema);
