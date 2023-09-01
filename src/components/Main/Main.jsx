import Section from "../common/Section/Section";
import Header from "../Header/Header";
import UniversityBlock from "../UniversityBlock/UniversityBlock";
import CitiesBlock from "../CitiesBlock/CitiesBlock";
import TutorsBlock from "../TutorsBlock/TutorsBlock";
import DepartmentsBlock from "../DepartmentsBlock/DepartmentsBlock";
import univerInfo from "../../data/univerInfo.json";
import tutorsIcon from "../../images/tutor.png";
import citiesIcon from "../../images/pin.png";
import departmentsIcon from "../../images/book.png";

const { name, description, tutors, cities, departments } = univerInfo;

const Main = () => {
  return (
    <main>
      <Header title="Информация о университете" />

      <UniversityBlock name={name} description={description} />

      <Section icon={tutorsIcon} title="Преподаватели">
        <TutorsBlock tutors={tutors} />
      </Section>

      <Section icon={citiesIcon} title="Города">
        <CitiesBlock cities={cities} />
      </Section>

      <Section icon={departmentsIcon} title="Факультеты">
        <DepartmentsBlock departments={departments} />
      </Section>
    </main>
  );
};

export default Main;
