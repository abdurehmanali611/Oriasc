"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Branches } from "@/constants";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/constants/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-100 animate-pulse rounded-xl" />
  ),
});

export default function BranchFinder() {
  const [activeTab, setActiveTab] = useState("Regional");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const tabs = ["Regional", "Zonal", "Woreda"];

  const filteredBranches = Branches.filter(
    (branch) =>
      branch.Category === activeTab &&
      branch.Name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedBranch = Branches.find((b) => b.id === selectedId);
  const mapCenter: [number, number] = selectedBranch
    ? [selectedBranch.Latitude, selectedBranch.Longitude]
    : [9.0192, 38.7525];

  return (
    <div className="max-w-5xl mx-auto my-12 p-8 bg-white border-2 border-[#b89146] rounded-[2.5rem] shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-serif font-bold text-[#1a2b4b]">
          Our Global Presence
        </h2>
        <p className="text-lg text-[#1a2b4b] mt-2">
          Find a Local Center Near You
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex border-b mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedId(null);
                }}
                className={`px-6 py-2 font-semibold transition-all cursor-pointer ${
                  activeTab === tab
                    ? "border-b-2 border-[#b89146] text-[#1a2b4b]"
                    : "text-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <Map branches={filteredBranches} center={mapCenter} />
        </div>

        <div className="flex-1">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Enter city, state, or zip code..."
              className="w-full p-3 pr-12 border rounded-md bg-gray-50 focus:outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-[#1a2b4b] text-white rounded-r-md">
              <Search size={20} />
            </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto border rounded-lg [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth p-3">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="pb-3 font-semibold">Branch Name</th>
                  <th className="pb-3 font-semibold">City</th>
                  <th className="pb-3 font-semibold text-right">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBranches.map((branch) => (
                  <tr
                    key={branch.id}
                    onClick={() => setSelectedId(branch.id)}
                    className={`cursor-pointer transition-colors ${
                      selectedId === branch.id
                        ? "bg-gray-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="py-4 font-bold text-[#1a2b4b]">
                      {branch.Name}
                    </td>
                    <td className="py-4 text-gray-600">{branch.City}</td>
                    <td className="py-4 text-gray-600 text-right">
                      {branch.Contact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
