import React, { useEffect, useState } from "react";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import GlobitsPopoverTable from "app/common/GlobitsPopoverTable";
import { createDepartment, pagingDepartments } from "./DepartmentService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const DepartmentAdd = ({ history }) => {
  const [date, setDate] = useState();
  const formik = useFormik({
    initialValues: {
      parentName: "",
      id: "",
      name: "",
      code: "",
      description: "",
      func: "",
      foundedDate: "",
      industryBlock: "",
      foundedNumber: "",
      displayOrder: "",
    },
    validationSchema: Yup.object({
      parentName: Yup.string(),
      id: Yup.string(),
      name: Yup.string().required("Bạn chưa nhập tên!"),
      code: Yup.string().required("Bạn chưa nhập mã!!"),
      description: Yup.string().required("Bạn chưa nhập mô tả!!"),
      func: Yup.string().required("Bạn chưa nhập chức năng!!"),
      industryBlock: Yup.string().required("Bạn chưa nhập ngành công nhiệp!!"),
      foundedNumber: Yup.string().required("Bạn chưa nhập số thanh lập!!"),
      foundedDate: Yup.date().required("Bạn chưa nhập ngày !"),
      displayOrder: Yup.string().required("Bạn chưa nhập số thứ tự!!"),
    }),
    onSubmit: async (values) => {
      try {
        const parent = {
          id: values.id,
        };

        const { id, parentName, ...orther } = values;

        const body = {
          parent: {
            id: id || null,
          },
          ...orther,
        };
        const res = await createDepartment(body);
        toast.success("Tạo thành công");
        formik.resetForm();
        history.push("/category/department");
      } catch (error) {
        console.log(error);
      }
    },
  });
  const [data, setData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [select, setSelect] = useState(null);

  useEffect(() => {
    (async () => {
      let searchObject = {
        pageIndex: 1,
        pageSize: pageSize,
      };
      let data = await pagingDepartments(searchObject);
      setData(data.data.content);
      setTotalElements(data.data.totalElements);
      setTotalPages(data.data.totalPages);
      setPage(data.data.number + 1);
    })();
  }, [pageSize]);

  const columns = [
    {
      field: "action",
      title: "Action",
      render: (rowData) => {
        return (
          <input
            type="radio"
            id={rowData.id}
            name="check"
            value={rowData.id}
            checked={select === rowData.id}
            onChange={(e) => {
              setSelect(e.target.value);
            }}
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
            }}
          />
        );
      },
    },
    {
      field: "code",
      title: "Code",
    },
    {
      field: "name",
      title: "Name",
    },
    {
      field: "description",
      title: "Description",
    },
  ];

  const handleChangePage = async (event, page) => {
    let searchObject = {
      pageIndex: page,
      pageSize: pageSize,
    };
    let data = await pagingDepartments(searchObject);
    setData(data);
    setPage(data.data.number + 1);
  };

  const handleSubmit = () => {
    const parent = data.find((item) => item.id === select);

    formik.setFieldValue("id", parent.id);
    formik.setFieldValue("parentName", parent.name);
  };

  const handleDate = (value) => {
    console.log(value.target.value);
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
        <Link to="/category/department">
          <Button color="secondary" variant="outlined">
            Danh sách phòng ban
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
            value={formik.values.parentName}
            disabled
          />
          <div
            style={{
              position: "absolute",
              right: "10px",
            }}
          >
            <GlobitsPopoverTable
              isNotTitle
              data={data}
              columns={columns}
              totalElements={totalElements}
              totalPages={totalPages}
              page={page}
              setPageSize={setPageSize}
              nameButton="Lựa chọn"
              title="Lựa chọn phòng ban"
              handleChangePage={handleChangePage}
              select={select}
              setSelect={setSelect}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
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
            label="Tên phòng ban"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={!!formik.errors.name}
            helperText={formik.errors.name}
          />
        </div>

        <GlobitsTextField
          name={"description"}
          id="description"
          label="Mô tả"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={!!formik.errors.description}
          helperText={formik.errors.description}
        />
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <GlobitsTextField
            name={"func"}
            id="func"
            label="Chức năng"
            value={formik.values.func}
            onChange={formik.handleChange}
            error={!!formik.errors.func}
            helperText={formik.errors.func}
          />
          <GlobitsTextField
            name={"industryBlock"}
            id="industryBlock"
            label="Ngành công nghiệp khối"
            value={formik.values.industryBlock}
            onChange={formik.handleChange}
            error={!!formik.errors.industryBlock}
            helperText={formik.errors.industryBlock}
          />
        </div>

        <GlobitsTextField
          name={"foundedNumber"}
          id="foundedNumber"
          label="Số thành lập"
          value={formik.values.foundedNumber}
          onChange={formik.handleChange}
          error={!!formik.errors.foundedNumber}
          helperText={formik.errors.foundedNumber}
        />
        <GlobitsDateTimePicker
          name="foundedDate"
          id="foundedDate"
          size="small"
          variant="outlined"
          onChange={formik.handleChange}
          error={!!formik.errors.foundedDate}
          helperText={formik.errors.foundedDate}
          value={formik.values.foundedDate}
        />

        <GlobitsTextField
          name={"displayOrder"}
          id="displayOrder"
          label="Hiển thị thứ tự"
          value={formik.values.displayOrder}
          onChange={formik.handleChange}
          error={!!formik.errors.displayOrder}
          helperText={formik.errors.displayOrder}
        />
        <Button type="submit" variant="contained" color="secondary">
          Create
        </Button>
      </form>
    </div>
  );
};

export default DepartmentAdd;
