import GlobitsTextField from "app/common/form/GlobitsTextField";
import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCountry, editCountry, getCountry } from "./CountryService";
import { useStore } from "app/stores";

export default function CountryDetail({ match, history }) {
  const { countryStore } = useStore();

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
      countryStore.handleUpdateCountry(
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
      const { data } = await getCountry(match.params.id);
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
      <h2>Update Country</h2>
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
          Update
        </Button>
      </form>
    </div>
  );
}
