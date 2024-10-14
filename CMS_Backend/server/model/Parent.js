const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  // Default MongoDB _id
    parent_id: { type: Number, unique: true },  // Custom parent_id field
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    childrenIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]  // Reference to Student model
});

// Pre-save hook to auto-increment the parent_id before saving a new parent
parentSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.parent_id = await getNextSequence('parent');  // Get the next sequence for parent
    }
    next();
});

module.exports = mongoose.model('Parent', parentSchema);
