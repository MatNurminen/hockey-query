import { number, object, string } from "yup";

const awardSchema = object({
  league_id: number().required("League_id of award is required"),
  name: string()
    .required("Name of award is required")
    .max(50, "More than 50 characters"),
});

export default awardSchema;
