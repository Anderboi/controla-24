import { Database } from "./database.types";
import createBrowserClient from "./supabase/browser";

type Projects = Database["public"]["Tables"]["projects"]["Insert"];
type Rooms = Database["public"]["Tables"]["rooms"]["Insert"];
type Equipment = Database["public"]["Tables"]["equipment"]["Insert"];

// Function to fetch todos from Supabase
export const getProjects = async ({ userId, token }: any) => {
  const supabase = await createBrowserClient(token);
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId);

  return projects;
};

export const getCurrentProject = async ({
  projectId,
  token,
}: {
  projectId: string;
  token: any;
}): Promise<Database["public"]["Tables"]["projects"]["Row"]> => {
  const supabase = await createBrowserClient(token);

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) {
    console.log(error.message);
  }

  return project;
};
export const removeProject = async (projectId: number, token: any) => {
  const supabase = await createBrowserClient(token);

  const { data: project, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId)
    .single();

  if (error) {
    console.log(error.message);
  }
};

export const getCurrentRooms = async (
  projectId: number,
  token: any,
): Promise<Database["public"]["Tables"]["rooms"]["Row"][]> => {
  const supabase = await createBrowserClient(token);

  const { data: rooms, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("project_id", projectId);

  if (error) {
    console.log(error.message);
  }

  return rooms || [];
};
export const getCurrentProjectEquipment = async (
  roomId: number,
  token: any,
): Promise<Database["public"]["Tables"]["rooms"]["Row"][]> => {
  const supabase = await createBrowserClient(token);

  const { data: rooms, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("project_id", roomId);

  if (error) {
    console.log(error.message);
  }

  return rooms || [];
};

export const getProjectsByTitle = async ({
  title,
  token,
  userId,
}: {
  title: string;
  token: any;
  userId: any;
}) => {
  const supabase = await createBrowserClient(token);

  if (!title) {
    const { data: projects } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId);

    return projects;
  }

  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("user_id", userId)
    .or(`address.ilike.%${title}%, projectName.ilike.%${title}%`)
    // .like("address", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export const postProject = async ({
  values,
  userId,
  token,
}: {
  values: any;
  userId: any;
  token: any;
}) => {
  const supabase = await createBrowserClient(token);

  const formData: Projects = {
    user_id: userId || "",
    address: values.address,
    area: values.area,
    contractId: values.contractId,
    projectName: values.projectName,
    residing: values.adults,
    children: values.children,
    childrenAge: values.childrenAge,
    purpose: values.purpose,
    approxBudget: values.approxBudget,
    floorsNumber: values.floorsNumber,
    pets: values.pets,
    hobbies: values.hobbies,
    healthFeatures: values.healthFeatures,
    planChange: values.planChange,
    entranceDoorChange: values.entranceDoorChange,
    windowsChange: values.windowsChange,
    furnitureDemolition: values.furnitureDemolition,
    wallsMaterial: values.wallsMaterial,
    ceilingMaterial: values.ceilingMaterial,
    floorMaterial: values.floorMaterial,
    hasIsolationSurfaces: values.hasIsolationSurfaces,
    isolationMaterials: values.isolationMaterials,
    innerDoorsHeight: values.innerDoorsHeight && values.innerDoorsHeight[0],
    heatingSystem: values.heatingSystem,
    conditioningSystem: values.conditioningSystem,
    plumbingSystem: values.plumbingSystem,
    electricSystem: values.electricSystem,
  };

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert(formData)
    .select()
    .single();

  if (projectError) {
    console.error("Error posting PROJECT:", projectError.message);
    return null;
  }

  if (project) {
    const roomsData: Rooms[] = [];

    values.rooms.map(
      (room: { name: string; area: number; number: string }, index: number) => {
        roomsData.push({
          project_id: project.id,
          name: room.name,
          room_number: (index + 1).toLocaleString("ru-RU", {
            minimumIntegerDigits: 2,
          }),
          area: room.area,
          hasWarmFloor: values.warmFloorRooms?.includes(room.name),
          hasIsolation: values.roomsForIsolation?.includes(room.name),
          isolationMaterials: values.isolationMaterials,
        });
      },
    );

    const rooms = await supabase.from("rooms").upsert(roomsData).select();

    if (rooms.error) {
      console.error("Error posting ROOMS:", rooms.error.message);
      return null;
    }
    const equipmentData: Equipment[] = [];
    values.kitchenEquipment.map((equipment: string) =>
      equipmentData.push({
        project_id: project.id,
        room_id: rooms.data.find(
          (room) => room.name === "Кухня" || "Кухня-столовая",
        ).id,
        name: equipment,
        type: "kitchen",
      }),
    );
    values.sanitaryEquipment.map((equipment: string) =>
      equipmentData.push({
        room_id: rooms.data.find((room) => room.name === "Ванная комната").id,
        name: equipment,
        project_id: project.id,
        type: "sanitary",
      }),
    );

    const equipment = await supabase.from("equipment").insert(equipmentData);

    if (equipment.error) {
      console.log(equipment.error.message);
    }
  }

  return project;
};
