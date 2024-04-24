import GlobitsTextField from "app/common/form/GlobitsTextField";
import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getEthnics } from "./EthnicsService";
import { Link } from "react-router-dom";
import { useStore } from "app/stores";

export default function CountryDetail({ match, history }) {
  const { ethnicsStore } = useStore();
  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required!"),
      code: Yup.string().required("Required!"),
      description: Yup.string().required("Required!"),
    }),
    onSubmit: async (values) => {
      ethnicsStore.handleUpdateEthnics(
        {
          id: match.params.id,
          ...values,
        },
        history
      );
    },
  });

  useEffect(() => {
    (async () => {
      const { data } = await getEthnics(match.params.id);
      formik.setValues({
        name: data.name,
        code: data.code,
        description: data.description,
      });
    })();
  }, []);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        overflowY: "auto",
        overflowX: "hidden",
        paddingTop: "20px",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Tạo dân tộc</h2>
        <Link to="/category/ethnics">
          <Button color="secondary" variant="outlined">
            Danh sách dân tộc
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
      >
        <GlobitsTextField
          name={"name"}
          id="name"
          label="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
          helperText={formik.errors.name}
        />
        <GlobitsTextField
          name={"code"}
          id="code"
          label="code"
          value={formik.values.code}
          onChange={formik.handleChange}
          error={formik.errors.code}
          helperText={formik.errors.code}
        />
        <GlobitsTextField
          name={"description"}
          id="description"
          label="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description}
          helperText={formik.errors.description}
        />
        <Button type="submit" variant="contained" color="secondary">
          Chỉnh sửa
        </Button>
      </form>
    </div>
  );
}
