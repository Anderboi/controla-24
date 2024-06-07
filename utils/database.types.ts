export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          created_at: string
          email: string | null
          firstname: string
          id: number
          lastname: string
          middlename: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          firstname?: string
          id?: number
          lastname?: string
          middlename?: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          firstname?: string
          id?: number
          lastname?: string
          middlename?: string
          phone?: string | null
        }
        Relationships: []
      }
      equipment: {
        Row: {
          created_at: string
          id: number
          name: string | null
          project_id: number | null
          room_id: number | null
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          project_id?: number | null
          room_id?: number | null
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          project_id?: number | null
          room_id?: number | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "equipment_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          address: string
          approxBudget: number[] | null
          area: number | null
          ceilingMaterial: string[]
          children: number
          childrenAge: string | null
          client: number | null
          conditioningSystem: string[] | null
          contractId: string | null
          created_at: string
          electricSystem: string[] | null
          entranceDoorChange: boolean
          floorMaterial: string[]
          floorsNumber: number
          furnitureDemolition: boolean
          hasIsolationSurfaces: boolean
          healthFeatures: string | null
          heatingSystem: string[]
          hobbies: string | null
          id: number
          innerDoorsHeight: number | null
          isolationMaterials: string
          pets: string | null
          planChange: boolean
          plumbingSystem: string[] | null
          projectName: string | null
          purpose: string
          residing: number | null
          user_id: string
          wallsMaterial: string[]
          windowsChange: boolean
        }
        Insert: {
          address: string
          approxBudget?: number[] | null
          area?: number | null
          ceilingMaterial?: string[]
          children?: number
          childrenAge?: string | null
          client?: number | null
          conditioningSystem?: string[] | null
          contractId?: string | null
          created_at?: string
          electricSystem?: string[] | null
          entranceDoorChange?: boolean
          floorMaterial?: string[]
          floorsNumber?: number
          furnitureDemolition?: boolean
          hasIsolationSurfaces?: boolean
          healthFeatures?: string | null
          heatingSystem?: string[]
          hobbies?: string | null
          id?: number
          innerDoorsHeight?: number | null
          isolationMaterials?: string
          pets?: string | null
          planChange?: boolean
          plumbingSystem?: string[] | null
          projectName?: string | null
          purpose?: string
          residing?: number | null
          user_id?: string
          wallsMaterial?: string[]
          windowsChange?: boolean
        }
        Update: {
          address?: string
          approxBudget?: number[] | null
          area?: number | null
          ceilingMaterial?: string[]
          children?: number
          childrenAge?: string | null
          client?: number | null
          conditioningSystem?: string[] | null
          contractId?: string | null
          created_at?: string
          electricSystem?: string[] | null
          entranceDoorChange?: boolean
          floorMaterial?: string[]
          floorsNumber?: number
          furnitureDemolition?: boolean
          hasIsolationSurfaces?: boolean
          healthFeatures?: string | null
          heatingSystem?: string[]
          hobbies?: string | null
          id?: number
          innerDoorsHeight?: number | null
          isolationMaterials?: string
          pets?: string | null
          planChange?: boolean
          plumbingSystem?: string[] | null
          projectName?: string | null
          purpose?: string
          residing?: number | null
          user_id?: string
          wallsMaterial?: string[]
          windowsChange?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_fkey"
            columns: ["client"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          area: number | null
          created_at: string
          hasIsolation: boolean
          hasWarmFloor: boolean
          id: number
          isolationMaterials: string | null
          name: string
          project_id: number
          room_number: string
        }
        Insert: {
          area?: number | null
          created_at?: string
          hasIsolation?: boolean
          hasWarmFloor?: boolean
          id?: number
          isolationMaterials?: string | null
          name?: string
          project_id: number
          room_number?: string
        }
        Update: {
          area?: number | null
          created_at?: string
          hasIsolation?: boolean
          hasWarmFloor?: boolean
          id?: number
          isolationMaterials?: string | null
          name?: string
          project_id?: number
          room_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
