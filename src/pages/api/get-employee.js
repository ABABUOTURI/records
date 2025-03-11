import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Employee ID is required" });

  // Validate MongoDB ObjectId format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Employee ID format" });
  }

  try {
    const { db } = await connectToDatabase();
    const employee = await db.collection("users").findOne({ _id: new ObjectId(id) });

    if (!employee) return res.status(404).json({ error: "Employee not found" });

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
