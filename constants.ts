import type { Program } from './types';

export const getYouTubeVideoId = (url: string): string => {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.searchParams.get('v') || '';
  } catch (error)
 {
    console.error('Invalid URL:', url);
    return '';
  }
};

const anatomyAndPhysiologyChapters = [
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
    },
    {
        id: 16,
        title: "The Lymphatic System & Immunity",
        videos: [
            { title: "Lymphatic System: Crash Course A&P #44", url: "https://www.youtube.com/watch?v=I7orwMfnT0E" },
            { title: "Immune System, Explained", url: "https://www.youtube.com/watch?v=P6K-220_96U" },
        ],
    },
    {
        id: 17,
        title: "The Integumentary System",
        videos: [
            { title: "The Integumentary System, Part 1 - Skin Deep", url: "https://www.youtube.com/watch?v=Orumw-PyNao" },
            { title: "Structure and Function of the Skin", url: "https://www.youtube.com/watch?v=8-w2K9l_q2U" },
        ],
    },
    {
        id: 18,
        title: "Human Development & Genetics",
        videos: [
            { title: "Heredity: Crash Course Biology #9", url: "https://www.youtube.com/watch?v=CBezq1fFUEA" },
            { title: "Introduction to Embryology", url: "https://www.youtube.com/watch?v=34G-21i_pSA" },
        ],
    },
    {
        id: 19,
        title: "Metabolism & Nutrition",
        videos: [
            { title: "Metabolism & Nutrition, Part 1: Crash Course A&P #36", url: "https://www.youtube.com/watch?v=fR3o_E-I6pA" },
            { title: "The Basics of Nutrition", url: "https://www.youtube.com/watch?v=H8t3_I4K_24" },
        ],
    },
    {
        id: 20,
        title: "Fluid, Electrolyte, and Acid-Base Balance",
        videos: [
            { title: "Fluid & Electrolytes for Beginners", url: "https://www.youtube.com/watch?v=5g2vY4_0-yI" },
            { title: "Acid-Base Balance Explained", url: "https://www.youtube.com/watch?v=p43jG_27bjk" },
        ],
    },
    {
        id: 21,
        title: "Pregnancy and Embryonic Development",
        videos: [
            { title: "Pregnancy - How a Wonder is Born!", url: "https://www.youtube.com/watch?v=82yW-v4yejI" },
            { title: "Fetal Development Week by Week", url: "https://www.youtube.com/watch?v=S-zQ-h8-4tE" },
        ],
    },
    {
        id: 22,
        title: "Medical Imaging",
        videos: [
            { title: "An Introduction to Medical Imaging", url: "https://www.youtube.com/watch?v=BJHb8-u2xJc" },
            { title: "How does an MRI machine work?", url: "https://www.youtube.com/watch?v=3PQLc-Lw-P4" },
        ],
    },
    {
        id: 23,
        title: "Introduction to Pathophysiology",
        videos: [
            { title: "Introduction to Pathology", url: "https://www.youtube.com/watch?v=S_v-fXEz_2E" },
            { title: "Cell Injury, Adaptation, and Death", url: "https://www.youtube.com/watch?v=E0bX-zBq83s" },
        ],
    },
    {
        id: 24,
        title: "Introduction to Pharmacology",
        videos: [
            { title: "Introduction to Pharmacology", url: "https://www.youtube.com/watch?v=iAMyWi7iSsg" },
            { title: "Pharmacokinetics 1 - Introduction", url: "https://www.youtube.com/watch?v=NKVSe48g32k" },
        ],
    }
];

const clinicalPathologyAndToxicologyChapters = [
    {
        id: 1,
        title: "Introduction to Pathology",
        videos: [
            { title: "Definition of Pathology", url: "https://www.youtube.com/watch?v=eNaJHU5qiTI" },
            { title: "Introduction of pathology of blood and urine", url: "https://www.youtube.com/watch?v=vfzPjx6whBI" },
            { title: "Lymphocytes and platelets their role in health and diseases", url: "https://www.youtube.com/watch?v=R3AA_w6mKCw" },
            { title: "Erythrocytes abnormal cells and their significance", url: "https://www.youtube.com/watch?v=gLYGjIf-4qU" },
            { title: "Elementary study of micro-organism", url: "https://www.youtube.com/watch?v=SgEkbDoPc5Y" },
            { title: "Abnormal constituents of urine, their significance-in disease", url: "https://www.youtube.com/watch?v=UzhDFVV86Pw" },
        ],
    },
    {
        id: 2,
        title: "Common Terms in Pathology",
        videos: [
            { title: "Inflammation", url: "https://www.youtube.com/watch?v=2yQrjsaxjxk" },
            { title: "Edema", url: "https://www.youtube.com/watch?v=p87cCYNQUc4" },
            { title: "Hemorrhage", url: "https://www.youtube.com/watch?v=BRGKeupsR3I" },
            { title: "Thrombosis", url: "https://www.youtube.com/watch?v=GK15p0ywvng" },
            { title: "Fever", url: "https://www.youtube.com/watch?v=EMZlk0kdSIA" },
            { title: "Dyspnoea", url: "https://www.youtube.com/watch?v=dMemgbemwAs" },
            { title: "Anemia", url: "https://www.youtube.com/watch?v=lfBPyKNzkNc" },
            { title: "Leucocytosis", url: "https://www.youtube.com/watch?v=RWCK9dUlSzw" },
            { title: "Leucopenia", url: "https://www.youtube.com/watch?v=TAuI--aIL9s" },
        ],
    },
    {
        id: 3,
        title: "Toxicology",
        videos: [
            { title: "Definition of Toxicology", url: "https://www.youtube.com/watch?v=0UjD_Sb-qKw&t=236s" },
        ],
    },
    {
        id: 4,
        title: "Common Poisons",
        videos: [
            { title: "Corrosive poison Acid Alkali", url: "https://www.youtube.com/watch?v=oKFCXSgj9Kw" },
            { title: "Irritant Poison-Arsenic", url: "https://www.youtube.com/watch?v=hmKhtIDVMgw" },
            { title: "Phosphorus", url: "https://www.youtube.com/watch?v=L399v1eNmVU" },
            { title: "Mercury", url: "https://www.youtube.com/watch?v=7HiJjsTK9uo" },
            { title: "Cerebral poison-Alcohol", url: "https://www.youtube.com/watch?v=9qCwB6EtbtY" },
            { title: "Opium", url: "https://www.youtube.com/watch?v=MVIyPTOaqIw" },
            { title: "Dhature", url: "https://www.youtube.com/watch?v=AGOp5FmFKsI" },
            { title: "Snakes", url: "https://www.youtube.com/watch?v=lnJ6uEHuCsU" },
            { title: "Scorpion", url: "https://www.youtube.com/watch?v=bm8ggImbBrg" },
            { title: "Asphxiant, Carbon monoxide", url: "https://www.youtube.com/watch?v=slUAoj9prlQ" },
        ],
    },
    {
        id: 5,
        title: "Poisoning Treatment",
        videos: [
            { title: "General treatment in cases of poisoning and their antidotes", url: "https://www.youtube.com/watch?v=bT9DmBfEjU8" },
        ],
    }
];

const introductoryHomoeopathyChapters = [
    {
        id: 1,
        title: "Introduction to Homoeopathy",
        videos: [
            { title: "Definition", url: "https://www.youtube.com/watch?v=9cEdJzC1UbU" },
            { title: "Scope", url: "https://www.youtube.com/watch?v=Er9RpwcsDLo" },
            { title: "Short history of Homoeopathy", url: "https://www.youtube.com/watch?v=i_wFxQHOITI" },
            { title: "Brief knowledge about Dr. Hahnemann and his discovery", url: "https://www.youtube.com/watch?v=uhZhx6rhm9o" },
        ],
    },
    {
        id: 2,
        title: "Basic Principles of Homoeopathy",
        videos: [
            { title: "Nature's law of cure with its elaboration", url: "https://www.youtube.com/watch?v=NP-mLrsw59A" },
            { title: "Theory of vital force", url: "https://www.youtube.com/watch?v=t-6pMf9mar0" },
            { title: "Theory of Similia", url: "https://www.youtube.com/watch?v=9LN1l6MgMC4" },
            { title: "Theory of Minimum dose", url: "https://www.youtube.com/watch?v=zywFjXxHQhM" },
        ],
    },
    {
        id: 3,
        title: "Organon of Medicine",
        videos: [
            { title: "Study of organon of medicine in special relation to scope of Homoeopathic Pharmacy", url: "https://www.youtube.com/watch?v=PQQEf0VIUwU" },
        ],
    },
    {
        id: 4,
        title: "Biochemic Medicine",
        videos: [
            { title: "Life sketch of Dr. Schuessler and his philosophy (Part 1)", url: "https://www.youtube.com/watch?v=Hy3G0BbkZt8" },
            { title: "Life sketch of Dr. Schuessler and his philosophy (Part 2)", url: "https://www.youtube.com/watch?v=8d4WuAUptNY&t=497s" },
        ],
    },
    {
        id: 5,
        title: "Twelve Tissue Remedies",
        videos: [
            { title: "Introduction of twelve tissue remedies", url: "https://www.youtube.com/watch?v=vxJl0APUVAM" },
        ],
    },
];

const homoeopathicPharmaceuticsChapters = [
    {
        id: 1,
        title: "Pharmacy",
        videos: [
            { title: "Introduction to Homoeopathic Pharmacy", url: "https://www.youtube.com/watch?v=og46C4sPh_4" },
            { title: "History of homoeopathic pharmacy", url: "https://www.youtube.com/watch?v=uhZhx6rhm9o&t=27s" },
            { title: "Branches of homoeopathic pharmacy-Their application", url: "https://www.youtube.com/watch?v=XgOpGHrbL7c" },
            { title: "Different terms used in homoeopathic pharmacy", url: "https://www.youtube.com/watch?v=roL35KV6QvE" },
        ],
    },
    {
        id: 2,
        title: "Pharmacopoeia",
        videos: [
            { title: "Introduction to different pharmacopoeia", url: "https://www.youtube.com/watch?v=D4l5nYvIKY4" },
        ],
    },
    {
        id: 3,
        title: "Metrology",
        videos: [
            { title: "System of weights and measures", url: "https://www.youtube.com/watch?v=Y6p9dkrNgDE" },
            { title: "Calculation Including conversion from one to another system", url: "https://www.youtube.com/watch?v=6tE1AbX1CIg" },
        ],
    },
    {
        id: 4,
        title: "Pharmaceutical instruments and appliances",
        videos: [
            { title: "Instruments and appliances used in a pharmacy", url: "https://www.youtube.com/watch?v=x07Kijkhr4I" },
            { title: "Dispensing of Homoeopathic medicines", url: "https://www.youtube.com/watch?v=zz3b1lEgr1o" },
            { title: "Their uses", url: "https://www.youtube.com/watch?v=hlkABPzLbDg" },
        ],
    },
    {
        id: 5,
        title: "Powder and Sieves",
        videos: [
            { title: "Degree of coursencess and fineness of Powder", url: "https://www.youtube.com/watch?v=dvQP7fryV-o" },
            { title: "Different grade of powder as given In P.H.I", url: "https://www.youtube.com/watch?v=3YD81hUezcY" },
            { title: "Different sieves, No. of sieves", url: "https://www.youtube.com/watch?v=LfnvAcRDAO4" },
        ],
    },
    {
        id: 6,
        title: "Neutral substance",
        videos: [
            { title: "Vehicle - Definition of vehicle", url: "https://www.youtube.com/watch?v=FD1KZbB3dWE" },
            { title: "Different type of vehicles (Part 1)", url: "https://www.youtube.com/watch?v=Gx6h4Vh94CY" },
            { title: "Different type of vehicles (Part 2)", url: "https://www.youtube.com/watch?v=KHKHrcZw0kg" },
            { title: "Different type of vehicles (Part 3)", url: "https://www.youtube.com/watch?v=Kx9eASZ2148&t=68s" },
            { title: "Different type of vehicles (Part 4)", url: "https://www.youtube.com/watch?v=gWcm4AXPxmc" },
        ],
    },
    {
        id: 7,
        title: "Percolators and Maceration",
        videos: [
            { title: "Method of percolation", url: "https://www.youtube.com/watch?v=HG4QY1cB1cY" },
            { title: "Maceration", url: "https://www.youtube.com/watch?v=gSnQXsZu6gE" },
        ],
    },
    {
        id: 8,
        title: "Tablet and Pills",
        videos: [
            { title: "Different types of tablets and no. of pills", url: "https://www.youtube.com/watch?v=kt5XekmIK5Q" },
            { title: "Process involved in the preparation of tablets and pills", url: "https://www.youtube.com/watch?v=TaHu_rKgfN8" },
            { title: "Standard in tablets-test for standards", url: "https://www.youtube.com/watch?v=0TYONMsIuQY" },
        ],
    },
    {
        id: 9,
        title: "Homoeopathic Drug",
        videos: [
            { title: "Introduction to different scales for preparing Homoeopathic Medicines", url: "https://www.youtube.com/watch?v=7XgU6HKRf0I" },
            { title: "Relationship between fifty millesimal and decimal, centesimal potency", url: "https://www.youtube.com/watch?v=WpfAdZAzlGE" },
        ],
    },
    {
        id: 10,
        title: "Containers and closures",
        videos: [
            { title: "Type of Containers and closures", url: "https://www.youtube.com/watch?v=uIktCUOhpzo" },
            { title: "Glass and plastic containers (Part 1)", url: "https://www.youtube.com/watch?v=8rzHgRDXRMY" },
            { title: "Glass and plastic containers (Part 2)", url: "https://www.youtube.com/watch?v=ytkGVEqCecY" },
            { title: "Different types of closures", url: "https://www.youtube.com/watch?v=AvK9OOYgsqU" },
        ],
    },
    {
        id: 11,
        title: "Syrup",
        videos: [
            { title: "Method of preparation, uses", url: "https://www.youtube.com/watch?v=1lh14tE2tXU" },
        ],
    },
    {
        id: 12,
        title: "External applications",
        videos: [
            { title: "Different material used as vehicle", url: "https://www.youtube.com/watch?v=betBa7B0OMA" },
            { title: "Paraffin, soaps, starch etc.", url: "https://www.youtube.com/watch?v=7rJ_jUZtow4" },
        ],
    },
    {
        id: 13,
        title: "Potentisation",
        videos: [
            { title: "Definition, different methods for potentisation", url: "https://www.youtube.com/watch?v=vCiCiFESCNQ" },
            { title: "Working knowledge of automatic pro potentizer", url: "https://www.youtube.com/watch?v=5Bv4MaSelSY" },
        ],
    },
    {
        id: 14,
        title: "Extraction",
        videos: [
            { title: "Continuous hot extraction", url: "https://www.youtube.com/watch?v=3nXmCoI2_6E" },
        ],
    },
    {
        id: 15,
        title: "Distillation",
        videos: [
            { title: "Simple and fractional distillation, steam distillation", url: "https://www.youtube.com/watch?v=yS1ffNHp_Qs" },
            { title: "Preparation of distilled water", url: "https://www.youtube.com/watch?v=q8-GiqfoxEM" },
            { title: "Type of distillation apparatuses", url: "https://www.youtube.com/watch?v=qbabVuu8RkM" },
        ],
    },
    {
        id: 16,
        title: "Drying processes",
        videos: [
            { title: "Study of different dryers used", url: "https://www.youtube.com/watch?v=lKrOBJqecww" },
        ],
    },
    {
        id: 17,
        title: "Ideal Pharmacy",
        videos: [
            { title: "Space lay out plan space for herbarium, equipment etc.", url: "https://www.youtube.com/watch?v=q02iHNTb4FA" },
        ],
    },
    {
        id: 18,
        title: "Moisture Content",
        videos: [
            { title: "Various methods of determination", url: "https://www.youtube.com/watch?v=FfxHot6BLZk" },
        ],
    },
];

const healthEducationAndCommunityPharmacyChapters = [
    {
        id: 1,
        title: "Concept of Health",
        videos: [
            { title: "Homoeopathic concept of health", url: "https://www.youtube.com/watch?v=M6r7rcigY2Q" },
            { title: "Indicators of health", url: "https://www.youtube.com/watch?v=DWT4scbgRVs" },
            { title: "Natural history of disease", url: "https://www.youtube.com/watch?v=pQ_3mATwWik" },
            { title: "The disease agents", url: "https://www.youtube.com/watch?v=LtT_mY1JUuQ" },
            { title: "Concept of prevention of diseases", url: "https://www.youtube.com/watch?v=i-ZE2ug1pa0" },
        ],
    },
    {
        id: 2,
        title: "Nutrition and Health",
        videos: [
            { title: "Nutrition and health", url: "https://www.youtube.com/watch?v=G_ofync7bjw" },
            { title: "Classification of foods", url: "https://www.youtube.com/watch?v=SBBt4WWmn78" },
            { title: "Natural sources, requirements, Balance diet", url: "https://www.youtube.com/watch?v=lMsdMP_eHkE" },
            { title: "Diseases caused by deficiency of Protein", url: "https://www.youtube.com/watch?v=uhnZYlpN7zE" },
            { title: "Vitamins deficiency", url: "https://www.youtube.com/watch?v=LORTeTxLyLk" },
            { title: "Minerals deficiency", url: "https://www.youtube.com/watch?v=xajzfHKjO0k" },
        ],
    },
    {
        id: 3,
        title: "Environment and Health",
        videos: [
            { title: "Sources of water supply, Water pollution, etc.", url: "https://www.youtube.com/watch?v=qq79LvI0RZo" },
            { title: "Health and light", url: "https://www.youtube.com/watch?v=XMOGo9ZjaYk" },
            { title: "Solid waste disposal and control", url: "https://www.youtube.com/watch?v=XHi7kV-ZMT0" },
            { title: "Arthropod borne diseases and their control", url: "https://www.youtube.com/watch?v=-Cf-Roky7Ok" },
        ],
    },
    {
        id: 4,
        title: "Communicable Diseases",
        videos: [
            { title: "Basic knowledge of communicable diseases", url: "https://www.youtube.com/watch?v=tV6q3IEXi40" },
            { title: "Mode of transmission", url: "https://www.youtube.com/watch?v=ujayVyZeIq8" },
            { title: "Methods of prevention", url: "https://www.youtube.com/watch?v=lmXMW__tPwU" },
            { title: "Arthropod borne infection (Malaria, Filaria, plague)", url: "youtube.com/watch?v=-Cf-Roky7Ok" },
            { title: "Enteric fever", url: "https://www.youtube.com/watch?v=RH5CSrg3EyE" },
            { title: "Dysentery", url: "https://www.youtube.com/watch?v=EQ1gsssYl_o" },
            { title: "Cholera", url: "https://www.youtube.com/watch?v=8bJgjq2X9Ig" },
            { title: "Food poisoning", url: "https://www.youtube.com/watch?v=9UX7-jSdfMs&t=364s" },
            { title: "Poliomyelitis", url: "https://www.youtube.com/watch?v=avZ2tZ5xdio&t=144s" },
            { title: "Hepatitis", url: "https://www.youtube.com/watch?v=TrPG8RAHvT0" },
            { title: "Worm infection", url: "https://www.youtube.com/watch?v=ZedeVRihmIA" },
            { title: "Diphtheria", url: "https://www.youtube.com/watch?v=3oSgQnIuxnY" },
            { title: "Measles", url: "https://www.youtube.com/watch?v=fCAd4fUF4mQ" },
            { title: "Chicken pox", url: "https://www.youtube.com/watch?v=G_03R3cvoLU" },
            { title: "Influenza", url: "https://www.youtube.com/watch?v=JacICAayRkc" },
            { title: "Whooping coughs", url: "https://www.youtube.com/watch?v=3oSgQnIuxnY&t=77s" },
            { title: "Tuberculosis", url: "https://www.youtube.com/watch?v=aNaM_BWYR2A" },
            { title: "Rabies (Zoonasis)", url: "https://www.youtube.com/watch?v=75ydHsNrzRw" },
            { title: "Surface Infection - Trachoma", url: "https://www.youtube.com/watch?v=prFgSq3F0Go" },
            { title: "Tetanus", url: "https://www.youtube.com/watch?v=X7JaOFSH7EY" },
            { title: "Ring worm", url: "https://www.youtube.com/watch?v=Fra1VmO6ojU" },
            { title: "Sexually Transmitted Diseases", url: "https://www.youtube.com/watch?v=pPhueo1BTew" },
            { title: "Syphilis", url: "https://www.youtube.com/watch?v=BeDr-ahzVYw" },
            { title: "Gonorrhea", url: "https://www.youtube.com/watch?v=qx0t23USjQU" },
            { title: "AIDS (Part 1)", url: "https://www.youtube.com/watch?v=mRjtR8i52zk" },
            { title: "AIDS (Part 2)", url: "https://www.youtube.com/watch?v=5v6qNV8O8nM" },
            { title: "AIDS (Part 3)", url: "https://www.youtube.com/watch?v=ODzsDNuSht8" },
        ],
    },
    {
        id: 5,
        title: "Non-Communicable Diseases",
        videos: [
            { title: "Basic knowledge of Non-Communicable diseases", url: "https://www.youtube.com/watch?v=gkZ-Ojsm3UA" },
            { title: "Diabetes", url: "https://www.youtube.com/watch?v=m9u5umcc4NQ" },
            { title: "Blindness", url: "https://www.youtube.com/watch?v=e9z8RkM-yKw" },
        ],
    },
    {
        id: 6,
        title: "Epidemiology",
        videos: [
            { title: "Epidemiology scope, methods, and uses", url: "https://www.youtube.com/watch?v=aOiVl375l4Y" },
            { title: "Immunization and Immunological Products", url: "https://www.youtube.com/watch?v=fmeauV5MnSs" },
            { title: "Principles of disease control", url: "https://www.youtube.com/watch?v=AsP5MqWk3po" },
        ],
    },
    {
        id: 7,
        title: "Dis-Infection",
        videos: [
            { title: "Type of disinfectants and disinfection", url: "https://www.youtube.com/watch?v=AJYSuxi0AO0" },
            { title: "Disinfection procedures", url: "https://www.youtube.com/watch?v=esVIqsAXG5I" },
        ],
    },
    {
        id: 8,
        title: "Demography and Family Planning",
        videos: [
            { title: "Demography and family planning", url: "https://www.youtube.com/watch?v=OibRep1M74I" },
            { title: "Demography cycle", url: "https://www.youtube.com/watch?v=aw8765hRjbk" },
            { title: "Contraceptives and behavioral methods", url: "https://www.youtube.com/watch?v=gWAisP_1wNo" },
            { title: "Natural family planning method", url: "https://www.youtube.com/watch?v=j6zqASQgD1U" },
            { title: "Chemical method", url: "https://www.youtube.com/watch?v=zCy2xNDCwvw" },
            { title: "Mechanical method", url: "https://www.youtube.com/watch?v=7Zq7B4FS5eU" },
            { title: "Hormonal contraceptives", url: "https://www.youtube.com/watch?v=moQULkNf4sY" },
            { title: "Population problem of India", url: "https://www.youtube.com/watch?v=jRyG0vFK69o" },
        ],
    },
    {
        id: 9,
        title: "Health Education",
        videos: [
            { title: "Objects and methods of health education", url: "youtube.com/watch?v=3GAevAC-P50" },
            { title: "Health programs by Govt. of India", url: "https://www.youtube.com/watch?v=9-rdUYHKTKo" },
            { title: "Public health laws", url: "https://www.youtube.com/watch?v=1DEgUmQyK6Y" },
            { title: "Public health administration in India", url: "https://www.youtube.com/watch?v=2X9xrlIZh3I" },
        ],
    },
    {
        id: 10,
        title: "First Aid",
        videos: [
            { title: "Emergency treatment in shock", url: "https://www.youtube.com/watch?v=g5Mt2NhLRWo" },
            { title: "Snake bite", url: "https://www.youtube.com/watch?v=BM1FGEq2xEw" },
            { title: "Poisoning", url: "https://www.youtube.com/watch?v=CU0T6q_fhWg" },
            { title: "Fracture and resuscitation methods", url: "https://www.youtube.com/watch?v=EzPbsiVwZjA" },
            { title: "Elements of minor surgery and dressing", url: "https://www.youtube.com/watch?v=lTccD40sj_c" },
        ],
    },
    {
        id: 11,
        title: "Sterilization",
        videos: [
            { title: "Concept of sterilization", url: "https://www.youtube.com/watch?v=L5_6kAQBN5E&t=150s" },
            { title: "Sterilization with moist and dry heat", url: "https://www.youtube.com/watch?v=mI1HJDE2Yxk" },
            { title: "Sterilization by radiation", url: "https://www.youtube.com/watch?v=Ohz108HhWew" },
            { title: "Gaseous sterilization", url: "https://www.youtube.com/watch?v=6Cmepyf9Ldg" },
        ],
    },
];

const homoeopathicPharmaceutics2Chapters = [
    {
        id: 1,
        title: "Extemporaneous Pharmacy",
        videos: [
            { title: "Prescriptions- Reading and contents", url: "https://www.youtube.com/watch?v=FDnalZwiojU" },
            { title: "Meaning of various abbreviations in prescriptions", url: "https://www.youtube.com/watch?v=T29495AWDBQ" },
            { title: "Posology- Quantity of Homoeopathic doses", url: "https://www.youtube.com/watch?v=Y_6aw6DkX2I" },
            { title: "Different forms of doses", url: "https://www.youtube.com/watch?v=_sGtUR5LABI" },
            { title: "Repetition of doses in acute and chronic diseases", url: "https://www.youtube.com/watch?v=Z-wusBPY0hc" },
        ],
    },
    {
        id: 2,
        title: "Dispensed Medication",
        videos: [
            { title: "Method of preparation, practical aspect, Labeling", url: "https://www.youtube.com/watch?v=At6JPRlRfKA" },
            { title: "Use of dispensing balance", url: "https://www.youtube.com/watch?v=ZZ0EegmiEgI" },
            { title: "Dispensing in sugar of milk", url: "https://www.youtube.com/watch?v=mpDGOU-1DuA" },
        ],
    },
    {
        id: 3,
        title: "Preparation Methods",
        videos: [
            { title: "Triturations", url: "https://www.youtube.com/watch?v=8YaOuQpDKUY" },
            { title: "Preparation on decimal and centesimal scale", url: "https://www.youtube.com/watch?v=WpfAdZAzlGE" },
            { title: "Conversion of trituration into liquid potencies", url: "https://www.youtube.com/watch?v=NPPLJyUKY0M&t=38s" },
            { title: "Fluxion and straight potency", url: "https://www.youtube.com/watch?v=-4DgawESL8s&t=3s" },
            { title: "Preparation of mother tincture", url: "https://www.youtube.com/watch?v=mZYYHVyHryw&t=500s" },
            { title: "Mother solution of fifty millesimal scale", url: "https://www.youtube.com/watch?v=BZHlSz4aW5s" },
            { title: "Hahnemann's methods - merits and demerits", url: "https://www.youtube.com/watch?v=wia2ly8lSAA" },
        ],
    },
    {
        id: 4,
        title: "Raising the Potency",
        videos: [
            { title: "Meaning of drug strength and potency", url: "https://www.youtube.com/watch?v=UPsURpFKFow" },
            { title: "Use of potentizer on different scales", url: "https://www.youtube.com/watch?v=WpfAdZAzlGE&t=57s" },
            { title: "Raising the power of fluxion potency", url: "https://www.youtube.com/watch?v=-4DgawESL8s&t=338s" },
        ],
    },
    {
        id: 5,
        title: "Preparation of Vehicles",
        videos: [
            { title: "General preparation of vehicles", url: "https://www.youtube.com/watch?v=KwemGEV3VQI" },
            { title: "Preparation of sugar of milk", url: "https://www.youtube.com/watch?v=f0Z0R3U5bC0" },
            { title: "Preparation of tablets", url: "https://www.youtube.com/watch?v=TaHu_rKgfN8&t=545s" },
            { title: "Preparation of cones", url: "https://www.youtube.com/watch?v=CAGbxgEURA4" },
            { title: "Preparation of globules", url: "https://www.youtube.com/watch?v=Kx9eASZ2148&t=70s" },
            { title: "Preparation of ratified spirit and distilled water", url: "https://www.youtube.com/watch?v=wJ75gXD7RCM" },
        ],
    },
    {
        id: 6,
        title: "Weight and Measures",
        videos: [
            { title: "Weight and measures", url: "https://www.youtube.com/watch?v=h2l4bX4dMdg" },
        ],
    },
    {
        id: 7,
        title: "Plant Constituents",
        videos: [
            { title: "Various constituents in plant substances", url: "https://www.youtube.com/watch?v=oRrvILZfJqs" },
        ],
    },
    {
        id: 8,
        title: "Homoeopathic Drug Proving",
        videos: [
            { title: "Technique of Homoeopathic drug proving", url: "https://www.youtube.com/watch?v=4IzY_Et3E5M" },
        ],
    },
    {
        id: 9,
        title: "Drug, Medicine, Remedy",
        videos: [
            { title: "Drug, medicine, Remedy", url: "https://www.youtube.com/watch?v=h8SiPqsdytI" },
        ],
    },
    {
        id: 10,
        title: "External Application",
        videos: [
            { title: "External application", url: "https://www.youtube.com/watch?v=p_yhNnX2TS4" },
        ],
    },
    {
        id: 11,
        title: "Drug Abbreviations",
        videos: [
            { title: "Drug and their abbreviation", url: "https://www.youtube.com/watch?v=kutWx7t3IeA" },
        ],
    },
    {
        id: 12,
        title: "Drug Identification",
        videos: [
            { title: "Drug with common name, family, distribution and part used", url: "https://www.youtube.com/watch?v=s0C2yAgALK0" },
        ],
    },
];

const pharmacognosyChapters = [
    {
        id: 1,
        title: "Introduction to Pharmacognosy",
        videos: [
            { title: "Meaning and scope of pharmacognosy", url: "https://www.youtube.com/watch?v=3T3X4y8nb1o" },
            { title: "Brief history and classification", url: "https://www.youtube.com/watch?v=mAF9-P4leWg" },
        ],
    },
    {
        id: 2,
        title: "Sources of Homoeopathic Drugs",
        videos: [
            { title: "Sources of Drugs (Vegetable, Mineral, Animal, etc.)", url: "https://www.youtube.com/watch?v=yEe986O4f0Y" },
            { title: "Imponderabilia and Collection of Drugs", url: "https://www.youtube.com/watch?v=qDrduoLw6Qo" },
        ],
    },
    {
        id: 3,
        title: "Drug Identification and Preservation",
        videos: [
            { title: "Identification and purification", url: "https://www.youtube.com/watch?v=o2HCFitd5qw" },
            { title: "Preservation of drug substance", url: "https://www.youtube.com/watch?v=d7e6w45B0mM" },
        ],
    },
    {
        id: 4,
        title: "Preparation of Mother Tinctures",
        videos: [
            { title: "Preparation of Mother Tinctures", url: "https://www.youtube.com/watch?v=wia2ly8lSAA&t=72s" },
            { title: "Modern method of preparation", url: "https://www.youtube.com/watch?v=mZYYHVyHryw&t=616s" },
            { title: "Estimation of Moisture Contents", url: "https://www.youtube.com/watch?v=FfxHot6BLZk&t=100s" },
            { title: "Maceration", url: "https://www.youtube.com/watch?v=qFZbdHhJxw8" },
            { title: "Percolation", url: "https://www.youtube.com/watch?v=7qeIFwARHKs&t=13s" },
        ],
    },
    {
        id: 5,
        title: "Purity and Authenticity",
        videos: [
            { title: "Test for purity and authenticity", url: "https://www.youtube.com/watch?v=cmUOoN6NHhE" },
            { title: "Aqueous solutions", url: "https://www.youtube.com/watch?v=5G5SI-_nyxg" },
            { title: "Trituration of liquid substances", url: "https://www.youtube.com/watch?v=BxVFGQpap3g" },
        ],
    },
    {
        id: 6,
        title: "Methods of Preparation",
        videos: [
            { title: "Hahnemanan method of preparation", url: "https://www.youtube.com/watch?v=7XgU6HKRf0I&t=494s" },
            { title: "Methods in different pharmacopoeias", url: "https://www.youtube.com/watch?v=D4l5nYvIKY4&t=25s" },
        ],
    },
    {
        id: 7,
        title: "Potentiation",
        videos: [
            { title: "Potentiating Trituration and succession", url: "https://www.youtube.com/watch?v=5Bv4MaSelSY" },
        ],
    },
];

const pharmaceuticalJurisprudenceChapters = [
    {
        id: 1,
        title: "Introduction and Legislation",
        videos: [
            { title: "Drug action, chemical characters and toxicology of crude drug substance", url: "https://www.youtube.com/watch?v=OxZ3F2rzr5Y" },
            { title: "Origin and nature of pharmaceutical legislation in India", url: "https://www.youtube.com/watch?v=5PomwqIfUes" },
            { title: "Evolution of the 'Concept of pharmacy'", url: "https://www.youtube.com/watch?v=fLH8joV4xMQ" },
            { title: "Principles and significance of professional ethics", url: "https://www.youtube.com/watch?v=LhbeQ1tIW_A" },
            { title: "Code of conduct with patients", url: "https://www.youtube.com/watch?v=AIu0vhpEbOg" },
        ],
    },
    {
        id: 2,
        title: "Drug and Cosmetics Act 1940",
        videos: [
            { title: "Drug and cosmetics Act 1940 and rules", url: "https://www.youtube.com/watch?v=qVq8d-7oEnI" },
            { title: "General study of the act and rules", url: "https://www.youtube.com/watch?v=jAQqvw0jio8" },
            { title: "Drugs technical-advisory board", url: "https://www.youtube.com/watch?v=-4nzP2vOGdg" },
            { title: "Power of inspectors", url: "https://www.youtube.com/watch?v=JT4PGEceMBk" },
            { title: "Sampling procedure", url: "https://www.youtube.com/watch?v=d8PGH63P8Mg" },
            { title: "Licenses for Manufacture and sale", url: "https://www.youtube.com/watch?v=PopSy2UXtGY" },
            { title: "Labeling and packing of homoeopathic medicine", url: "https://www.youtube.com/watch?v=KeFI9PwEhhY" },
        ],
    },
    {
        id: 3,
        title: "Other Relevant Acts",
        videos: [
            { title: "Drugs and magic remedies (objectionable advertisement) Act 1954", url: "https://www.youtube.com/watch?v=zSmqToIIc2M" },
            { title: "Narcotic drug and psychotropic substances act 1985", url: "https://www.youtube.com/watch?v=r2-MpO-XrBc" },
        ],
    },
    {
        id: 4,
        title: "Brief Introduction to Other Acts",
        videos: [
            { title: "Latest drugs (Price control) order in force", url: "https://www.youtube.com/watch?v=1YwKD5V7Km8" },
            { title: "Poison act 1919", url: "https://www.youtube.com/watch?v=3UyarfoWRGM" },
            { title: "Medicinal and tollet preparation (excise duties) Act 1955", url: "https://www.youtube.com/watch?v=dR41quUDFqA&t=513s" },
            { title: "Medical Tremination of Pregnancy act 1971", url: "https://www.youtube.com/watch?v=vgklRKAOWs0" },
            { title: "Medicinal dangerous drugs act", url: "https://www.youtube.com/watch?v=8UsbC70MjHc" },
            { title: "Indian evidence Act", url: "https://www.youtube.com/watch?v=-Ox_dcnftFo" },
            { title: "Workman commensation Act", url: "https://www.youtube.com/watch?v=NKBVqJ2XCrM" },
        ],
    },
];

const drugStoreAndBusinessManagementChapters = [
    {
        id: 1,
        title: "Introduction to Commerce",
        videos: [
            { title: "Trade, Industry and Commerce", url: "https://www.youtube.com/watch?v=7CXhNCpNeVU" },
            { title: "Functions and Sub-division of Commerce", url: "https://www.youtube.com/watch?v=cGbBUYJ5lxU" },
            { title: "Elements of Economics and Management", url: "https://www.youtube.com/watch?v=r6bkBEbzC7I" },
        ],
    },
    {
        id: 2,
        title: "Forms of Business Organizations",
        videos: [
            { title: "Forms of Business Organizations", url: "https://www.youtube.com/watch?v=pcUktcbuH18" },
        ],
    },
    {
        id: 3,
        title: "Channel of Distribution",
        videos: [
            { title: "Channel of Distribution", url: "https://www.youtube.com/watch?v=KZN4nIY9G7U" },
        ],
    },
    {
        id: 4,
        title: "Drug House Management",
        videos: [
            { title: "Selection of Site", url: "https://www.youtube.com/watch?v=99mg8WQlqYg" },
            { title: "Space, Layout and Requirements", url: "https://www.youtube.com/watch?v=q02iHNTb4FA" },
            { title: "Purchasing & Credit Information", url: "https://www.youtube.com/watch?v=RRA4YVtQT4Q" },
            { title: "Bending of the Drug Store", url: "https://www.youtube.com/watch?v=AOgtugt6600" },
            { title: "Codification Methods", url: "https://www.youtube.com/watch?v=UUoCMzk1Gp4" },
        ],
    },
    {
        id: 5,
        title: "Inventory Control",
        videos: [
            { title: "Importance and Aim", url: "https://www.youtube.com/watch?v=VJ8XrjF88lY" },
            { title: "Inventory Carrying Cost", url: "https://www.youtube.com/watch?v=x5jaiElhDJ0" },
            { title: "Safety Stock", url: "https://www.youtube.com/watch?v=elA6r4XqVIw" },
            { title: "Stock Levels & EOQ", url: "https://www.youtube.com/watch?v=f7SqJmeCaMQ" },
            { title: "Surplus Disposal", url: "https://www.youtube.com/watch?v=Z2XS_N8iWZM" },
            { title: "Modern Techniques", url: "https://www.youtube.com/watch?v=zfbsvCy7vs8&t=54s" },
        ],
    },
    {
        id: 6,
        title: "Sales & Marketing",
        videos: [
            { title: "Sales Promotions & Market Research", url: "https://www.youtube.com/watch?v=IenriAnum0A" },
            { title: "Qualities of a Salesman", url: "https://www.youtube.com/watch?v=q9BPyoKrrEc" },
            { title: "Advertising", url: "https://www.youtube.com/watch?v=U1TnSej1n6Q" },
            { title: "Window Display", url: "https://www.youtube.com/watch?v=tkHaj2FXv7E" },
        ],
    },
    {
        id: 7,
        title: "Pharmacist Management",
        videos: [
            { title: "Recruitment, Training & Compensation", url: "https://www.youtube.com/watch?v=m387JCwd9xM" },
        ],
    },
    {
        id: 8,
        title: "Banking and Finance",
        videos: [
            { title: "Introduction to Banking and Finance", url: "https://www.youtube.com/watch?v=mJs3HIe55tI" },
            { title: "Service and Function of Bank", url: "https://www.youtube.com/watch?v=4gBzX9ttIcU" },
            { title: "Finance Planning & Sources", url: "https://www.youtube.com/watch?v=moLWgErJI_c" },
        ],
    },
    {
        id: 9,
        title: "Accountancy: Introduction",
        videos: [
            { title: "Accounting Concepts, Double Entry, Book Keeping", url: "https://www.youtube.com/watch?v=rn5sv_py2dM" },
        ],
    },
    {
        id: 10,
        title: "Accountancy: Cash Book",
        videos: [
            { title: "Cash Book", url: "https://www.youtube.com/watch?v=dKOUx_qwMlM" },
        ],
    },
    {
        id: 11,
        title: "Accountancy: Ledger & Trial Balance",
        videos: [
            { title: "General Ledger and Trial Balance", url: "https://www.youtube.com/watch?v=Udmo7VTLORs" },
        ],
    },
    {
        id: 12,
        title: "Accountancy: Financial Statements",
        videos: [
            { title: "Profit and Loss Account", url: "https://www.youtube.com/watch?v=m3XrNrJJrrQ" },
            { title: "Balance Sheet", url: "https://www.youtube.com/watch?v=AT2PawLBZwI" },
        ],
    },
    {
        id: 13,
        title: "Accountancy: Financial Analysis",
        videos: [
            { title: "Analyzing Financial Statements & Budgeting", url: "https://www.youtube.com/watch?v=7aaG0AHUiDs&list=PLm1UIYLZ8ZUK1_l9TDD4jhVQtREthlP0K&index=43" },
        ],
    },
];

const hospitalAndClinicalPharmacyChapters = [
    {
        id: 1,
        title: "Hospital Pharmacy Functions & Requirements",
        videos: [
            { title: "Function of hospital pharmacy", url: "https://www.youtube.com/watch?v=lhW3Mde9DDM" },
            { title: "Definition and Requirement for hospital pharmacy layout, manpower", url: "https://www.youtube.com/watch?v=1ehXMgpb_sw" },
            { title: "Minimum equipments required for a pharmacy", url: "https://www.youtube.com/watch?v=CN5NDA1Cl2s&t=299s" },
            { title: "Hospital pharmacists - Moto qualities, duties and responsibilities", url: "https://www.youtube.com/watch?v=hoOS460qJAI" },
        ],
    },
    {
        id: 2,
        title: "Hospital Knowledge & Systems",
        videos: [
            { title: "Function, different type of hospital, management", url: "https://www.youtube.com/watch?v=5StSJm_i3kY" },
            { title: "Health delivery system in india", url: "https://www.youtube.com/watch?v=x_pfAnvfqt4" },
        ],
    },
    {
        id: 3,
        title: "Distribution of Medicines",
        videos: [
            { title: "Distribution of medicines in hospital", url: "https://www.youtube.com/watch?v=DqDv4bD-rYQ" },
            { title: "Handling and upkeep of medicine", url: "https://www.youtube.com/watch?v=tV7x--gRkik" },
        ],
    },
    {
        id: 4,
        title: "Hospital Equipments & Materials",
        videos: [
            { title: "Hospital equipments and instruments", url: "https://www.youtube.com/watch?v=YPZObTm2vLs" },
            { title: "Dressing and other material quality tests", url: "https://www.youtube.com/watch?v=lTccD40sj_c" },
            { title: "I.V. sets, Catheters, syringes, thermometers", url: "https://www.youtube.com/watch?v=A5RArgRfBvU" },
        ],
    },
    {
        id: 5,
        title: "Introduction to Clinical Pharmacy",
        videos: [
            { title: "Definition and scope of clinical pharmacy", url: "https://www.youtube.com/watch?v=tTmI_38XT6Y" },
            { title: "Classification disease according to Dr. Hahnemann", url: "https://www.youtube.com/watch?v=g224RsCCQbQ" },
            { title: "Dispensing, storage, cleanliness and maintenance", url: "https://www.youtube.com/watch?v=DFtdhSCjasQ" },
        ],
    },
    {
        id: 6,
        title: "Homoeopathic Principles in Clinical Practice",
        videos: [
            { title: "Role of Vital force in health and disease", url: "https://www.youtube.com/watch?v=Ip035-TUr44" },
            { title: "Features of psora, sycosis and syphilis", url: "https://www.youtube.com/watch?v=cq6AlAdfFCg" },
        ],
    },
    {
        id: 7,
        title: "Drug Reactions & Terminology",
        videos: [
            { title: "Homoeopathic aggravation", url: "https://www.youtube.com/watch?v=mVj9DKCcruE" },
            { title: "Adverse drug reactions", url: "https://www.youtube.com/watch?v=KsmIajQlYYE" },
            { title: "Palliation", url: "https://www.youtube.com/watch?v=E-26d5Fnrnk" },
            { title: "Common terminology of important diseases", url: "https://www.youtube.com/watch?v=7N707ypEJIw" },
        ],
    },
    {
        id: 8,
        title: "Special Topics",
        videos: [
            { title: "Study of drug addicts and abuse", url: "https://www.youtube.com/watch?v=RT8j0PUEWSo" },
            { title: "Red cross society of India", url: "https://www.youtube.com/watch?v=qBDhmxXsFqo" },
            { title: "Transportation of sick or injured persons", url: "https://www.youtube.com/watch?v=qt94qmBcv-o" },
        ],
    },
];

const diplomaInHomeopathicPharmacySubjects = [
    {
        id: 1,
        name: "Elementary Human Anatomy and Physiology",
        chapters: anatomyAndPhysiologyChapters
    },
    {
        id: 2,
        name: "Clinical Pathology and Toxicology",
        chapters: clinicalPathologyAndToxicologyChapters
    },
    {
        id: 3,
        name: "Introductory Homoeopathy, Bio, Chemistry & Twelve Tissue Remides",
        chapters: introductoryHomoeopathyChapters
    },
    {
        id: 4,
        name: "Homoeopathic Pharmaceutics & Pharmaceutical-Chemistry-I",
        chapters: homoeopathicPharmaceuticsChapters
    },
    {
        id: 5,
        name: "Health Education and Community Pharmacy",
        chapters: healthEducationAndCommunityPharmacyChapters
    },
    {
        id: 6,
        name: "Homoeopathic Pharmaceutics and Pharmaceuticals chemistry-II",
        chapters: homoeopathicPharmaceutics2Chapters
    },
    {
        id: 7,
        name: "PHARMACOGNOSY",
        chapters: pharmacognosyChapters
    },
    {
        id: 8,
        name: "Pharmaceutical Jurisprudence",
        chapters: pharmaceuticalJurisprudenceChapters
    },
    {
        id: 9,
        name: "Drug Store & Business Management",
        chapters: drugStoreAndBusinessManagementChapters
    },
    {
        id: 10,
        name: "Hospital and clinical pharmacy",
        chapters: hospitalAndClinicalPharmacyChapters
    }
];

const rawPrograms = [
    {
        id: 1,
        name: "Diploma In homeopathic Pharmacy",
        years: [
            {
                id: 1,
                year: 1,
                subjects: diplomaInHomeopathicPharmacySubjects.slice(0, 5),
            },
            {
                id: 2,
                year: 2,
                subjects: diplomaInHomeopathicPharmacySubjects.slice(5),
            }
        ]
    },
    {
        id: 2,
        name: "ITI Electrician",
        years: []
    },
    {
        id: 3,
        name: "Health & Inspector",
        years: []
    }
];

const sortedPrograms = rawPrograms.sort((a, b) => a.name.localeCompare(b.name));

export const PROGRAM_DATA: Program[] = sortedPrograms.map(program => ({
    ...program,
    years: [...program.years]
        .sort((a, b) => a.year - b.year)
        .map(year => ({
            ...year,
            subjects: [...year.subjects]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(subject => ({
                    ...subject,
                    chapters: subject.chapters.map(chapter => ({
                        ...chapter,
                        videos: chapter.videos.map((video, index) => ({
                            id: Date.now() + index,
                            ...video,
                            videoId: getYouTubeVideoId(video.url)
                        }))
                    }))
                }))
        }))
}));