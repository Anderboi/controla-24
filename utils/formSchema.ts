import { Option } from "@/components/ui/multi-selector";
import { IWallMaterialFeatures } from '@/types';
import { z } from "zod";

export const formSchema = z.object({
  //Client Info
  firstName: z.string().min(1, { message: "Необходимо ввести имя" }).trim(),
  lastName: z.string().min(1, { message: "Необходимо ввести фамилию" }).trim(),
  middleName: z.string().trim().optional(),
  email: z.string().email().trim().optional(),
  phone: z.string().trim().optional(),
  //Project Info
  projectName: z.string().trim().optional(),
  contractId: z.string().trim().optional(),
  address: z.string().min(1, { message: "Необходимо ввести адрес" }).trim(),
  //Project additional info
  area: z.coerce.number().min(1, { message: "Необходимо указать площадь" }),
  floorsNumber: z.coerce.number().optional(),
  purpose: z.string().default("Жилое").optional(),
  approxBudget: z.coerce.number().array().optional(),
  //Inhabitant Info
  adults: z.coerce.number().positive(),
  adultHeight: z.array(z.coerce.number().optional()).optional(),
  children: z.coerce.number(),
  childrenAge: z.array(z.coerce.number()).optional(),
  hasPets: z.boolean().optional(),
  pets: z.string().trim().optional(),
  hobbies: z.string().trim().optional(),
  healthFeatures: z.string().trim().optional(),
  //Room List
  rooms: z
    .array(
      z.object({
        name: z.string().trim(),
        area: z.coerce.number(),
      }),
    )
    .optional(),
  //Demolition Info
  planChange: z.boolean().optional(),
  entranceDoorChange: z.boolean().optional(),
  windowsChange: z.boolean().optional(),
  furnitureDemolition: z.boolean().optional(),
  //Construction Info
  wallsMaterial: z.array(z.string()).optional(),
  ceilingMaterial: z.array(z.string()).optional(),
  floorMaterial: z.array(z.string()).optional(),
  hasIsolationSurfaces: z.boolean().optional(),
  isolationMaterials: z.string().optional(),
  roomsForIsolation: z.array(z.string()).optional(),
  innerDoorsHeight: z.coerce.number().array().optional(),
  //Heating System
  heatingSystem: z.array(z.string()).optional(),
  // warmFloor: z.boolean().optional(),
  warmFloorRooms: z.array(z.string()).optional(),
  //Conditioning System
  conditioningSystem: z.array(z.string()).optional(),
  //Plumbing System
  plumbingSystem: z.array(z.string()).optional(),
  //Electric Systems
  electricSystem: z.array(z.string()).optional(),
  //TODO Sanitary Equipment
  sanitaryEquipment: z.array(z.string()).optional(),
  //TODO Kitchen Equipment
  kitchenEquipment: z.array(z.string()).optional(),
  //TODO Loundry Equipment
  loundryEquipment: z.array(z.string()).optional(),

  equipment: z
    .array(z.object({ name: z.array(z.string()), room_id: z.string() }))
    .optional(),
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
    value: "Гардеробная",
    label: "Гардеробная",
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
export const wallMaterials: string[] = [
  "Кирпич",
  "Пазогребневые плиты (ПГП)",
  "Керамзитобетонные блоки",
  "Газобетон или пенобетон",
  "Гипсокартон",
];



export const wallsMaterials: IWallMaterialFeatures[] = [
  {
    name: "Кирпичная перегородка",
    width: "65 - 120 мм",
    soundproof: "до 45 дБ (норма 54 дБ)",
    soundproofDescription:
      "Стена из полнотелого кирпича плотностью 1600 кг/м3 и толщиной 120 мм имеет индекс изоляции воздушного шума Rw=450дБ и показатель звукоизоляции 340дБ в интервале 100÷315 Гц.",
    waterResistance: "",
    fireResistance: "65 мм - EI 45, 120 мм - EI 150",
    cons: ["большой вес", "сложность монтажа", "высокая стоимость"],
    pros: ["долговечность", "экологичность", "высокая прочность"],
  },
  {
    name: "Керамзитобетонная перегородка",
    width: "80, 90 мм",
    soundproof: "до 42 дБ (норма 54 дБ)",
    waterResistance: "10%",
    fireResistance: "EI 180.",
    cons: ["возможны трещины при усадке"],
    pros: [
      "легкость монтажа",
      "доступная цена",
      "способность противостоять грибку, плесени",
    ],
  },
  {
    name: "Пазогребневая перегородка",
    width: "80, 100 мм",
    soundproof: "37-41 дБ (норма 54 дБ)",
    waterResistance: "5%",
    fireResistance: "EI 90 - EI 120",
    cons: ["возможны трещины при усадке"],
    pros: [
      "не требуется оштукатуривание, только финишное шпаклевание",
      "легкость монтажа",
      "доступная цена",
      "дверные и оконные проемы до 900 мм можно монтировать без закладных (перемычек)",
    ],
  },
  {
    name: "Газобетонная перегородка",
    width: "75, 100 мм",
    soundproof: "до 48 дБ (норма 54 дБ)",
    waterResistance: "35%",
    fireResistance: "75 мм - EI 90, 100 мм - EI 150.",
    cons: ["возможны трещины при усадке"],
    pros: ["простота монтажа", "экологичность"],
  },
  {
    name: "Гипсокартонная перегородка",
    width: "80 - 155 мм",
    soundproof: "до 53 дБ (норма 54 дБ)",
    waterResistance: "",
    fireResistance: "EI 45 - EI 150.",
    cons: ["низкая влагостойкость", "хрупкость", 'необходимость в закладных'],
    pros: [
      "простота монтажа",
      "невысокая цена и экологичность",
      "ровность поверхности перегородки",
      "возможность скрыть проводку",
    ],
  },
];

export const floorMaterials: string[] = [
  "Инженерная доска",
  "Паркетная доска",
  "Ламинат",
  "Кварцвинил",
  "Керамогранит",
  "Натуральный камень",
];

// export const floorMaterials: Option[] = [
//   {
//     value: "Инженерная доска",
//     label: "Инженерная доска",
//   },
//   { value: "Паркетная доска", label: "Паркетная доска" },
//   { value: "Ламинат", label: "Ламинат" },
//   { value: "Кварцвинил", label: "Кварцвинил" },
//   { value: "Керамогранит", label: "Керамогранит" },
//   { value: "Натуральный камень", label: "Натуральный камень" },
// ];

export const ceilingMaterials: string[] = [
  "Гипсокартон",
  "Натяжной потолок",
  "Без подшивки",
];
// export const ceilingMaterials: Option[] = [
//   { value: "Гипсокартон", label: "Гипсокартон" },
//   { value: "Натяжной потолок", label: "Натяжной потолок" },
//   { value: "Без подшивки", label: "Без подшивки" },
// ];

export const heatingSystems: string[] = [
  "Радиаторы",
  "Конвекторы",
  "Воздушная система отопления",
  "ИК-радиаторы",
  "Теплый пол",
];

export const conditioningSystems: string[] = [
  "Сплит-система",
  "Канальная",
  "Приточно-вытяжная",
  "Бризер",
  "Увлажнитель воздуха",
];

export const electricSystems: string[] = [
  "Управление климатом",
  "Управление отоплением",
  "Управление освещением",
  "Управление медиа",
  "Управление сигнализацией",
  "Управление видеонаблюдением",
  "Установка датчиков протечки воды",
  "Управление шторами",
  "Установка RJ45 розеток (интернет)",
];

export const plumbingSystems: string[] = [
  "Станция очистки воды",
  "Магистральные фильтры",
  "Фильтр обратного осмоса",
  "УФ очистка воды",
];

export const equipment: Option[] = [
  { value: "Холодильник", label: "Холодильник", group: "Кухня" },
  { value: "Духовой шкаф", label: "Духовой шкаф", group: "Кухня" },
  { value: "Варочная панель", label: "Варочная панель", group: "Кухня" },
  {
    value: "Посудомоечная машина",
    label: "Посудомоечная машина",
    group: "Кухня",
  },
  { value: "Вытяжка", label: "Вытяжка", group: "Кухня" },
  { value: "Винный шкаф", label: "Винный шкаф", group: "Кухня" },
  { value: "Морозильник", label: "Морозильник", group: "Кухня" },
  { value: "Микроволновая печь", label: "Микроволновая печь", group: "Кухня" },
  {
    value: "Измельчитель отходов",
    label: "Измельчитель отходов",
    group: "Кухня",
  },
  { value: "Унитаз", label: "Унитаз", group: "Сантехника" },
  { value: "Биде", label: "Биде", group: "Сантехника" },
  {
    value: "Гигиенический душ",
    label: "Гигиенический душ",
    group: "Сантехника",
  },
  { value: "Душ", label: "Душ", group: "Сантехника" },
  { value: "Ванна", label: "Ванна", group: "Сантехника" },
  { value: "Умывальник", label: "Умывальник", group: "Сантехника" },
  {
    value: "Полотенцесушитель",
    label: "Полотенцесушитель",
    group: "Сантехника",
  },
];

export const sanitaryEquipment: Option[] = [
  { value: "Унитаз", label: "Унитаз" },
  { value: "Биде", label: "Биде" },
  { value: "Гигиенический душ", label: "Гигиенический душ" },
  { value: "Умывальник", label: "Умывальник" },
  { value: "Полотенцесушитель", label: "Полотенцесушитель" },
];
