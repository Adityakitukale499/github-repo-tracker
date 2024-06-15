import React, { useState } from "react";
import RepositoryCard from "./RepositoryCard";
import { Box } from "@mui/material";

const List = ({ data }) => {
  const [selectCard, setSelectCard] = useState();
  return (
    <>
      {data.map((item, index) => {
        return (
          <Box key={Math.random()}>
            <RepositoryCard
              index={index}
              isOpen={selectCard == index}
              setSelectCard={setSelectCard}
              avatar={item.owner.avatar_url}
              owner={item.owner.login}
              name={item.name}
              html_url={item.html_url}
              description={item.description}
              starCount={item.stargazers_count}
              open_issues_count={item.open_issues_count}
              created_at={item.created_at}
            />
          </Box>
        );
      })}
    </>
  );
};

export default List;
