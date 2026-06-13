import type { FormikErrors, FormikTouched } from "formik";

export interface FormLogo {
  id?: number | null;
  start_year: number | null;
  end_year: number | null;
  logo: string;
  team_id?: number;
}

export interface FormValues {
  full_name: string;
  name: string;
  short_name: string;
  start_year: number;
  end_year: number | null;
  nation_id: number;
  logos: FormLogo[];
}

interface FormikLogoError {
  start_year?: string;
  end_year?: string;
  logo?: string;
}

interface FormikLogoTouched {
  start_year?: boolean;
  end_year?: boolean;
  logo?: boolean;
}

export type FormikErrorsWithLogos = Omit<FormikErrors<FormValues>, "logos"> & {
  logos?: FormikLogoError[];
};

export type FormikTouchedWithLogos = Omit<
  FormikTouched<FormValues>,
  "logos"
> & {
  logos?: FormikLogoTouched[];
};
