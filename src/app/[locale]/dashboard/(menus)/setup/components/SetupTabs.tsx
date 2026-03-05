"use client";

import { Link } from "@/src/i18n/navigation";

interface TabItem {
  id: string;
  label: string;
  href?: string;
}

interface SetupTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChangeTab?: (id: string) => void;
}

export function SetupTabs({ tabs, activeTab, onChangeTab }: SetupTabsProps) {
  return (
    <div className="flex gap-8 border-b-2 border-gray-200">
      {tabs.map((tab) => {
        const active = activeTab === tab.id;

        if (tab.href) {
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`
                pb-3 text-sm font-medium transition-colors max-w-70 w-full text-center
                ${
                  active
                    ? "text-primary-100 border-b-2 border-primary-100"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}>
              {tab.label}
            </Link>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab?.(tab.id)}
            className={`
              pb-3 text-sm font-medium transition-colors max-w-70 w-full text-center    
              ${
                active
                  ? "text-primary-100 border-b-2 border-primary-100"
                  : "text-gray-500"
              }
            `}>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
