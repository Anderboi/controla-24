import { Option } from '@/components/ui/multiSelector';
import { z } from 'zod';

export const formSchema = z.object({
  //Client Info
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
  middleName: z.string().min(1).trim().optional(),
  email: z.string().email().trim().optional(),
  phone: z.string().trim().optional(),
  //Project Info
  projectName: z.string().trim().optional(),
  contractId: z.string().min(1).trim().optional(),
  address: z.string().min(1).trim(),
  //Project additional info
  area: z.coerce.number().min(1),
  floorsNumber: z.coerce.number().optional(),
  purpose: z.string().optional(),
  approxBudget: z.string().array().optional(),
  //Inhabitant Info
  hasPets: z.boolean().optional(),
  pets: z.string().trim().optional(),
  hobbies: z.string().trim().optional(),
  allergy: z.string().trim().optional(),
  adults: z.coerce.number().positive(),
  children: z.coerce.number().positive().optional(),
  childrenAge: z.string().trim().optional(),
  //Room List
  rooms: z.any().array(),
  //Demolition Info
  planChange: z.boolean().optional(),
  entranceDoorChange: z.boolean().optional(),
  windowsChange: z.boolean().optional(),
  furnitureDemolition: z.boolean().optional(),
  //Construction Info
  wallsMaterial: z.string().optional(),
  floorMaterial: z.string().optional(),
  ceilingMaterial: z.string().optional(),
  isIsolationSurfaces: z.boolean().optional(),
  isolationMaterials: z.string().optional(),
  roomsForIsolation: z.string().array().optional(),
  innerDoorsHeight: z.string().optional(),
  //Color Palete
  preferedColors: z.string().array().optional(),
  shouldIgnoreColors: z.string().array().optional(),
  //Heating System
  heatingSystem: z.string().array().optional(),
  warmFloor: z.boolean().optional(),
  warmFloorRooms: z.string().array().optional(),
  //Conditioning System
  conditioningSystem: z.string().array().optional(),
  //Plumbing System
  plumbingSystem: z.string().array().optional(),
  //Electric Systems
  electricSystem: z.string().array().optional(),
  //TODO Sanitary Equipment
  sanitaryEquipment: z.string().array().optional(),
  //TODO Kitchen Equipment
  kitchenEquipment: z.string().array().optional(),
  //TODO Loundry Equipment
  loundryEquipment: z.string().array().optional(),
});

export const roomList: Option[] = [
  {
    value: "Прихожая",
    label: "Прихожая",
  },
  {
    value: "Гостиная",
    label: "Гостиная",
  },
  {
    value: "Кухня",
    label: "Кухня",
  },
  {
    value: "Столовая",
    label: "Столовая",
  },
  {
    value: "Спальня",
    label: "Спальня",
  },
  {
    value: "Детская",
    label: "Детская",
  },
  {
    value: "Ванная комната",
    label: "Ванная комната",
  },
  {
    value: "Санузел",
    label: "Санузел",
  },
  {
    value: "Постирочная",
    label: "Постирочная",
  },
];