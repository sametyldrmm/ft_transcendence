import { ReactNode } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";

Home.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default function Home() {
  return (
    <div className="bg-[url(/pong.png)] min-h-screen bg-cover"></div>
  );
}
