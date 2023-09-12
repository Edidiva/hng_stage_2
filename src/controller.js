import { createPersonValidator } from './validator.js';
import { Person } from './model.js';
import mongoose from 'mongoose';


// createPerson function
const createPerson = async (req, res) => {
    const { error } = createPersonValidator.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // Create a new Person document
        const person = new Person({
            name: req.body.name
        });

        // Save the document to the database
        await person.save();
        const {_id:id} = person;
        return res.status(201).json({ name: req.body.name, id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
};


// getPerson function
const getPerson = async (req, res) => {
    
   
    try {
        const { id } = req.query; // Get the ID from request parameters
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid ID format",
            });
        };
        const users = await Person.findOne({ _id:id });

        if (!users) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({name:users.name, id});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server error" });
        
    }
};


// updatePerson function
const updatePerson = async (req, res) => {
    const { value, error } = createPersonValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { id } = req.params; // Get the ID from request parameters
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid ID format",
            });
        }
        const user = await Person.findOne({ _id: id });

        if (!user) {
            return res.status(404).json({
                error: "ID doesn't match any person in the database",
            });
        }

        user.name = value.name;
        await user.save();

        return res.status(200).json({name:value.name, id});
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server error");
    }
};


// deletePerson function
const deletePerson = async (req, res) => {
    const { id } = req.params; // Get the ID from request parameters
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid ID format",
            });
        }
    try {
        const user = await Person.deleteOne({ _id: id });
        if (!user.deletedCount) {
            return res.status(404).json("User not found");
        }
        return res.status(200).json("USER DATA DELETED");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
};


export{
    createPerson,
    getPerson,
    updatePerson,
    deletePerson
};
