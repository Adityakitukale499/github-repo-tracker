import { Card } from "@mui/material";
import ContributerChart from "./ContributerChart";
import TotalChangesChart from "./TotalChangesChart";

const ChartData = ({ owner, name }) => {
  return (
    <Card
      sx={{
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        boxShadow: 3,
      }}
    >
      <TotalChangesChart owner={owner} name={name} />
      <ContributerChart owner={owner} name={name} />
    </Card>
  );
};

export default ChartData;
