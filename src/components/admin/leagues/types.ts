import type { FormikErrors, FormikTouched } from "formik";

export interface FormLogo {
  id?: number;
  start_year: number | null;
  end_year: number | null;
  logo: string;
  league_id?: number;
}

export interface FormValues {
  name: string;
  short_name: string;
  start_year: number;
  end_year: number | null;
  color: string | null;
  type_id: number;
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
