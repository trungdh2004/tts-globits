import React, { useEffect, useState } from "react";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { Button, TextField, makeStyles } from "@material-ui/core";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import { handleGetAll } from "../action";
import { pagingProject } from "../Project/ProjectService";
import { Autocomplete } from "@material-ui/lab";
import FieldTimeSheetArray from "./components/FieldArrayTime";
import { toast } from "react-toastify";
import { createTimeSheet } from "./TimeSheetService";

const hours = [
  {
    name: "01",
  },
  {
    name: "02",
  },
  {
    name: "03",
  },
  {
    name: "04",
  },
  {
    name: "05",
  },
  {
    name: "06",
  },
  {
    name: "07",
  },
  {
    name: "08",
  },
  {
    name: "09",
  },
  {
    name: "10",
  },
  {
    name: "12",
  },

  {
    name: "13",
  },
  {
    name: "14",
  },
  {
    name: "15",
  },
  {
    name: "16",
  },
  {
    name: "17",
  },
  {
    name: "18",
  },
  {
    name: "19",
  },
  {
    name: "20",
  },
  {
    name: "21",
  },
  {
    name: "22",
  },
  {
    name: "23",
  },
  {
    name: "24",
  },
];

const priorityList = [
  {
    value: "1",
    name: "Thấp",
  },
  {
    value: "2",
    name: "Trung bình",
  },
  {
    value: "3",
    name: "Cao ",
  },
  {
    value: "4",
    name: "Cấp bách",
  },
];

const useStyles = makeStyles((theme) => ({
  grid2: {
    padding: "10px 0",
    gap: "10px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  grid3: {
    padding: "10px 0",
    gap: "10px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  create: {
    paddingTop: "10px",
  },
  buttonCreate: {},
}));

const ProjectAdd = observer(({ history }) => {
  const classes = useStyles();
  // const { projectList, setProjectList } = useStore([]);
  const formik = useFormik({
    initialValues: {
      priority: "",
      startTime: "",
      endTime: "",
      workingDate: "",
      project: {
        id: "",
      },
      description: "",
      timeSheetStaff: [
        {
          id: "",
        },
      ],
      details: [
        {
          workingItemTitle: "",
          employee: {
            id: "",
          },
        },
      ],
    },
    validationSchema: Yup.object({
      priority: Yup.string().required("required"),
      startTime: Yup.string().required("required"),
      endTime: Yup.string().required("required"),
      workingDate: Yup.date().required("required"),
      description: Yup.string().required("required"),
      project: Yup.object({
        id: Yup.string().required("required"),
      }),
      timeSheetStaff: Yup.array().of(
        Yup.object({
          id: Yup.string().required("required"),
        })
      ),
      details: Yup.array().of(
        Yup.object({
          employee: Yup.object({
            id: Yup.string().required("required"),
          }),
          workingItemTitle: Yup.string().required("required"),
        })
      ),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await createTimeSheet(values);
        toast.success("Bạn tạo thành công");
        history.push("/category/timeSheet");
      } catch (error) {
        toast.error("Tạo thất bại");
      }
    },
  });

  const [projectList, setProjectList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [sheetStaff, setSheetStaff] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await handleGetAll(pagingProject, 20);
      setProjectList(data);
    })();
  }, []);

  useEffect(() => {
    setSheetStaff([]);
    formik.setFieldValue("timeSheetStaff", [
      {
        id: "",
      },
    ]);

    formik.setFieldValue(
      "details",
      formik.values.details.map((item) => ({
        ...item,
        employee: {
          id: "",
        },
      }))
    );
  }, [staffList]);

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
        <h2>Tạo thời khóa biểu</h2>
        <Link to="/category/project">
          <Button color="secondary" variant="outlined">
            Danh sách dự án
          </Button>
        </Link>
      </div>
      <FormikProvider value={formik}>
        <form
          style={{
            paddingTop: "10px",
            gap: "10px",
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={formik.handleSubmit}
        >
          <GlobitsTextField
            name={"description"}
            id="description"
            label="Mô tả"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.errors.description}
          />

          <GlobitsSelectInput
            nameValue="name"
            keyValue={"id"}
            label="Dự án"
            options={projectList}
            handleChange={(e) => {
              formik.setFieldValue("project.id", e.target.value);
              const project = projectList.find(
                (item) => item.id === e.target.value
              );
              setStaffList(project.projectStaff);
            }}
            // values={formik.values.startTime}
            error={formik.errors.project?.id}
          />

          <Autocomplete
            multiple
            id="tags-standard"
            options={staffList}
            getOptionLabel={(option) => option?.displayName}
            onChange={(event, newValue) => {
              const timeSheetStaff = newValue.map((item) => ({
                id: item.id,
              }));
              formik.setFieldValue("timeSheetStaff", timeSheetStaff);
              setSheetStaff(newValue);
            }}
            value={sheetStaff}
            variant="outlined"
            disabled={!staffList.length}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                disabled
                variant="outlined"
                label="Nhân viên tham gia"
                error={
                  (formik.errors.timeSheetStaff &&
                    formik.errors.timeSheetStaff[0].id) ||
                  false
                }
              />
            )}
          />

          {/* //todo: giản lí thời gian */}
          <div className={classes.grid3}>
            <GlobitsDateTimePicker
              label="Ngày làm việc"
              name={"workingDate"}
              id={"workingDate"}
              onChange={formik.handleChange}
              error={!!formik.errors.workingDate}
              helperText={formik.errors.workingDate}
              value={formik.values.workingDate}
            />
            <GlobitsSelectInput
              nameValue="name"
              keyValue={"name"}
              label="Giờ bắt đầu"
              options={hours}
              name={"startTime"}
              id={"startTime"}
              values={formik.values.startTime}
              handleChange={formik.handleChange}
              error={formik.errors.startTime}
            />
            <GlobitsSelectInput
              nameValue="name"
              keyValue={"name"}
              label="Giờ kết thúc"
              options={hours}
              name={"endTime"}
              id={"endTime"}
              values={formik.values.endTime}
              handleChange={formik.handleChange}
              error={formik.errors.endTime}
            />
          </div>

          <GlobitsSelectInput
            nameValue="name"
            keyValue={"value"}
            label="Sự ưu tiên"
            options={priorityList}
            name={"priority"}
            id={"priority"}
            values={formik.values.priority}
            handleChange={formik.handleChange}
            error={formik.errors.priority}
          />

          {/* //todo: ========== */}
          <FieldTimeSheetArray formik={formik} sheetStaff={sheetStaff} />
          <Button type="submit" variant="contained" color="secondary">
            Thêm
          </Button>
        </form>
      </FormikProvider>
    </div>
  );
});

export default ProjectAdd;
