import SectionHeader from "../../../common/Sections/sectionHeader";
import { TTournamentDto } from "../../../../api/tournaments/types";
import Stack from "@mui/material/Stack";
import AppButton from "../../../common/Buttons/appButton";
import { memo } from "react";

interface Props {
  tournament: TTournamentDto;
  leagueId?: number;
}

const Header = ({ tournament, leagueId }: Props) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        my: 4,
      }}
    >
      <SectionHeader
        txtAlign="left"
        content={`Tournament: ${tournament.league.name} ${tournament.season_id}`}
      />
      <AppButton
        text="back to tournaments page"
        size="small"
        color="success"
        to={leagueId ? `/tournaments?league=${leagueId}` : "/tournaments"}
      />
    </Stack>
  );
};

export default memo(Header);
