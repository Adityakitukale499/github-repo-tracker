import React, { useEffect, useState } from "react";
import moment from "moment";

import {
  Avatar,
  Box,
  Card,
  Typography,
  Link,
  Chip,
  Container,
  IconButton,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ChartData from "./ChartData";

const RepositoryCard = ({
  index,
  isOpen,
  setSelectCard,
  avatar,
  name,
  html_url,
  owner,
  description,
  starCount,
  open_issues_count,
  created_at,
}) => {
  const handleOpen = () => {
    if (isOpen) setSelectCard(null);
    else setSelectCard(index);
  };

  return (
    <Container sx={{ my: 4, width: { lg: "60%" } }}>
      <Card
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          borderBottomLeftRadius: isOpen ? "0px" : "20px",
          borderBottomRightRadius: isOpen ? "0px" : "20px",
          boxShadow: 5,
        }}
        onClick={handleOpen}
      >
        <Avatar src={avatar} sx={{ width: 170, height: 170 }} />
        <Box sx={{ ml: 3, flex: 1, p: 1, gap: 1, textAlign: "start" }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            <Link href={html_url} target="_blank" rel="noopener noreferrer">
              {name}
            </Link>
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Chip
            label={` Stars: ${starCount} `}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Chip
            label={` Issues: ${open_issues_count} `}
            variant="outlined"
            sx={{ mb: 2, ml: 1 }}
          />
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Last pushed {moment(created_at).fromNow()} By {owner}
          </Typography>
        </Box>
        <IconButton size="small">
          {!isOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
        </IconButton>
      </Card>
      {isOpen && <ChartData name={name} owner={owner} />}
    </Container>
  );
};

export default RepositoryCard;
