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
      .min(2, "В имени должно быть минимум 2 буквы")
      .max(15, "В имени должно быть максимум 15 букв")
      .required("Обязательное поле"),
    lastName: yup
      .string()
      .min(2, "В фамилии должно быть минимум 2 буквы")
      .max(20, "В фамилии должно быть максимум 20 букв")
      .required("Обязательное поле"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Неверный номер телефона")
      .required("Обязательное поле"),
    email: yup
      .string()
      .email("Неверный email")
      .required("Обязательное поле")
      .test(
        "unique-email",
        "Этот email уже используется",
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
    city: yup.string().required("Обязательное поле"),
    gender: yup.string().nullable().required("Обязательное поле"),
  })
  .required();
