import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import PDFDocument from "../../../reportsPDF/worksheet";
import BlueButton from "../../common/Buttons/blueButton";
import SectionHeader from "../../common/Sections/sectionHeader";
import Stack from "@mui/material/Stack";
import { TPlayerStatDetail } from "../../../api/players-stats/types";

interface Props {
  players: TPlayerStatDetail[];
}

const Header = ({ players }: Props) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleOpenPdf = async () => {
    if (!players.length) return;
    setIsGenerating(true);
    try {
      const blob = await pdf(<PDFDocument players={players} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (e) {
      console.error("Failed to generate PDF:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  const isBusy = isGenerating || !players.length;

  return (
    <Stack
      my={2}
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SectionHeader txtAlign="left" content="Admin Rosters" />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <BlueButton
          iconIndex={3}
          size="small"
          text={isBusy ? "Generation..." : "Worksheet"}
          onClick={handleOpenPdf}
          disabled={isBusy}
        />
        {Array.isArray(players) &&
          players.length > 0 &&
          players[0].type_id === 2 && (
            <BlueButton
              iconIndex={3}
              size="small"
              text={isBusy ? "Generation..." : "Roster"}
              onClick={handleOpenPdf}
              disabled={isBusy}
            />
          )}
      </Stack>
    </Stack>
  );
};

export default Header;
