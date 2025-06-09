import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from '../../../reportsPDF/worksheet';
import BlueButton from '../../common/Buttons/blueButton';
import SectionHeader from '../../common/Sections/sectionHeader';

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
    <>
      <SectionHeader txtAlign='left' content='Admin Rosters' />
      <BlueButton
        iconIndex={3}
        size='small'
        text={isGenerating ? 'Generation...' : 'Worksheet'}
        onClick={handleOpenPdf}
        disabled={isGenerating}
      />
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
    </>
  );
};

export default Header;
