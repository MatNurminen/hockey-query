import { number } from "yup";

const currentYear = new Date().getFullYear();

export const yearSchema = (label = "Year") =>
  number()
    .required(`${label} is required`)
    .min(1900, `The ${label} can't be less than 1900`)
    .max(currentYear, `The ${label} can't be greater than ${currentYear}`);

export const endYearSchema = () =>
  number()
    .nullable()
    .min(1900, `The end year can't be less than 1900`)
    .max(currentYear, `The end year can't be greater than ${currentYear}`)
    .test(
      "end-after-start",
      "End year must be after start year",
      function (value) {
        const { start_year } = this.parent;
        if (!value || !start_year) return true;
        return value >= start_year;
      },
    );
