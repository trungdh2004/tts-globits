import { Button, InputAdornment, TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

const SideProject = (props) => {
  const {
    classes,
    setProjectAction,
    handleSearch,
    setListProject,
    listProject,
    projectAction,
    handleProjectAction,
  } = props;
  return (
    <div className={classes.boxProject}>
      <div
        style={{
          width: "100%",
          height: "64px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h6
          style={{
            fontSize: "20px",
          }}
        >
          Danh sách dự án
        </h6>
      </div>
      <Button
        variant="outlined"
        color="secondary"
        style={{
          width: "100%",
        }}
        onClick={() => setProjectAction("")}
      >
        Tất cả
      </Button>

      {/* search */}
      <div
        style={{
          paddingTop: "10px",
        }}
      >
        <InputSearch
          handleSearch={handleSearch}
          setListProject={setListProject}
        />
      </div>
      {/* list */}
      <div
        style={{
          flex: "1",
          height: "100%",
          overflowY: "auto",
          scrollbarWidth: "5px",
        }}
      >
        {listProject?.map((item) => (
          <Button
            style={{
              width: "100%",
            }}
            color={item.projectId === projectAction ? "secondary" : "default"}
            key={item.projectId}
            onClick={() => handleProjectAction(item.projectId)}
          >
            {item.project}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SideProject;

const InputSearch = ({ handleSearch }) => {
  const [value, setValue] = useState("");
  const delayValue = useDebounce(value, 300);

  useEffect(() => {
    handleSearch(delayValue);
  }, [delayValue]);

  return (
    <TextField
      id="input-with-icon-textfield"
      fullWidth
      placeholder="Tìm kiếm"
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

const useDebounce = (value, time) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), time);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, time]);

  return debouncedValue;
};
