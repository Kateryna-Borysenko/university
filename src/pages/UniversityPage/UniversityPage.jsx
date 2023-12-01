import Header from "../../components/Header/Header";
import Section from "../../components/common/Section/Section";
import UniversityBlock from "../../components/UniversityBlock/UniversityBlock";
import CitiesBlock from "../../components/CitiesBlock/CitiesBlock";
import TutorsBlock from "../../components/TutorsBlock/TutorsBlock";
import DepartmentsBlock from "../../components/DepartmentsBlock/DepartmentsBlock";
import univerInfo from "../../data/univerInfo.json";
import tutorsIcon from "../../images/tutor.png";
import citiesIcon from "../../images/pin.png";
import departmentsIcon from "../../images/book.png";

const UniversityPage = (props) => {
  const { name, description } = univerInfo;
  return (
    <>
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
    </>
  );
};

export default UniversityPage;
