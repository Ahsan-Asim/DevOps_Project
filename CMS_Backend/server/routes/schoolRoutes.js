const express = require('express');
const SchoolModel = require('../model/School'); // Adjust the path as necessary
const router = express.Router();



// Create a new school
router.post('/add_school', async (req, res) => {
    try {
        // Check for duplicate school name
        const existingSchool = await SchoolModel.findOne({ name: req.body.name });
        if (existingSchool) {
            return res.status(400).json({ error: 'School already exists' });
        }

        const newSchool = new SchoolModel(req.body);
        await newSchool.save();
        res.status(201).json(newSchool);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Other routes remain unchanged...


// Get all schools
router.get('/', async (req, res) => {
    try {
        const schools = await SchoolModel.find();
        res.status(200).json(schools);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a school by ID
router.get('/:id', async (req, res) => {
    try {
        const school = await SchoolModel.findById(req.params.id);
        if (!school) return res.status(404).json({ error: 'School not found' });
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a school
router.put('/:id', async (req, res) => {
    try {
        const updatedSchool = await SchoolModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSchool) return res.status(404).json({ error: 'School not found' });
        res.status(200).json(updatedSchool);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a school
router.delete('/:id', async (req, res) => {
    try {
        const deletedSchool = await SchoolModel.findByIdAndDelete(req.params.id);
        if (!deletedSchool) return res.status(404).json({ error: 'School not found' });
        res.status(200).json({ message: 'School deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
