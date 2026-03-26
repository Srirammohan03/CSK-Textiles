import { customizeSuitMaterials } from './customizeSuitMaterials';
import { customizeShirtMaterials } from './customizeShirtMaterials';
import { customizeWeddingMaterials } from './customizeWeddingMaterials';

export type OutfitType = "Suit" | "Shirt" | "Wedding outfit";
export type ViewType = "front" | "left" | "right";

export type FabricPattern =
    | "solid"
    | "stripe"
    | "check"
    | "grid"
    | "linen"
    | "jacquard"
    | "velvet"
    | "brocade"
    | "dobby"
    | "herringbone"
    | "dot"
    | "birdseye"
    | "houndstooth"
    | "sheen";

export type MaterialItem = {
    id: string;
    outfit: OutfitType;
    name: string;
    family: string;
    subLabel: string;
    defaultColor: string;
    colors: string[];
    pattern?: FabricPattern;
    premium?: boolean;
    lightweight?: boolean;
    textureImage?: string;
};

export const outfitOptions: OutfitType[] = ["Suit", "Shirt", "Wedding outfit"];
export const viewOptions: ViewType[] = ["front", "left", "right"];
export const outfitImageAssets = {
    Suit: {
        front: {
            base: "/customize/suit/front.png",
            mask: "/customize/suit/front-mask.png",
            detail: "/customize/suit/front-detail.png",
        },
        left: {
            base: "/customize/suit/left.png",
            mask: "/customize/suit/left-mask.png",
            detail: "/customize/suit/left-detail.png",
        },
        right: {
            base: "/customize/suit/right.png",
            mask: "/customize/suit/right-mask.png",
            detail: "/customize/suit/right-detail.png",
        },
    },
    Shirt: {
        front: null,
        left: null,
        right: null,
    },
    "Wedding outfit": {
        front: null,
        left: null,
        right: null,
    },
} as const;

export const customizeMaterials: MaterialItem[] = [
    ...customizeSuitMaterials,
    ...customizeShirtMaterials,
    ...customizeWeddingMaterials
];