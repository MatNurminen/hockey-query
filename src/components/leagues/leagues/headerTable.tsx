import { memo } from 'react';
import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';

const HeaderTable = ({ title }: any) => {
  return (
    <>
      <HeaderMain cells={[title, '', '', '']} />
      <HeaderSection
        cells={[
          { align: 'center', text: 'Logo' },
          { text: 'Name' },
          { text: 'Short Name' },
          { text: '' },
        ]}
      />
    </>
  );
};

export default memo(HeaderTable);
