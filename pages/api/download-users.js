import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.resolve(process.cwd(), "data/users.json");
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="users.json"');
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(fileContent);
  } catch (error) {
    res.status(500).json({ message: "Error reading the users file." });
  }
}
