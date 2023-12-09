import * as yup from "yup";
import * as api from "../../../services/api";
const API_ENDPOINT = "tutors";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const checkEmailExists = async (email) => {
  try {
    const tutorsData = await api.getData(API_ENDPOINT);
    return tutorsData.some((tutor) => tutor.email === email);
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
};

export const validationSchema = yup
  .object({
    firstName: yup
      .string()
      .min(2, "tutorForm.validationSchema.firstNameMin")
      .max(15, "tutorForm.validationSchema.firstNameMax")
      .required("tutorForm.validationSchema.required"),
    lastName: yup
      .string()
      .min(2, "tutorForm.validationSchema.lastNameMin")
      .max(20, "tutorForm.validationSchema.lastNameMax")
      .required("tutorForm.validationSchema.required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "tutorForm.validationSchema.phone")
      .required("tutorForm.validationSchema.required"),
    email: yup
      .string()
      .email("tutorForm.validationSchema.email")
      .required("tutorForm.validationSchema.required")
      .test(
        "unique-email",
        "tutorForm.validationSchema.unique-email",
        async function (value) {
          try {
            const isEmailExists = await checkEmailExists(value);
            return !isEmailExists;
          } catch (error) {
            console.error("Error checking email existence:", error);
            return true;
          }
        },
      ),
    city: yup.string().required("tutorForm.validationSchema.required"),
    gender: yup
      .string()
      .nullable()
      .required("tutorForm.validationSchema.required"),
  })
  .required();
