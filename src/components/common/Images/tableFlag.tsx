interface TableFlagProps {
  src: string;
  alt: string;
}

const TableFlag = ({ src, alt }: TableFlagProps) => {
  return <img height={20} alt={alt} src={src} />;
};
export default TableFlag;
