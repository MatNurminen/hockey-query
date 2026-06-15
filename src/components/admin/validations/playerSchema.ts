import { number, object, string } from "yup";
import { endYearSchema, yearSchema } from "./helpers";

const playerSchema = object({
  first_name: string()
    .required("First name is required")
    .max(40, "More than 40 characters"),
  last_name: string()
    .required("Last name is required")
    .max(40, "More than 40 characters"),
  jersey_number: number().required("Jersey number is required"),
  player_position: string()
    .required("Player position is required")
    .max(3, "More than 3 characters"),
  player_order: number().required("Player order is required"),
  nation_id: number().required("Nation is required"),
  birth_year: number().required("Birth year is required"),
  height: number().notRequired(),
  weight: number().notRequired(),
  draft_team_id: number().notRequired(),
  start_year: yearSchema(),
  end_year: endYearSchema(),
});

export default playerSchema;
