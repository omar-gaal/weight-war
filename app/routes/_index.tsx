import { connectToDatabase } from "~/db/database.server";


export async function Loader() {
  await connectToDatabase()
  return null;
}