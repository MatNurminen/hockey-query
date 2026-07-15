import { memo } from 'react';
import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';

interface Props {
  title: string
}

const HeaderTable = ({ title }: Props) => {
  return (
    <>
      <HeaderMain cells={[{text: title}, {text: ''}, {text: ''}, {text: ''}]} />
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
