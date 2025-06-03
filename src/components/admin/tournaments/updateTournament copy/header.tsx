import SectionHeader from '../../../common/Sections/sectionHeader';

const Header = ({ tournament }: any) => {
  return (
    <SectionHeader
      txtAlign='left'
      content={`Tournament: ${tournament.league_name} ${tournament.season_name}`}
    />
  );
};

export default Header;
