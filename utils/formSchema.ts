import { Option } from "@/components/ui/multiSelector";
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
  purpose: z.string().optional(),
  approxBudget: z.coerce.number().array().optional(),
  //Inhabitant Info
  adults: z.coerce.number().positive(),
  children: z.coerce.number().optional(),
  childrenAge: z.string().trim().optional(),
  hasPets: z.boolean().optional(),
  pets: z.string().trim().optional(),
  hobbies: z.string().trim().optional(),
  healthFeatures: z.string().trim().optional(),
  //Room List
  rooms: z.any().array().optional(),
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

export const wallsMaterials: Option[] = [
  {
    value: "Кирпич",
    label: "Кирпич",
    // pros: [
    //   `Прочность`,
    //   // `Кирпичные перегородки выдерживают большие нагрузки, отлично подходят для разделения жилых комнат, санузлов, обустройства арок и колонн.`,
    //   `Долговечность`,
    //   // `При правильной кладке и уходе кирпичные стены простоят десятилетия.`,
    //   `Звукоизоляция:`,
    //   // `Кирпич обеспечивает отличную звукоизоляцию, что особенно важно для создания тихой и комфортной атмосферы в жилых помещениях.`,
    //   `Негорючесть`,
    //   // `Кирпич является негорючим материалом, что повышает пожарную безопасность дома.`,
    // ],
    // cons: [
    //   `Тяжелый: Кирпичные стены создают значительную нагрузку на перекрытия, что необходимо учитывать при проектировании.`,
    //   `Трудоемкий монтаж: Кладка кирпича требует определенных навыков и опыта, что увеличивает стоимость и сроки строительства.`,
    //   `Требует дополнительной отделки: Кирпичные стены обычно нуждаются в штукатурке, окраске или другом виде декоративной отделки.`,
    // ],
  },
  {
    value: "Пазогребневые плиты (ПГП)",
    label: "Пазогребневые плиты (ПГП)",
    // width: "80, 100 мм",
    // pros: [
    //   "Быстрый монтаж: Благодаря наличию пазогребневого соединения плиты легко и быстро монтируются, не требуя применения сложных инструментов и растворов.",
    //   "Ровная поверхность: Плиты имеют ровную поверхность, что не требует дополнительного выравнивания перед финишной отделкой.",
    // ],
    // cons: [
    //   "Плохая звукоизоляция: Звукоизоляционные свойства ПГП ниже, чем у кирпича или газобетона.",
    //   "Хрупкость: Плиты ПГП достаточно хрупкие, требуют осторожности при транспортировке и монтаже.",
    //   "Подходят только для прямых перегородок: Из ПГП можно возводить только прямые перегородки, сложные конструкции с углами и закруглениями выполнить невозможно.",
    // ],
  },
  {
    value: "Керамзитобетонные блоки",
    label: "Керамзитобетонные блоки",
    // pros: [
    //   "Легкость: Керамзитобетонные блоки значительно легче кирпича, что снижает нагрузку на фундамент и несущие стены.",
    //   "Теплоизоляция: Керамзитобетон обладает хорошими теплоизоляционными свойствами, что позволяет экономить на отоплении.",
    //   "Звукоизоляция: При достаточной толщине стены из керамзитобетона обеспечивают хорошую звукоизоляцию.",
    //   "Прочность: Керамзитобетонные блоки достаточно прочны, чтобы выдерживать умеренные нагрузки.",
    //   "Простота монтажа: Кладка керамзитобетонных блоков не требует высокой квалификации и может быть выполнена самостоятельно.",
    //   "Невысокая стоимость: Керамзитобетонные блоки являются более доступным вариантом по сравнению с кирпичом и газобетоном.",
    // ],
    // cons: [
    //   "Точность размеров: Керамзитобетонные блоки могут иметь некоторые неровности и отклонения в размерах, что требует более тщательного выравнивания при кладке.",
    //   "Низкая паропроницаемость: Керамзитобетон не обладает высокой паропроницаемостью, что необходимо учитывать при утеплении и отделке стен.",
    // ],
  },
  {
    value: "Газобетон или пенобетон",
    label: "Газобетон или пенобетон",
    // pros: [
    //   "Легкость: Блоки из газобетона и пенобетона значительно легче кирпича, что снижает нагрузку на фундамент и несущие стены.",
    //   "Простота монтажа: Кладка блоков проста и не требует высокой квалификации, что позволяет ускорить процесс возведения перегородок.",
    //   "Теплоизоляция: Газобетон и пенобетон хорошо сохраняют тепло, что позволяет экономить на отоплении.",
    //   "Звукоизоляция: При достаточной толщине стены из этих материалов обеспечивают хорошую звукоизоляцию.",
    // ],
    // cons: [
    //   "Хрупкость: Блоки из газобетона и пенобетона достаточно хрупкие, требуют бережного обращения при транспортировке и монтаже.",
    //   "Требуют армирования: Для повышения прочности и предотвращения образования трещин стены из этих материалов необходимо армировать.",
    //   "Подвержены образованию трещин: Неправильная кладка, использование некачественных материалов или нарушение правил эксплуатации могут привести к появлению трещин на стенах.",
    // ],
  },
  {
    value: "Гипсокартон",
    label: "Гипсокартон",
    // pros: [
    //   "Простой и быстрый монтаж: Монтаж каркаса и обшивка его листами гипсокартона не требует специальных навыков и может быть выполнена самостоятельно.",
    //   "Легкий: Перегородки из гипсокартона не создают значительной нагрузки на перекрытия.",
    //   "Позволяет создавать сложные конструкции: С помощью гипсокартона можно создавать перегородки различных форм, с нишами, полками и другими элементами.",
    //   "Подходит для скрытия коммуникаций: Внутри каркаса перегородки из гипсокартона можно легко разместить проводку, трубы и другие коммуникации.",
    //   "Звукоизоляция: При достаточной толщине и использовании звукоизоляционных материалов обеспечивает хорошую звукоизоляцию.",
    // ],
    // cons: [
    //   "Низкая прочность: Гипсокартонные стены не выдерживают больших нагрузок, поэтому не подходят для крепления тяжелых предметов.",
    //   "Требует финишной отделки: Листы гипсокартона необходимо шпаклевать, красить или оклеивать обоями для придания эстетичного вида.",
    // ],
  },
];

export const floorMaterials: Option[] = [
  {
    value: "Инженерная доска",
    label: "Инженерная доска",
  },
  { value: "Паркетная доска", label: "Паркетная доска" },
  { value: "Ламинат", label: "Ламинат" },
  { value: "Кварцвинил", label: "Кварцвинил" },
  { value: "Керамогранит", label: "Керамогранит" },
  { value: "Натуральный камень", label: "Натуральный камень" },
];
export const ceilingMaterials: Option[] = [
  { value: "Гипсокартон", label: "Гипсокартон" },
  { value: "Натяжной потолок", label: "Натяжной потолок" },
  { value: "Без подшивки", label: "Без подшивки" },
];

export const heatingSystems = [
  "Радиаторы",
  "Конвекторы",
  "Воздушная система отопления",
  "Теплый пол водяной",
  "Теплый пол электрический",
  "ИК-радиаторы",
];

export const conditioningSystems = [
  "Сплит-система кондиционирования",
  "Канальная система кондиционирования",
  "Приточно-вытяжная система вентиляции",
  "Бризер",
  "Увлажнитель воздуха канальный",
  "Увлажнитель воздуха ультразвуковой",
  
];

export const electricSystems = [
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

export const plumbingSystems = [
  "Станция очистки воды",
  "Магистральные фильтры",
  "Фильтр обратного осмоса",
  "УФ очистка воды",
];

export const kitchenEquipment = [
  { value: "Холодильник", label: "Холодильник" },
  { value: "Духовой шкаф", label: "Духовой шкаф" },
  { value: "Варочная панель", label: "Варочная панель" },
  { value: "Посудомоечная машина", label: "Посудомоечная машина" },
  { value: "Вытяжка", label: "Вытяжка" },
  { value: "Винный шкаф", label: "Винный шкаф" },
  { value: "Морозильник", label: "Морозильник" },
  { value: "Микроволновая печь", label: "Микроволновая печь" },
  { value: "Измельчитель отходов", label: "Измельчитель отходов" },
];

export const sanitaryEquipment = [
  { value: "Унитаз", label: "Унитаз" },
  { value: "Биде", label: "Биде" },
  { value: "Гигиенический душ", label: "Гигиенический душ" },
  { value: "Умывальник", label: "Умывальник" },
  { value: "Полотенцесушитель", label: "Полотенцесушитель" },
];
