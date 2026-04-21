import React from "react";
import { motion } from "framer-motion";

const Fallback = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 5 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-black shadow-2xl overflow-hidden"
        >
          {/* Shimmer effect inside the logo container */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          />
          <div className="relative z-20 flex h-14 w-14 items-center justify-center bg-black rounded-lg">
            <img
              src="/favicon.ico"
              alt="CSK Tailored Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[10px] font-medium tracking-[0.3em] text-neutral-500 uppercase"
          >
            Loading Module
          </motion.div>
          
          {/* Minimalist Animated Loading Bar */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100px", opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="h-[1px] rounded-full overflow-hidden bg-neutral-200"
          >
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="h-full w-1/3 bg-black rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Fallback;
