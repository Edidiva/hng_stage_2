import { createPersonValidator } from './validator.js';
import { Person } from './model.js';
import { getNextId } from './utils.js';

const createPerson = async (req, res) => {
    const { value, error } = createPersonValidator.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // Create a new Person document
        const id = await getNextId();
        const person = await Person.create({
            name: value.name,
            id,
        });

        return res.status(201).json(person);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
};

const getPerson = async (req, res)=>{
    const {name} = req.query;
    try {
        const users = await Person.findOne({name});
        if (!users) {
        return res.status(404).json({ error: "Person not found" })};
        // Access the properties of the retrieved person
        const { name: personName, id } = users;

        return res.status(200).json({ 
            name: personName,
            id,
        });
        
    } catch (error) {
        return res.status(500).json({error:"Internal Server error"})
    }

}

const updatePerson = async (req, res)=>{
    const { value, error } = createPersonValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    };
     const id = Number(req.params.id) //get the id of the person as a path parameter
     console.log(id)

     try {
         const user = await Person.findOne({id});
         if (!user) {
            return res.status(404).json({
                error: "id doesnt match any person on the database"
            })
         }
         user.name = value.name;
         await user.save();
         
         console.log(user)
         return res.status(200).json("your profile has been updated")
     } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server error");
        
     }

};

const deletePerson = async (req,res)=>{
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json("Please provide a valid id");
    }

    try {
        const user = await Person.deleteOne({id:id});
        if (!user) {
            return res.status(404).json("user not found");   
        }
        return res.status(200).json("USER DATA DELETED");
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}

export{
    createPerson,
    getPerson,
    updatePerson,
    deletePerson
};
