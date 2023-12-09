import { useTranslation } from "react-i18next";
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

const UniversityPage = () => {
  const { name, description } = univerInfo;
  const { t } = useTranslation();
  return (
    <>
      <Header title={t("university.info")} />
      <UniversityBlock name={name} description={t(description)} />
      <Section icon={tutorsIcon} title={t("tutors.tutors")}>
        <TutorsBlock />
      </Section>
      <Section icon={citiesIcon} title={t("cities.cities")}>
        <CitiesBlock />
      </Section>
      <Section icon={departmentsIcon} title={t("departments.departments")}>
        <DepartmentsBlock />
      </Section>
    </>
  );
};

export default UniversityPage;
