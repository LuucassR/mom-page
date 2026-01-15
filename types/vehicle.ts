export interface Brand {
  make_slug: string;
  make_display: string;
}

export interface Model {
  model_slug: string;
  model_name: string;
}

export interface Trim {
  model_id: string;
  model_trim: string | null;
  model_engine_power_ps: string | null;
}
