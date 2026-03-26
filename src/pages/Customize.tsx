import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Search,
  Filter,
  RotateCcw,
  Shirt,
  Sparkles,
  Layers3,
  ArrowRightLeft,
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  customizeMaterials,
  outfitOptions,
  viewOptions,
  outfitImageAssets,
  type MaterialItem,
  type OutfitType,
  type ViewType,
} from "@/data/CustomizeMaterials";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import suitingBanner from "@/assets/suiting.jpg";

const Customize = () => {
  const location = useLocation();
  const passedOutfit = location.state?.outfit as OutfitType | undefined;
  
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitType>(passedOutfit || "Suit");
  const [selectedMaterialId, setSelectedMaterialId] =
    useState("suit-navy-stripe");
  const [selectedColor, setSelectedColor] = useState("#1F2A44");
  const [selectedView, setSelectedView] = useState<ViewType>("front");
  const [zoom, setZoom] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [isColorApplied, setIsColorApplied] = useState(false);
  const filteredMaterials = useMemo(() => {
    return customizeMaterials.filter((item) => {
      const matchOutfit = item.outfit === selectedOutfit;
      const matchSearch =
        search.trim() === ""
          ? true
          : `${item.name} ${item.family} ${item.subLabel}`
              .toLowerCase()
              .includes(search.toLowerCase());

      return matchOutfit && matchSearch;
    });
  }, [selectedOutfit, search]);

  const selectedMaterial = useMemo(() => {
    return (
      customizeMaterials.find((item) => item.id === selectedMaterialId) ||
      filteredMaterials[0] ||
      customizeMaterials[0]
    );
  }, [selectedMaterialId, filteredMaterials]);

  useEffect(() => {
    const first = customizeMaterials.find(
      (item) => item.outfit === selectedOutfit,
    );
    if (first) {
      setSelectedMaterialId(first.id);
      setSelectedColor(first.defaultColor);
    }
  }, [selectedOutfit]);

  useEffect(() => {
    if (selectedMaterial) {
      setSelectedColor(selectedMaterial.defaultColor);
      setIsColorApplied(false); // 🔥 show original fabric first
    }
  }, [selectedMaterial?.id]);

  const renderSwatchBackground = (item: MaterialItem) => {
    const base = item.defaultColor;

    switch (item.pattern) {
      case "stripe":
        return {
          background: `
            repeating-linear-gradient(
              90deg,
              ${base} 0px,
              ${base} 14px,
              rgba(255,255,255,0.20) 14px,
              rgba(255,255,255,0.20) 16px
            )
          `,
        };

      case "check":
        return {
          background: `
            linear-gradient(90deg, rgba(255,255,255,0.20) 2px, transparent 2px),
            linear-gradient(rgba(255,255,255,0.20) 2px, transparent 2px),
            ${base}
          `,
          backgroundSize: "26px 26px, 26px 26px, auto",
        };

      case "grid":
        return {
          background: `
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            ${base}
          `,
          backgroundSize: "14px 14px, 14px 14px, auto",
        };

      case "linen":
        return {
          background: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.07) 0px,
              rgba(255,255,255,0.07) 1px,
              transparent 1px,
              transparent 8px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(0,0,0,0.05) 0px,
              rgba(0,0,0,0.05) 1px,
              transparent 1px,
              transparent 8px
            ),
            ${base}
          `,
        };

      case "jacquard":
        return {
          background: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.18) 0 8%, transparent 9%),
            radial-gradient(circle at 75% 75%, rgba(0,0,0,0.08) 0 8%, transparent 9%),
            ${base}
          `,
          backgroundSize: "24px 24px",
        };

      case "sheen":
        return {
          background: `
            linear-gradient(
              135deg,
              rgba(255,255,255,0.25),
              transparent 35%,
              rgba(255,255,255,0.10) 60%,
              transparent
            ),
            ${base}
          `,
        };

      case "solid":
      default:
        return { background: base };
    }
  };

  const getTextureBackground = (
    pattern: MaterialItem["pattern"],
    color: string,
  ) => {
    switch (pattern) {
      case "stripe":
        return `
          repeating-linear-gradient(
            90deg,
            ${color} 0px,
            ${color} 14px,
            rgba(255,255,255,0.22) 14px,
            rgba(255,255,255,0.22) 16px
          )
        `;

      case "check":
        return `
          linear-gradient(90deg, rgba(255,255,255,0.18) 2px, transparent 2px),
          linear-gradient(rgba(255,255,255,0.18) 2px, transparent 2px),
          ${color}
        `;

      case "grid":
        return `
          linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px),
          linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
          ${color}
        `;

      case "linen":
        return `
          repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.08) 0px,
            rgba(255,255,255,0.08) 1px,
            transparent 1px,
            transparent 8px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(0,0,0,0.05) 0px,
            rgba(0,0,0,0.05) 1px,
            transparent 1px,
            transparent 8px
          ),
          ${color}
        `;

      case "jacquard":
        return `
          radial-gradient(circle at 25% 25%, rgba(255,255,255,0.18) 0 8%, transparent 9%),
          radial-gradient(circle at 75% 75%, rgba(0,0,0,0.08) 0 8%, transparent 9%),
          ${color}
        `;

      case "sheen":
        return `
          linear-gradient(
            135deg,
            rgba(255,255,255,0.28),
            transparent 35%,
            rgba(255,255,255,0.10) 60%,
            transparent
          ),
          ${color}
        `;

      case "solid":
      default:
        return color;
    }
  };

  const getCurrentAssets = () => {
    const outfitAssets = outfitImageAssets[selectedOutfit];
    if (!outfitAssets) return null;

    return outfitAssets[selectedView] || outfitAssets.front || null;
  };

  const RealImagePreview = () => {
    const assets = getCurrentAssets();

    if (!selectedMaterial) return null;

    if (!assets) {
      return (
        <div className="flex h-full w-full items-center justify-center text-center text-[#6B7280]">
          <div>
            <p className="text-lg font-medium">Assets not added yet</p>
            <p className="mt-2 text-sm">
              Add base, mask, and detail images for {selectedOutfit}.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-full">
            {/* Base image */}
            <img
              src={assets.base}
              alt={`${selectedOutfit} ${selectedView}`}
              className="absolute inset-0 h-full w-full object-contain"
              draggable={false}
            />

            {/* Fabric Image Layer */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: selectedMaterial?.textureImage
                  ? `url(${selectedMaterial.textureImage})`
                  : undefined,

                backgroundSize: "70px", // 🔥 key
                backgroundRepeat: "repeat",
                backgroundPosition: "center",

                imageRendering: "auto",

                WebkitMaskImage: `url(${assets.mask})`,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",

                maskImage: `url(${assets.mask})`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",

                mixBlendMode: "normal",
                opacity: 1,
              }}
            />

            {/* Color Tint Layer */}
            {isColorApplied && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: selectedColor,

                  mixBlendMode: "multiply",
                  opacity: 0.5,

                  WebkitMaskImage: `url(${assets.mask})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",

                  maskImage: `url(${assets.mask})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
              />
            )}

            {/* Highlight layer */}
            <div
              className="absolute inset-0 h-full w-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.12), transparent 35%, rgba(0,0,0,0.06) 70%, transparent)",
                WebkitMaskImage: `url(${assets.mask})`,
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                WebkitMaskSize: "contain",
                maskImage: `url(${assets.mask})`,
                maskRepeat: "no-repeat",
                maskPosition: "center",
                maskSize: "contain",
                pointerEvents: "none",
              }}
            />

            {/* Detail image */}
            <img
              src={assets.detail}
              alt={`${selectedOutfit} detail`}
              className="pointer-events-none absolute inset-0 h-full w-full object-contain"
              style={{
                mixBlendMode: "multiply",
                opacity: 0.65,
              }}
              draggable={false}
            />
          </div>
        </div>
      </div>
    );
  };

  const cycleView = () => {
    const currentIndex = viewOptions.indexOf(selectedView);
    const nextIndex = (currentIndex + 1) % viewOptions.length;
    setSelectedView(viewOptions[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <Header />
      <div>
        <section className="relative h-[70vh] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={suitingBanner}
              alt="Premium Suiting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1 border border-white/20 rounded-full text-[10px] font-medium tracking-[0.3em] uppercase mb-4 backdrop-blur-md">
                Noble Weaves
              </span>
              <h1 className="text-6xl md:text-8xl font-display font-medium mb-6 tracking-tight">
                Customize <span className="italic font-light">Clothing</span>
              </h1>
              <p className="max-w-xl mx-auto text-lg text-white/60 font-light leading-relaxed mb-8">
                Design your perfect outfit with our premium selection of fabrics
                and styles.
              </p>
            </motion.div>
          </div>
        </section>
        <div className="flex w-full max-w-7xl items-center p-4">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="rounded-xl border-[#D1D5DB]"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 xl:grid-cols-[380px_1fr_320px]">
          {/* LEFT */}
          <aside className="border-b border-[#E5E7EB] bg-[#FAFAFA] xl:border-b-0 xl:border-r">
            <div className="h-full p-5 lg:p-6">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search material"
                    className="h-12 w-full rounded-xl border border-[#D1D5DB] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#111827]"
                  />
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {outfitOptions.map((outfit) => (
                  <button
                    key={outfit}
                    onClick={() => setSelectedOutfit(outfit)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      selectedOutfit === outfit
                        ? "border-[#111827] bg-[#111827] text-white"
                        : "border-[#D1D5DB] bg-white text-[#374151] hover:bg-[#F9FAFB]"
                    }`}
                  >
                    {outfit}
                  </button>
                ))}
              </div>

              <div className="grid max-h-[calc(100vh-80px)] grid-cols-2 gap-4 overflow-y-auto pr-1 lg:grid-cols-3">
                {filteredMaterials.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedMaterialId(item.id);
                      setSelectedColor(item.defaultColor);
                    }}
                    className={`rounded-2xl border p-2 text-left transition ${
                      selectedMaterialId === item.id
                        ? "border-[#111827] ring-2 ring-[#D1D5DB]"
                        : "border-[#E5E7EB] hover:border-[#9CA3AF]"
                    }`}
                  >
                    <div
                      className="mb-3 h-24 w-full rounded-xl"
                      style={{
                        backgroundImage: item.textureImage
                          ? `url(${item.textureImage})`
                          : undefined,
                        backgroundSize: "120px",
                        backgroundRepeat: "repeat",
                        backgroundPosition: "center",
                      }}
                    />

                    <div className="px-1">
                      <p className="line-clamp-1 text-sm font-semibold text-[#111827]">
                        {item.name}
                      </p>
                      <p className="line-clamp-2 text-xs text-[#6B7280]">
                        {item.family} · {item.subLabel}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* CENTER */}
          <main className="relative flex flex-col items-center justify-center bg-[#F8F8F7] px-4 py-8 md:px-8">
            <div className="mb-6 flex w-full max-w-5xl items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#6B7280]">
                  Live Preview
                </p>
                <h2 className="mt-2 text-3xl font-medium text-[#111827]">
                  {selectedOutfit}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={cycleView}
                  className="flex h-12 items-center gap-2 rounded-full border border-[#D1D5DB] bg-white px-4 text-sm font-medium hover:bg-[#F9FAFB]"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  {selectedView}
                </button>
              </div>
            </div>

            <div className="relative flex w-full max-w-5xl items-center justify-center">
              <div className="w-full max-w-[560px]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_60%)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedMaterialId}-${selectedColor}-${selectedView}`}
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.02, y: -10 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute inset-0"
                      style={{ transform: `scale(${zoom})` }}
                    >
                      <RealImagePreview />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </main>

          {/* RIGHT */}
          <aside className="border-t border-[#E5E7EB] bg-white xl:border-l xl:border-t-0">
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[#6B7280]">
                Your Selection
              </p>

              <h3 className="mt-3 text-4xl font-light leading-tight text-[#111827]">
                Custom
                <br />
                {selectedOutfit === "Wedding outfit"
                  ? "Wedding Wear"
                  : selectedOutfit}
              </h3>

              <div className="mt-8">
                <p className="text-sm text-[#374151]">Selected material</p>
                <p className="mt-2 text-lg font-semibold text-[#111827]">
                  {selectedMaterial?.name}
                </p>
                <p className="text-sm text-[#6B7280]">
                  {selectedMaterial?.family} · {selectedMaterial?.subLabel}
                </p>
              </div>

              <div className="mt-8">
                <p className="mb-3 text-sm font-medium text-[#374151]">
                  Available colors
                </p>
                <div className="flex flex-wrap gap-3">
                  {selectedMaterial?.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setIsColorApplied(true); // 🔥 THIS WAS MISSING
                      }}
                      className={`h-10 w-10 rounded-full border-2 transition ${
                        selectedColor === color
                          ? "scale-110 border-[#111827]"
                          : "border-[#E5E7EB]"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-3 text-sm font-medium text-[#374151]">
                  View angle
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {viewOptions.map((view) => (
                    <button
                      key={view}
                      onClick={() => setSelectedView(view)}
                      className={`rounded-xl border px-3 py-3 text-sm capitalize transition ${
                        selectedView === view
                          ? "border-[#111827] bg-[#111827] text-white"
                          : "border-[#D1D5DB] bg-white text-[#374151]"
                      }`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10 space-y-3 rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-4">
                <div className="flex items-center gap-2 text-[#374151]">
                  <Layers3 className="h-4 w-4" />
                  <span className="text-sm font-medium">Summary</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Outfit</span>
                  <span className="font-medium text-[#111827]">
                    {selectedOutfit}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Material</span>
                  <span className="font-medium text-[#111827]">
                    {selectedMaterial?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">View</span>
                  <span className="font-medium capitalize text-[#111827]">
                    {selectedView}
                  </span>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-[#D1D5DB] text-[#111827]"
                  onClick={() => (window.location.href = "/contact")}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Enquire
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Customize;
