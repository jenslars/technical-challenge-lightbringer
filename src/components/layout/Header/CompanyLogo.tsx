import Logotype from "@/assets/icons/Logotype.svg";

const CompanyLogo = ({ fill = "#000" }) => (
  <div className="flex items-center gap-2">
    <Logotype 
      width={140} 
      height={45} 
      fill={fill}
    />
  </div>
);

export default CompanyLogo;