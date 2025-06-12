import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from '../../../reportsPDF/worksheet';
import BlueButton from '../../common/Buttons/blueButton';
import SectionHeader from '../../common/Sections/sectionHeader';
import Stack from '@mui/material/Stack';

interface DownloadLinkProps {
  loading: boolean;
  url: string | null;
}

const Header = ({ players }: any) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleOpenPdf = () => {
    setIsGenerating(true);
  };

  return (
    <Stack
      my={2}
      direction='row'
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <SectionHeader txtAlign='left' content='Admin Rosters' />
      <Stack
        direction='row'
        spacing={2}
        sx={{
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <BlueButton
          iconIndex={3}
          size='small'
          text={isGenerating ? 'Generation...' : 'Worksheet'}
          onClick={handleOpenPdf}
          disabled={isGenerating}
        />
        {Array.isArray(players) &&
          players.length > 0 &&
          players[0].type_id === 2 && (
            <BlueButton
              iconIndex={3}
              size='small'
              text={isGenerating ? 'Generation...' : 'Roster'}
              onClick={handleOpenPdf}
              disabled={isGenerating}
            />
          )}
      </Stack>
      {isGenerating && (
        <PDFDownloadLink
          document={<PDFDocument players={players} />}
          fileName='example.pdf'
          style={{ display: 'none' }}
        >
          {({ url, loading }: DownloadLinkProps) => {
            if (!loading && url) {
              window.open(url, '_blank');
              setIsGenerating(false);
            }
            return null;
          }}
        </PDFDownloadLink>
      )}
    </Stack>
  );
};

export default Header;
