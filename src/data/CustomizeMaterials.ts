import { customizeSuitMaterials } from './customizeSuitMaterials';
import { customizeShirtMaterials } from './customizeShirtMaterials';
import { customizeWeddingMaterials } from './customizeWeddingMaterials';

export type OutfitType = "Suit" | "Shirt" | "Wedding outfit";
export type ShirtVariation = "Shirt (Full Hands)" | "Shirt (Half Hands)" | "Mandarin Full Hands" | "Mandarin Half Hands";
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
    | "matte"
    | "print"
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
export const shirtVariations: ShirtVariation[] = ["Shirt (Full Hands)", "Shirt (Half Hands)", "Mandarin Full Hands", "Mandarin Half Hands"];
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
        "Shirt (Full Hands)": {
            front: {
                base: "/customize/shirt/full-hands/front.png",
                mask: "/customize/shirt/full-hands/front-mask.png",
                detail: "/customize/shirt/full-hands/front-detail.png",
            },
            left: {
                base: "/customize/shirt/full-hands/left.png",
                mask: "/customize/shirt/full-hands/left-mask.png",
                detail: "/customize/shirt/full-hands/left-detail.png",
            },
            right: {
                base: "/customize/shirt/full-hands/right.png",
                mask: "/customize/shirt/full-hands/right-mask.png",
                detail: "/customize/shirt/full-hands/right-detail.png",
            },
        },
        "Shirt (Half Hands)": {
            front: {
                base: "/customize/shirt/half-hands/front.png",
                mask: "/customize/shirt/half-hands/front-mask.png",
                detail: "/customize/shirt/half-hands/front-detail.png",
            },
            left: {
                base: "/customize/shirt/half-hands/left.png",
                mask: "/customize/shirt/half-hands/left-mask.png",
                detail: "/customize/shirt/half-hands/left-detail.png",
            },
            right: {
                base: "/customize/shirt/half-hands/right.png",
                mask: "/customize/shirt/half-hands/right-mask.png",
                detail: "/customize/shirt/half-hands/right-detail.png",
            },
        },
        "Mandarin Full Hands": {
            front: {
                base: "/customize/shirt/mandarin-full/front.png",
                mask: "/customize/shirt/mandarin-full/front-mask.png",
                detail: "/customize/shirt/mandarin-full/front-detail.png",
            },
            left: {
                base: "/customize/shirt/mandarin-full/left.png",
                mask: "/customize/shirt/mandarin-full/left-mask.png",
                detail: "/customize/shirt/mandarin-full/left-detail.png",
            },
            right: {
                base: "/customize/shirt/mandarin-full/right.png",
                mask: "/customize/shirt/mandarin-full/right-mask.png",
                detail: "/customize/shirt/mandarin-full/right-detail.png",
            },
        },
        "Mandarin Half Hands": {
            front: {
                base: "/customize/shirt/mandarin-half/front.png",
                mask: "/customize/shirt/mandarin-half/front-mask.png",
                detail: "/customize/shirt/mandarin-half/front-detail.png",
            },
            left: {
                base: "/customize/shirt/mandarin-half/left.png",
                mask: "/customize/shirt/mandarin-half/left-mask.png",
                detail: "/customize/shirt/mandarin-half/left-detail.png",
            },
            right: {
                base: "/customize/shirt/mandarin-half/right.png",
                mask: "/customize/shirt/mandarin-half/right-mask.png",
                detail: "/customize/shirt/mandarin-half/right-detail.png",
            },
        },
    },
    "Wedding outfit": {
        front: {
            base: '/customize/wedding/front.png',
            mask: '/customize/wedding/front-mask.png',
            detail: '/customize/wedding/front-detail.png'
        },
        left: {
            base: '/customize/wedding/left.png',
            mask: '/customize/wedding/left-mask.png',
            detail: '/customize/wedding/left-detail.png'
        },
        right: {
            base: '/customize/wedding/right.png',
            mask: '/customize/wedding/right-mask.png',
            detail: '/customize/wedding/right-detail.png'
        },
    },
} as const;

export const customizeMaterials: MaterialItem[] = [
    ...customizeSuitMaterials,
    ...customizeShirtMaterials,
    ...customizeWeddingMaterials
];