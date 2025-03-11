import { connectToDatabase } from "../../lib/mongodb";
import Employee from "../../models/Employee";
import mongoose from "mongoose";


export default async function handler(req, res) {
    console.log("Received request:", req.method, req.url, req.body);

    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        await connectToDatabase();

        const { id, firstName, lastName, phone } = req.body;

        if (!id || !firstName || !lastName || !phone) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Ensure `id` is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Employee ID format" });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id, // No need to wrap in `new ObjectId(id)`
            { firstName, lastName, phone },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        return res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
    } catch (error) {
        console.error("Error updating employee:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
