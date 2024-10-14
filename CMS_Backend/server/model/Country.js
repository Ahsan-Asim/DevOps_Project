const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  // Default MongoDB _id
    country_id: { type: Number, unique: true },  // Custom country_id field
    name: { type: String, required: true },
});

// Pre-save hook to auto-increment the country_id before saving a new country
countrySchema.pre('save', async function(next) {
    if (this.isNew) {
        this.country_id = await getNextSequence('country');  // Get the next sequence for country
    }
    next();
});

module.exports = mongoose.model('Country', countrySchema);
