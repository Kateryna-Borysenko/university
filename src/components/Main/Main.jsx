import { useContext } from "react";
import Header from "../Header/Header";
import UniversityBlock from "../UniversityBlock/UniversityBlock";
import CitiesBlock from "../CitiesBlock/CitiesBlock";
import TutorsBlock from "../TutorsBlock/TutorsBlock";
import DepartmentsBlock from "../DepartmentsBlock/DepartmentsBlock";
import univerInfo from "../../data/univerInfo.json";
import tutorsIcon from "../../images/tutor.png";
import citiesIcon from "../../images/pin.png";
import departmentsIcon from "../../images/book.png";
import Section from "../common/Section/Section";
import { ThemeContext, themes } from "../../context/themeContext";
import s from "./Main.module.css";

const { name, description } = univerInfo;

const Main = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <main className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <Header title="Информация о университете" />
      <UniversityBlock name={name} description={description} />
      <Section icon={tutorsIcon} title="Преподаватели">
        <TutorsBlock />
      </Section>
      {/* <Section icon={citiesIcon} title="Города">
        <CitiesBlock />
      </Section> */}
      <Section icon={departmentsIcon} title="Факультеты">
        <DepartmentsBlock />
      </Section>
    </main>
  );
};

export default Main;
