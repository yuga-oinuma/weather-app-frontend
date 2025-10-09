import React, { useState } from "react";
import PageSection from "../components/layout/PageSection";
import ReportDaily from "../components/layout/ReportDaily";
import ReportWeekly from "../components/layout/ReportWeekly";

const tabs = [
  { key: "daily", label: "日次レポート" },
  { key: "weekly", label: "週次レポート" },
  // { key: "monthly", label: "月次レポート" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const Report: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("daily");

  return (
    <PageSection>
      <div className="mx-auto w-full max-w-screen-md">
        {/* タブボタン行 */}
        <div
          className="
          flex w-full overflow-hidden border border-gray-300
          text-center text-sm sm:text-base sticky top-16 z-40
        "
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={[
                  "flex-1 py-3 transition-colors duration-150",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 border-r-2 last:border-r-0",
                  isActive
                    ? "bg-blue-50 font-bold text-blue-700 border-b-2 border-b-blue-500"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* タブ内容 */}
        <div>
          {activeTab === "daily" && <ReportDaily />}
          {activeTab === "weekly" && <ReportWeekly />}
          {/* {activeTab === "monthly" && <ReportWeekly />} */}
        </div>
      </div>
    </PageSection>
  );
};

export default Report;
