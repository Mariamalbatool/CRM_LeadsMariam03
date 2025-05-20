
export type Source = "facebook" | "instagram" | "whatsapp" | "other";

export type Stage = 
  | "new" 
  | "initial_contact" 
  | "interested" 
  | "follow_up" 
  | "potential_deal" 
  | "sold" 
  | "not_interested";

export type Location = 
  | "west_bank" 
  | "jerusalem" 
  | "jerusalem_villages" 
  | "internal";

export type Gender = "male" | "female";

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  source: Source;
  stage: Stage;
  date: string;
  location: Location;
  city?: string;
  responsible: string;
  supervisorNote?: string;
  facebookName?: string;
  instagramName?: string;
  whatsappNumber?: string;
  gender: Gender;
}

export const stagesTranslations: Record<Stage, string> = {
  new: "جديد",
  initial_contact: "تواصل أولي",
  interested: "مهتم",
  follow_up: "قيد المتابعة",
  potential_deal: "صفقة محتملة",
  sold: "تم البيع",
  not_interested: "غير مهتم"
};

export const sourceTranslations: Record<Source, string> = {
  facebook: "فيسبوك",
  instagram: "انستجرام",
  whatsapp: "واتساب",
  other: "أخرى"
};

export const locationTranslations: Record<Location, string> = {
  west_bank: "الضفة",
  jerusalem: "القدس",
  jerusalem_villages: "قرى القدس",
  internal: "الداخل",
};

export const genderTranslations: Record<Gender, string> = {
  male: "ذكر",
  female: "أنثى"
};

export const cityOptions: Record<Location, string[]> = {
  west_bank: ["رام الله", "نابلس", "الخليل", "بيت لحم", "جنين", "طولكرم", "قلقيلية", "طوباس", "سلفيت", "أريحا"],
  jerusalem: ["بيت حنينا", "شعفاط", "العيسوية", "الطور", "سلوان", "رأس العامود", "بيت صفافا", "صور باهر"],
  jerusalem_villages: ["بدو", "الجيب", "بير نبالا", "القبيبة", "بيت عنان", "قطنة", "بيت سوريك", "بيت اكسا"],
  internal: ["حيفا", "عكا", "الناصرة", "شفاعمرو", "أم الفحم", "الطيبة", "الطيرة", "كفر قاسم", "قلنسوة"]
};
