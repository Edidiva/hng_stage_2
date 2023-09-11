import { Person } from "./model.js";

async function getNextId() {
    try {
        let nextId = 1; // Starting with the first possible ID

        // searching until an unused ID is found
        while (true) {
            const existingPerson = await Person.findOne({ id: nextId });

            // If no document with this ID is found, it's available
            if (!existingPerson) {
                return nextId;
            }

            // Increment to the next ID and continue searching
            nextId++;
        }
    } catch (error) {
        console.error('Error getting next ID:', error);
        throw error;
    }
}

export{getNextId}