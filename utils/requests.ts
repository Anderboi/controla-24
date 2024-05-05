import { createBrowserClient } from "./supabase/browser";

// Function to fetch todos from Supabase
export const getProjects = async ({ userId, token }: any) => {
  const supabase = createBrowserClient(token);
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId);

  return projects;
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
  const supabase = createBrowserClient(token);

  if (!title) {
    const projects = await getProjects({ userId, token });
    return projects;
  }

  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("user_id", userId)
    .ilike("address", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export const postProject = async ({ formData, userId, token }: any) => {
  const supabase = createBrowserClient(token);
  const { data, error } = await supabase
    .from("projects")
    .insert(formData)
    .select();

  if (error) {
    console.error("Error posting todo:", error.message);
    return null;
  }

  return data;
};
