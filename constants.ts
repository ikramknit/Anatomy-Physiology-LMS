
import type { Chapter } from './types';

const getYouTubeVideoId = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v') || '';
  } catch (error) {
    console.error('Invalid URL:', url);
    return '';
  }
};

const rawChapters = [
    {
        id: 1,
        title: "Introduction to Anatomy and Physiology",
        videos: [
            { title: "Scope of knowledge of anatomy and physiology", url: "https://www.youtube.com/watch?v=No1L89adiwY" },
        ],
    },
    {
        id: 2,
        title: "Anatomical Terminology",
        videos: [
            { title: "Definition of important terms used in anatomy", url: "https://www.youtube.com/watch?v=xVEHxsMiPHw" },
        ],
    },
    {
        id: 3,
        title: "The Cell",
        videos: [
            { title: "Structure of cell, function of its components", url: "https://www.youtube.com/watch?v=8NfgKzRwB2A" },
        ],
    },
    {
        id: 4,
        title: "Tissues of the Body",
        videos: [
            { title: "Epithelial tissue", url: "https://www.youtube.com/watch?v=Gd6K9UUYYQY" },
            { title: "Muscular tissue", url: "https://www.youtube.com/watch?v=alArBn1svDE" },
            { title: "Connective tissue", url: "https://www.youtube.com/watch?v=nS2a5ZP013M" },
            { title: "Nervous tissue", url: "https://www.youtube.com/watch?v=R-D3K296V5Q" },
        ],
    },
    {
        id: 5,
        title: "The Skeletal System",
        videos: [
            { title: "Introductory knowledge of skeleton bones", url: "https://www.youtube.com/watch?v=vjIYW-B13A4" },
            { title: "Surface Anatomy of important Bones", url: "https://www.youtube.com/watch?v=X4GIva2OPhw" },
            { title: "Classification & knowledge of joints", url: "https://www.youtube.com/watch?v=80bzLTdAN4w" },
        ],
    },
    {
        id: 6,
        title: "Blood",
        videos: [
            { title: "Composition of blood, function of blood elements", url: "https://www.youtube.com/watch?v=x2du8b6eXlo" },
            { title: "Blood group", url: "https://www.youtube.com/watch?v=q9klJO0e_pU" },
            { title: "Coagulation of blood", url: "https://www.youtube.com/watch?v=cVU7mceYXes" },
            { title: "Brief information regarding disorders of blood", url: "https://www.youtube.com/watch?v=229Ow4tRnT8" },
        ],
    },
    {
        id: 7,
        title: "The Cardiovascular System",
        videos: [
            { title: "Structure and functions of the heart", url: "https://www.youtube.com/watch?v=Y3Pzfg_ShRM" },
            { title: "Arterial and venous system", url: "https://www.youtube.com/watch?v=dKiMKsTHTEA" },
            { title: "Blood Pressure and its recording", url: "https://www.youtube.com/watch?v=FjggAXq9XTo" },
            { title: "Brief information about cardiovascular disorders", url: "https://www.youtube.com/watch?v=TXOU3tFLxmg" },
        ],
    },
    {
        id: 8,
        title: "The Respiratory System",
        videos: [
            { title: "Various parts of respiratory system", url: "https://www.youtube.com/watch?v=iTnvyaky-zo" },
            { title: "Physiology of respiration", url: "https://www.youtube.com/watch?v=jLgMukBpJ38" },
        ],
    },
    {
        id: 9,
        title: "The Urinary System",
        videos: [
            { title: "Various parts of urinary system", url: "https://www.youtube.com/watch?v=WvqpDqw3arU" },
            { title: "Structure and functions of kidney", url: "https://www.youtube.com/watch?v=TCRae0j_6qA" },
            { title: "Physiology of Urine formation", url: "https://www.youtube.com/watch?v=eVO8_cQQXhk" },
            { title: "Pathophysiology renal diseases and edema", url: "https://www.youtube.com/watch?v=n_4xSL45jlw" },
        ],
    },
    {
        id: 10,
        title: "The Muscular System",
        videos: [
            { title: "Structure of skeletal muscle, physiology of muscle contraction", url: "https://www.youtube.com/watch?v=uxO08XS_wXY" },
            { title: "Names, Position, attachments and functions of skeletal muscles", url: "https://www.youtube.com/watch?v=S99QNvsFQ44" },
            { title: "Physiology of neuromuscular junction", url: "https://www.youtube.com/watch?v=DH2UjzDZiI8" },
        ],
    },
    {
        id: 11,
        title: "The Nervous System",
        videos: [
            { title: "Various parts of central nervous system", url: "https://www.youtube.com/watch?v=3aV4JFuZf1c" },
            { title: "The brain and its parts, function", url: "https://www.youtube.com/watch?v=ggYcehnGWSo" },
        ],
    },
    {
        id: 12,
        title: "The Senses",
        videos: [
            { title: "Organs of taste", url: "https://www.youtube.com/watch?v=m5LU2NxYD0w" },
            { title: "Organs of smell", url: "https://www.youtube.com/watch?v=U0583M20KfY" },
            { title: "Organs of hearing", url: "https://www.youtube.com/watch?v=Z2sLMeh0j58" },
            { title: "Organs of seeing (vision)", url: "https://www.youtube.com/watch?v=lFZZuyqab6M" },
            { title: "Organs of feel (touch)", url: "https://www.youtube.com/watch?v=yBtWVSAiX9s" },
        ],
    },
    {
        id: 13,
        title: "The Digestive System",
        videos: [
            { title: "Introductory knowledge", url: "https://www.youtube.com/watch?v=HdCyj9fsOk0" },
            { title: "Various parts and their functions (Part 1)", url: "https://www.youtube.com/watch?v=hchGGQxabuI" },
            { title: "Various parts and their functions (Part 2)", url: "https://www.youtube.com/watch?v=G69sGtZ_EJ8" },
            { title: "Various parts and their functions (Part 3)", url: "https://www.youtube.com/watch?v=GgmykuJsoLo" },
            { title: "Structure and functions of liver", url: "https://www.youtube.com/watch?v=5br4ZWPB-YI" },
        ],
    },
    {
        id: 14,
        title: "The Endocrine System",
        videos: [
            { title: "Intro to endocrine glands and Hormones", url: "https://www.youtube.com/watch?v=ciQm9jhLdT8" },
            { title: "Locations of the glands (Pituitary)", url: "https://www.youtube.com/watch?v=i48NoGtz7RY" },
            { title: "Thyroid gland", url: "https://www.youtube.com/watch?v=vVl-2ftFuHs" },
            { title: "Adrenal gland", url: "https://www.youtube.com/watch?v=155wpm42zrM" },
            { title: "Pancreas", url: "https://www.youtube.com/watch?v=4yaUmkzD4II" },
        ],
    },
    {
        id: 15,
        title: "The Reproductive System",
        videos: [
            { title: "Physiology and anatomy (Part 1)", url: "https://www.youtube.com/watch?v=AzSef6uRGHM" },
            { title: "Physiology and anatomy (Part 2)", url: "https://www.youtube.com/watch?v=8CI4eh225ho" },
        ],
    }
];


export const COURSE_CHAPTERS: Chapter[] = rawChapters.map(chapter => ({
    ...chapter,
    videos: chapter.videos.map(video => ({
        ...video,
        videoId: getYouTubeVideoId(video.url)
    }))
}));
