import Header from "../Header/Header";
import UniversityBlock from "../UniversityBlock/UniversityBlock";
import TutorsBlock from "../TutorsBlock/TutorsBlock";
import univerInfo from "../../data/univerInfo.json";

const { name, description, tutors } = univerInfo;

const Main = () => {
  return (
    <main>
      Main
      <Header title="Информация о университете" />
      <UniversityBlock name={name} description={description} />
      <TutorsBlock tutors={tutors} />
    </main>
  );
};

export default Main;
