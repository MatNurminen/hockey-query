import { useState } from "react";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { TAwardDto } from "../../../../api/awards/types";

interface Props {
  awards: TAwardDto[];
}

const Postseason = ({ awards }: Props) => {
  const [expanded, setExpanded] = useState(false);

  if (!awards?.length) return null;

  const hasMany = awards.length > 1;
  const visibleAwards = expanded || !hasMany ? awards : awards.slice(0, 1);

  return (
    <Box>
      {visibleAwards.map((award, index) => {
        const isFirstCollapsed = !expanded && hasMany && index === 0;
        const isLastExpanded =
          expanded && hasMany && index === visibleAwards.length - 1;

        return (
          <Box
            key={award.id ?? index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: isFirstCollapsed ? "pointer" : "default",
            }}
            onClick={() => {
              if (isFirstCollapsed) setExpanded(true);
            }}
          >
            <div>{award.name}</div>
            {isFirstCollapsed && (
              <Badge
                badgeContent={"+ " + (awards.length - 1)}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    position: "static",
                    transform: "none",
                  },
                }}
              >
                <span style={{ display: "none" }} />
              </Badge>
            )}
            {isLastExpanded && (
              <IconButton
                size="small"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
                sx={{ padding: 0 }}
              >
                <OpenInFullIcon
                  fontSize="small"
                  sx={{ transform: "rotate(180deg)" }}
                />
              </IconButton>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default Postseason;
