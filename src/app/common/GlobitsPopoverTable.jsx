import React, { useEffect, useState } from "react";
import { Popover, Button, makeStyles } from "@material-ui/core";
import GlobitsTable from "./GlobitsTable";

const useStyles = makeStyles((theme) => ({
  globitsTableWraper: {
    maxHeight: "600px",
    overflowY: "auto",
    overflowX: "hidden",
  },
  body: {
    padding: "8px",
    backgroundColor: "white",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "10px",
  },
}));

const GlobitsPopoverTable = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {
    data,
    columns,
    handleSelectList,
    totalPages,
    handleChangePage,
    setPageSize,
    pageSize,
    pageSizeOption,
    totalElements,
    page,
    nameButton,
    title,
    select,
    setSelect,
    handleSubmit,
  } = props;

  // click close popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelect(null);
  };

  // todo
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClick}
        style={{
          color: "white",
        }}
      >
        {nameButton || "Open"}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            display: "flex",
            flexDirection: "column",
            maxHeight: "500px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "40px",
              backgroundColor: "orange",
              padding: "10px",
              color: "white",
            }}
          >
            {title || "Header"}
          </div>

          <div className={classes.body}>
            <div
              style={{
                width: "100%",
                height: "100%",
                flex: "1",
                backgroundColor: "white",
              }}
            >
              <GlobitsTable
                data={data}
                columns={columns}
                handleSelectList={handleSelectList}
                selection={false}
                totalPages={totalPages}
                handleChangePage={handleChangePage}
                setRowsPerPage={setPageSize}
                pageSize={pageSize}
                pageSizeOption={pageSizeOption}
                totalElements={totalElements}
                page={page}
                maxHeight="350"
                isPagesizeSelect
                title=" "
              />
            </div>

            <div className={classes.footer}>
              <Button
                variant="outline"
                color="primary"
                onClick={() => {
                  handleClose();
                }}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={!select}
                onClick={() => {
                  handleClose();
                  handleSubmit();
                }}
              >
                Lựa chọn
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default GlobitsPopoverTable;
