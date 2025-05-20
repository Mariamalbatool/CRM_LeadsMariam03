
import { Customer, Source, Stage } from "./types";

export const mockCustomers: Customer[] = [
  {
    id: 1,
    firstName: "يحيى",
    lastName: "قاسم",
    mobilePhone: "(+970)*********",
    source: "instagram",
    stage: "new",
    date: "2025-3-7",
    location: "west_bank",
    city: "رام الله",
    responsible: "admin",
    supervisorNote: "",
    facebookName: "",
    instagramName: "yahya_qasem",
    gender: "male"
  },
  {
    id: 2,
    firstName: "مصعب",
    lastName: "الحارث",
    mobilePhone: "(+970)*********",
    source: "whatsapp",
    stage: "initial_contact",
    date: "2025-5-5",
    location: "jerusalem",
    city: "بيت حنينا",
    responsible: "sale",
    supervisorNote: "",
    whatsappNumber: "(+970)*********",
    gender: "male"
  },
  {
    id: 3,
    firstName: "ربيع",
    lastName: "الهادي",
    mobilePhone: "(+970)*********",
    source: "facebook",
    stage: "interested",
    date: "2025-6-8",
    location: "west_bank",
    city: "نابلس",
    responsible: "administrator",
    supervisorNote: "",
    facebookName: "rabee.alhadi",
    gender: "male"
  },
  {
    id: 4,
    firstName: "فايز",
    lastName: "توفيق",
    mobilePhone: "(+970)*********",
    source: "instagram",
    stage: "follow_up",
    date: "2025-1-15",
    location: "jerusalem_villages",
    city: "بدو",
    responsible: "super admin",
    supervisorNote: "",
    instagramName: "fayez_tawfiq",
    gender: "male"
  },
  {
    id: 5,
    firstName: "تيم",
    lastName: "تامر",
    mobilePhone: "(+970)*********",
    source: "whatsapp",
    stage: "potential_deal",
    date: "2025-4-13",
    location: "internal",
    city: "حيفا",
    responsible: "administrator",
    supervisorNote: "",
    whatsappNumber: "(+970)*********",
    gender: "male"
  },
  {
    id: 6,
    firstName: "أحمد",
    lastName: "يوسف",
    mobilePhone: "(+970)*********",
    source: "facebook",
    stage: "sold",
    date: "2025-2-1",
    location: "west_bank",
    city: "الخليل",
    responsible: "sale",
    supervisorNote: "",
    facebookName: "ahmad.yousef",
    whatsappNumber: "(+970)*********",
    gender: "male"
  },
  {
    id: 7,
    firstName: "محمد",
    lastName: "عبدالله",
    mobilePhone: "(+970)*********",
    source: "instagram",
    stage: "not_interested",
    date: "2025-4-26",
    location: "west_bank",
    city: "بيت لحم",
    responsible: "sale",
    supervisorNote: "",
    instagramName: "mohammad.abdullah",
    gender: "male"
  }
];

export const employees = [
  "admin",
  "administrator",
  "super admin",
  "sale"
];
