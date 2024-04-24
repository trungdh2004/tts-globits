import React, { useEffect, useState } from "react";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import GlobitsPopoverTable from "app/common/GlobitsPopoverTable";

import { Link } from "react-router-dom";
import { useStore } from "app/stores";
import { format } from "date-fns";
import { observer } from "mobx-react";
import { createProject } from "./ProjectService";
import { toast } from "react-toastify";

const ProjectAdd = observer(({ history }) => {
  const { staffStore, projectStore } = useStore();
  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      description: "",
      projectSfaff: [
        {
          id: "",
        },
      ],
      listStaffName: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Bạn chưa nhập tên!"),
      code: Yup.string().required("Bạn chưa nhập mã!!"),
      description: Yup.string().required("Bạn chưa nhập mô tả!!"),
      projectStaff: Yup.array().of(
        Yup.object({
          id: Yup.string().required(""),
        })
      ),
      listStaffName: Yup.string().required("Mời bạn chọn nhân viên"),
    }),
    onSubmit: async (values) => {
      projectStore.handleAddProject(values, history);
    },
  });

  useEffect(() => {
    if (!staffStore.staffList.lenth) {
      staffStore.handleStaffInitial();
    }
  }, []);

  const columns = [
    {
      field: "displayName",
      title: "Tên",
      cellStyle: {
        padding: "0 10px",
      },
      headerStyle: {
        padding: "0 10px",
      },
    },
    {
      field: "birthPlace",
      title: "Nơi sinh",
    },

    {
      field: "department",
      title: "Phòng ban",
      render: (rowData) => {
        return <span>{rowData.department?.name}</span>;
      },
    },
  ];

  const handleSubmit = () => {};

  const handleSelectList = (value) => {
    console.log("list:", value);
    formik.setFieldValue(
      "projectStaff",
      value.map((item) => ({
        id: item.id,
      }))
    );
    formik.setFieldValue(
      "listStaffName",
      value.map((item) => item.displayName).join(",")
    );
  };
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        overflowY: "auto",
        overflowX: "hidden",
        paddingTop: "20px",
        padding: "20px 10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Tạo phòng ban</h2>
        <Link to="/category/project">
          <Button color="secondary" variant="outlined">
            Danh sách dự án
          </Button>
        </Link>
      </div>
      <form
        style={{
          paddingTop: "10px",
          gap: "10px",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={formik.handleSubmit}
        autoComplete="on"
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <GlobitsTextField
            name={"parentName"}
            id="parentName"
            label="Đơn vị trực thuộc"
            value={formik.values.listStaffName}
            disabled
            error={formik.errors.listStaffName}
            helperText={formik.errors.listStaffName}
          />
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: "4px",
            }}
          >
            <GlobitsPopoverTable
              isNotTitle
              data={staffStore.staffList}
              columns={columns}
              totalElements={staffStore.totalElements}
              totalPages={staffStore.totalPages}
              page={staffStore.page}
              setPageSize={staffStore.handlePageSize}
              nameButton="Lựa chọn"
              title="Lựa chọn phòng ban"
              handleChangePage={staffStore.handleChangePage}
              selection
              handleSubmit={handleSubmit}
              handleSelectList={handleSelectList}
            />
          </div>
        </div>

        <GlobitsTextField
          name={"code"}
          id="code"
          label="Mã"
          value={formik.values.code}
          onChange={formik.handleChange}
          error={!!formik.errors.code}
          helperText={formik.errors.code}
          autoFocus
        />
        <GlobitsTextField
          name={"name"}
          id="name"
          label="Tên dự án"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={!!formik.errors.name}
          helperText={formik.errors.name}
        />

        <GlobitsTextField
          name={"description"}
          id="description"
          label="Mô tả"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={!!formik.errors.description}
          helperText={formik.errors.description}
        />

        <Button type="submit" variant="contained" color="secondary">
          Thêm
        </Button>
      </form>
    </div>
  );
});

export default ProjectAdd;
