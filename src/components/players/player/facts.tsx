import { memo, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import HeaderMain from "../../common/Table/headerMain";
import Box from "@mui/material/Box";
import TableFlag from "../../common/Images/tableFlag";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { TPlayerDto } from "../../../api/players/types";
import SectionChapter from "../../common/Sections/sectionChapter";

const Facts = ({ player }: { player: TPlayerDto }) => {
  const items = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return [
      {
        label: "Nation",
        value: player.nation.name,
        link: `/nations/${player.nation_id}`,
        flag: player.nation.flag,
      },
      { label: "Position", value: player.player_position },
      { label: "Year of Birth", value: player.birth_year },
      { label: "Age", value: currentYear - player.birth_year },
      { label: "Height", value: player.height },
      { label: "Weight", value: player.weight },
      {
        label: "Draft",
        value:
          player.draft_team_id && player.team ? player.team.full_name : null,
        link: player.draft_team_id
          ? `/drafts/dets/?team=${player.draft_team_id}`
          : undefined,
        flag: player.team?.logos[0]?.logo,
      },
      { label: "Retires", value: player.end_year ?? "-" },
    ];
  }, [player]);

  return (
    <>
      <SectionChapter
        txtAlign={"left"}
        content={`${player.first_name} ${player.last_name} Facts`}
      />
      <TableContainer>
        <Table size="small">
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.label}>
                <TableCell>{item.label}</TableCell>
                <TableCell>
                  {item.link ? (
                    <Box display="flex" alignItems="center">
                      {item.flag && <TableFlag alt="flag" src={item.flag} />}
                      <Link
                        underline="hover"
                        component={RouterLink}
                        to={item.link}
                        sx={{ ml: item.flag ? 1 : 0 }}
                      >
                        {item.value}
                      </Link>
                    </Box>
                  ) : (
                    item.value
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default memo(Facts);
