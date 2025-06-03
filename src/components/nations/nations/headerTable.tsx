import HeaderSection from '../../common/Table/headerSection';

const HeaderTable = () => {
  return (
    <>
      <HeaderSection
        cells={[
          { align: 'center', text: 'Flag' },
          { text: 'Name' },
          { text: 'Short Name' },
          { text: '' },
        ]}
      />
    </>
  );
};

export default HeaderTable;
