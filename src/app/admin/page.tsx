import DailyCardAdminForm from "@/components/admin/DailyCardAdminForm";
import { logoutAction } from "@/lib/actions/admin";
import { hasValidAdminSession } from "@/lib/adminAuth";
import { getDailyCard } from "@/lib/dailyCard";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  if (!(await hasValidAdminSession())) {
    redirect("/admin/login");
  }

  const current = await getDailyCard();

  return (
    <div className="min-h-[70vh] flex flex-col items-center px-6 py-16 bg-mystic-glow gap-6">
      <form action={logoutAction} className="w-full max-w-xl flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Cerrar sesión
        </button>
      </form>

      <DailyCardAdminForm current={current} />
    </div>
  );
}
