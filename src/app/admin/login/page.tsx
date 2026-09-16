import LoginForm from "@/components/admin/LoginForm";
import { hasValidAdminSession } from "@/lib/adminAuth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  if (await hasValidAdminSession()) {
    redirect("/admin");
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16 bg-mystic-glow">
      <LoginForm />
    </div>
  );
}
