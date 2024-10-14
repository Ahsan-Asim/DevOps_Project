const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  // Default MongoDB _id
    city_id: { type: Number, unique: true },  // Custom city_id field
    name: { type: String, required: true },
    countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },  // Reference to Country model
});

// Pre-save hook to auto-increment the city_id before saving a new city
citySchema.pre('save', async function(next) {
    if (this.isNew) {
        this.city_id = await getNextSequence('city');  // Get the next sequence for city
    }
    next();
});

module.exports = mongoose.model('City', citySchema);
