

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return res.status(500).json({ error: "MONGODB_URI is not defined in environment variables" });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("employee"); 
    const collection = db.collection("users");

    if (req.method === "POST") {
    
      const { firstName, lastName, email, phone, role } = req.body;
    
      if (!firstName || !lastName || !email || !phone || !role) {
        return res.status(400).json({ error: "All fields are required" });
      }
    
      const newEmployee = { firstName, lastName, email, phone, role, createdAt: new Date() };
      const result = await collection.insertOne(newEmployee);
    
      return res.status(201).json({
        message: "Employee added successfully!",
        employee: { _id: result.insertedId, ...newEmployee },
      });
    }
     else if (req.method === "GET") {
      // Fetch all employees
      const employees = await collection.find({}).toArray();
      return res.status(200).json(employees);
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Database error", details: error.message });
  } finally {
    await client.close();
  }
}

