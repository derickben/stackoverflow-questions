import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

export default function FlexLayoutGrid({ questions = [] }) {
  useEffect(() => {
    console.log({ questions });
  }, [questions.length]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            sx={{
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
              border: 3,
              color: "white",
              fontSize: "1.1rem",
            }}
            rowHeight={100}
            autoHeight
            columns={[
              {
                field: "Avatar",
                width: 80,
                renderCell: (params) => {
                  return (
                    <>
                      <Avatar src={params.value.avatar} />
                    </>
                  );
                },
              },
              { field: "Username", width: 200 },
              { field: "Title", width: 350 },
              { field: "Link", width: 350 },
              { field: "Answers", headerName: "No of Answers", width: 130 },
            ]}
            rows={questions.map((item) => {
              return {
                id: item["question_id"],
                Avatar: {
                  avatar: item["owner"]["profile_image"],
                },
                Username: item["owner"]["display_name"],
                Title: item["title"],
                Link: item["link"],
                Answers: item["answer_count"],
              };
            })}
          />
        </div>
      </div>
    </div>
  );
}
