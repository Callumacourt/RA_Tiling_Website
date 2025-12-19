/// <reference types="vite/client" />

type Service = {
    id: string;
    title: string;
    images: string[];
    line: string;
}

const patioImgs = import.meta.glob<{default: string}>(
    "../assets/patios/*.{jpg,webp,png}",
    {eager: true}
);

const bathroomImgs = import.meta.glob<{default: string}>(
    "../assets/tiling/*.{jpg,webp,png}",
    {eager: true}
);

const getImgs = (glob: Record<string, {default: string}>) => 
    Object.values(glob).map(m => m.default);

export const services : Service [] = [
    { id: "patios", title: "Patios", images: getImgs(patioImgs), line: "Made to last" },
    { id: "tiling", title: "Tiling", images: getImgs(bathroomImgs), line: "Done how you want it" },
];

