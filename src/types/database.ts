/**
 * Tipos de la base de datos.
 * Escritos a mano para reflejar las migraciones de /supabase/migrations.
 * Regenerar contra la BD real con:  pnpm db:types
 */

export type UserRole = "alumno" | "profesor" | "admin";
export type LeadEstado =
  | "nuevo"
  | "contactado"
  | "prueba_agendada"
  | "convertido"
  | "descartado";
export type InscripcionEstado = "activa" | "pausada" | "baja";
export type PlanTipo = "1_modalidad" | "2_modalidades";
export type ContenidoTipo = "video" | "comentario" | "fiesta" | "evento";
export type EventoTipo = "fiesta" | "masterclass" | "social" | "otro";

type Timestamps = { created_at: string; updated_at: string };

export type Modalidad = {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string | null;
  orden: number;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export type Nivel = {
  id: string;
  nombre: string;
  orden: number;
}

export type Profile = {
  id: string;
  role: UserRole;
  nombre: string | null;
  telefono: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type Lead = {
  id: string;
  nombre: string;
  telefono: string;
  email: string | null;
  modalidad_interes: string | null;
  origen: string;
  mensaje: string | null;
  estado: LeadEstado;
  created_at: string;
}

export type Evento = {
  id: string;
  titulo: string;
  descripcion: string | null;
  fecha: string;
  tipo: EventoTipo;
  publico: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Forma mínima que esperan los clientes `@supabase/ssr`.
 * Solo se tipan a fondo las tablas que la web pública/scaffold consultan;
 * el resto quedan permisivas hasta generar los tipos contra la BD real.
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      modalidades: {
        Row: Modalidad;
        Insert: Omit<Modalidad, "id" | keyof Timestamps> & Partial<Modalidad>;
        Update: Partial<Modalidad>;
        Relationships: [];
      };
      niveles: {
        Row: Nivel;
        Insert: Omit<Nivel, "id"> & Partial<Nivel>;
        Update: Partial<Nivel>;
        Relationships: [];
      };
      leads: {
        Row: Lead;
        Insert: Omit<Lead, "id" | "estado" | "created_at"> & Partial<Lead>;
        Update: Partial<Lead>;
        Relationships: [];
      };
      eventos: {
        Row: Evento;
        Insert: Omit<Evento, "id" | keyof Timestamps> & Partial<Evento>;
        Update: Partial<Evento>;
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    CompositeTypes: Record<never, never>;
    Enums: {
      user_role: UserRole;
      lead_estado: LeadEstado;
      inscripcion_estado: InscripcionEstado;
      plan_tipo: PlanTipo;
      contenido_tipo: ContenidoTipo;
      evento_tipo: EventoTipo;
    };
  };
}
