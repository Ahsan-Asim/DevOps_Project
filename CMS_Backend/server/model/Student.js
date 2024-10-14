const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  // Default MongoDB _id
    student_id: { type: Number, unique: true },  // Custom student_id field
    name: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true },
    address: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' },  // Reference to Parent model
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },  // Reference to School model
});

// Pre-save hook to auto-increment the student_id before saving a new student
studentSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.student_id = await getNextSequence('student');  // Get the next sequence for student
    }
    next();
});

module.exports = mongoose.model('Student', studentSchema);
