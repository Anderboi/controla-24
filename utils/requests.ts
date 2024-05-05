import { Database } from "./database.types";
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
