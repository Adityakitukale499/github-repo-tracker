import { Box, CircularProgress } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContributorsRequest } from "../redux/actions";

const ContributerChart = ({ owner, name }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.contributors);

  useEffect(() => {
    dispatch(fetchContributorsRequest(owner, name));
  }, [dispatch, owner, name]);

  const options = {
    title: {
      text: "Contributor Changes",
    },
    xAxis: {
      categories:
        data[0]?.weeks?.map((item) =>
          new Date(item?.w * 1000).toLocaleDateString(),
        ) || [],
    },
    series: data?.map((item, index) => ({
      data: item.weeks.map((it) => it.c + it.a + it.d),
      name: `contributor ${index + 1}`,
    })),
  };

  return (
    <Box sx={{ mt: 1 }}>
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

export default ContributerChart;
