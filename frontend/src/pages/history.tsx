import LeaderBoard from "@/components/LeaderBoard";
import MatchHistory from "@/components/MatchHistory";
import DashboardLayout from "@/layouts/DashboardLayout";
import { ReactNode } from "react"

History.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;


export default function History() {
    return (
      <div className="flex gap-3 flex-wrap lg:flex-nowrap">
        <LeaderBoard />
        <MatchHistory />
      </div>
    );
  }