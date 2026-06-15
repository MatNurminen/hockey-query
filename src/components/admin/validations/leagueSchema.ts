import { array, number, object, string } from "yup";
import { endYearSchema, yearSchema } from "./helpers";

const leagueSchema = object({
  name: string()
    .required("Name is required")
    .max(50, "More than 50 characters"),
  short_name: string()
    .required("Short name is required")
    .max(12, "More than 12 characters"),
  color: string().notRequired().max(7, "More than 7 characters"),
  start_year: yearSchema(),
  end_year: endYearSchema(),
  type_id: number().required("Type of league is required"),
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

export default leagueSchema;
