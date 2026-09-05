import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface GlassModalProps {
  open: boolean;
  onClose: () => void;
}

export const GlassModal = ({ open, onClose }: GlassModalProps) => {
  const [letterShown, setLetterShown] = useState(false);

  if (!open) {
    return null;
  }

return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center p-6 pointer-events-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div
        className="bg-glassDark/80 backdrop-blur-lg border border-white/10 rounded-2xl max-w-4xl w-full mx-4 p-8 transform overflow-hidden"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        {letterShown ? (
          <LetterContent onClose={onClose} />
        ) : (
          <CrystalCard onClose={onClose} setLetterShown={setLetterShown} />
        )}
      </div>
    </motion.div>
  );
};

const CrystalCard = ({ onClose, setLetterShown }: { onClose: () => void; setLetterShown: (v: boolean) => void }) => {
  return (
    <div className="relative text-center pt-12">
      <h2 className="text-3xl font-serif font-light mb-4 text-indigo-600">
        Happy Birthday!
      </h2>
      <p className="text-lg text-muted-foreground mb-6">
        Welcome to your enchanted reverie, {"Cherished One"}. A day woven with starlight and crystal whispers.
      </p>
      <button
        onClick={() => setLetterShown(true)}
        className="px-6 py-3 bg-crystal text-indigo-900 text-lg font-serif rounded-full transition-all hover:shadow-glow"
      >
        Read My Letter
      </button>
    </div>
  );
};

const LetterContent = ({ onClose }: { onClose: () => void }) => {
  const wishRef = useRef<HTMLButtonElement>(null);

  const handleMakeAWish = () => {
    // Trigger lantern/shooting star burst - could integrate with Three.js
    onClose();
  };

  return (
    <div className="relative w-full max-w-2xl">
      <h2 className="text-3xl font-serif font-light text-indigo-600 mb-6">
        A Letter from the Stars
      </h2>
      <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
        "Dear Cherished One,\n\nOn this beautiful day, the universe aligns to celebrate you. May your year ahead be filled with magical moments, quiet wonders, and dreams that take flight like butterflies in lavender moonlight. Know that you are loved beyond the stars and cherished in every sunrise."</p>

      <div className="mt-8 pt-8 border-t border-white/5">
        <h3 className="text-xl font-medium text-indigo-500 mb-4">Make a Wish</h3>
        <button
          ref={wishRef}
          onClick={handleMakeAWish}
          className="w-full px-8 py-3 bg-crystal/20 text-indigo-300 font-serif rounded-full border border-white/10 text-lg transition-all hover:bg-crystal/30 hover:text-indigo-100"
        >
          Make a Wish &rarr;
        </button>
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-muted-foreground hover:text-indigo-300 transition-colors"
      >
        ← Close
      </button>
    </div>
  );
};