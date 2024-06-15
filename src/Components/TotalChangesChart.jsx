import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalChangesRequest, setSelectedValue } from "../redux/actions";

const TotalChangesChart = ({ owner, name }) => {
  const dispatch = useDispatch();
  const { data, selectedValue, error, loading } = useSelector(
    (state) => state.totalChanges,
  );

  useEffect(() => {
    dispatch(fetchTotalChangesRequest(owner, name, selectedValue));
  }, [dispatch, owner, name, selectedValue]);

  const fetchValues = (item) => {
    const obj = {
      commit: item?.total,
      addition: item?.[1],
      deletion: Math.abs(item?.[2]),
    };
    return obj[selectedValue];
  };

  const options = {
    title: {
      text: "Total Changes",
    },
    xAxis: {
      categories: data?.map((item) =>
        new Date((item.week || item?.[0]) * 1000).toLocaleDateString(),
      ),
    },
    series: [
      {
        data: data?.map((item) => fetchValues(item)),
        name: "weeks",
      },
    ],
  };

  const handleChange = (e) => {
    dispatch(setSelectedValue(e.target.value));
  };

  return (
    <Box>
      <div style={{ margin: "10px", textAlign: "end" }}>
        <FormControl
          variant="outlined"
          style={{ minWidth: 100, marginRight: "0px" }}
        >
          <InputLabel>Select an option</InputLabel>
          <Select
            value={selectedValue}
            onChange={handleChange}
            label="Select an option"
          >
            <MenuItem value="commit">Commits</MenuItem>
            <MenuItem value="addition">Additions</MenuItem>
            <MenuItem value="deletion">Deletions</MenuItem>
          </Select>
        </FormControl>
      </div>
      {error ? (
        <div>{error}</div>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
      {loading && (
        <Box sx={{ p: 2, my: 1 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default TotalChangesChart;
