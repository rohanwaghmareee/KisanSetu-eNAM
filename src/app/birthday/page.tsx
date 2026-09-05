import "@/app/globals.css";
import { EnchantedScene } from "@/components/3d/EnchantedScene";
import { TopNav } from "@/components/navigation/TopNav";
import { GlassModal } from "@/components/3d/GlassModal";
import { useState } from "react";

export default function BirthdayPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <TopNav />
      <EnchantedScene />
      <GlassModal open={showModal} onClose={() => setShowModal(false)} />
      <div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
        onClick={() => setShowModal(true)}
      >
        <button className="px-6 py-3 bg-crystal text-indigo-900 text-lg font-serif rounded-full shadow-glow hover:transition-all hover:shadow-xl">
          Enter Your Reverie
        </button>
      </div>
    </div>
  );
}