import SectionHeader from '../../../common/Sections/sectionHeader';

const Header = ({ tournament }: any) => {
  return (
    <SectionHeader
      txtAlign='left'
      content={`Tournament: ${tournament.league.name} ${tournament.season_id}`}
    />
  );
};

export default Header;
