import { useState } from "react";
import AdminLayout from "./AdminLayout";
import AdminOverview from "./AdminOverview";
import AdminProjects from "./AdminProjects";
import AdminHeroManager from "./AdminHeroManager";
import AdminAnnouncementManager from "./AdminAnnouncementManager";
import AdminFreelancingManager from "./AdminFreelancingManager";

type AdminTab = "overview" | "projects" | "hero" | "announcement" | "freelancing";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<AdminTab>("overview");

    return (
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {activeTab === "overview" && (
                <AdminOverview onNavigate={(tab) => setActiveTab(tab)} />
            )}
            {activeTab === "projects" && <AdminProjects />}
            {activeTab === "hero" && <AdminHeroManager />}
            {activeTab === "announcement" && <AdminAnnouncementManager />}
            {activeTab === "freelancing" && <AdminFreelancingManager />}
        </AdminLayout>
    );
}
