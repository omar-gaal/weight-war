
import { GoalEditor } from "@/src/components/GoalEditor";

export default function DashboardPage() {
    return (
    <main className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-2">Manage your goal and track your weight</p>

        <GoalEditor/>
    </main>
    )
}