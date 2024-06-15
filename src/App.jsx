import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, CircularProgress, Box } from "@mui/material";
import List from "./Components/List";
import "./styles.css";
import { fetchReposRequest } from "./redux/actions";

export default function App() {
  const { data, loading, error, page } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReposRequest(page));
  }, [dispatch, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        data.length > 0 &&
        !loading
      ) {
        dispatch(fetchReposRequest(page + 1));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, data, loading, page]);

  return (
    <div className="App">
      <Typography
        variant="h3"
        color="black"
        sx={{
          py: 2,
          fontWeight: 700,
          textDecoration: "underline",
          color: "#eee",
        }}
      >
        Most Starred Repos
      </Typography>
      {error ? (
        <div>{error}</div>
      ) : (
        <Box sx={{ mb: 5 }}>
          <List data={data} />
          {loading && (
            <Box sx={{ p: 2, my: 1 }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      )}
    </div>
  );
}
