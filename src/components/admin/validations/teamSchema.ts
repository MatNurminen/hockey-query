import { array, number, object, string } from "yup";
import { endYearSchema, yearSchema } from "./helpers";

const teamSchema = object({
  full_name: string()
    .required("Full name is required")
    .max(250, "More than 250 characters"),
  name: string()
    .required("Name is required")
    .max(50, "More than 50 characters"),
  short_name: string()
    .required("Short name is required")
    .max(10, "More than 10 characters"),
  start_year: yearSchema(),
  end_year: endYearSchema(),
  nation_id: number().required("Nation of team is required"),
  logos: array()
    .of(
      object().shape({
        logo: string().required("Logo is required"),
        start_year: yearSchema(),
        end_year: endYearSchema(),
      }),
    )
    .required("At least one logo is required"),
});

export default teamSchema;
