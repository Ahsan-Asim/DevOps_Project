const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  // Default MongoDB _id
    teacher_id: { type: Number, unique: true },  // Custom teacher_id field
    name: { type: String, required: true },
    subject: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },  // Reference to School model
});

// Pre-save hook to auto-increment the teacher_id before saving a new teacher
teacherSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.teacher_id = await getNextSequence('teacher');  // Get the next sequence for teacher
    }
    next();
});

module.exports = mongoose.model('Teacher', teacherSchema);
