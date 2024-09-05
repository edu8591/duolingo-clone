import { getIsAdmin } from "@/lib/admin";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const App = dynamic(() => import("./app"), { ssr: false });
export default function AdminPage() {
  const isAdmin = getIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <App />;
}
