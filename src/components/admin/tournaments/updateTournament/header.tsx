import SectionHeader from "../../../common/Sections/sectionHeader";
import { TTournamentDto } from "../../../../api/tournaments/types";

interface Props {
  tournament: TTournamentDto;
}

const Header = ({ tournament }: Props) => {
  return (
    <SectionHeader
      txtAlign="left"
      content={`Tournament: ${tournament.league.name} ${tournament.season_id}`}
    />
  );
};

export default Header;
