import { Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import { useStore } from "app/stores";
import { observer } from "mobx-react";

const gender = [
  {
    title: "Trai",
    value: "M",
  },
  {
    title: "Gái",
    value: "F",
  },
  {
    title: "Khác",
    value: "U",
  },
];

const StaffAdd = observer(({ history }) => {
  const { staffStore } = useStore();

  const formik = useFormik({
    initialValues: {
      lastName: "123",
      firstName: "456",
      gender: "",
      birthPlace: "",
      permanentResidence: "",
      currentResidence: "",
      email: "",
      phoneNumber: "",
      idNumber: "",
      birthDate: "",
      nationality: {
        id: "",
      },
      ethnics: {
        id: "",
      },
      religion: {
        id: "",
      },
    },
    validationSchema: Yup.object({
      lastName: Yup.string().required("Required!"),
      firstName: Yup.string().required("Required!"),
      gender: Yup.string().required("Required!"),
      birthPlace: Yup.string().required("Required!"),
      permanentResidence: Yup.string().required("Required!"),
      currentResidence: Yup.string().required("Required!"),
      email: Yup.string().required("Required!"),
      phoneNumber: Yup.string().required("Required!"),
      idNumber: Yup.string().required("Required!"),
      nationality: Yup.object({
        id: Yup.string().required("Required"),
      }),
      religion: Yup.object({
        id: Yup.string().required("Required"),
      }),
      ethnics: Yup.object({
        id: Yup.string().required("Required"),
      }),
      birthDate: Yup.date().required("Required!"),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (!staffStore.countryList.length) {
      staffStore.handleCountryInitial();
    }
    if (!staffStore.ethnicsList.length) {
      staffStore.handleEthnicsInitial();
    }
    if (!staffStore.religionList.length) {
      staffStore.handleReligionInitial();
    }
  }, []);

  console.log(staffStore.religionList);
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
        <h2>Tạo phòng ban</h2>
        <Link to="/category/department">
          <Button color="secondary" variant="outlined">
            Danh sách nhân viên
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
          name={"firstName"}
          id="firstName"
          label="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.errors.firstName}
          helperText={formik.errors.firstName}
        />
        <GlobitsTextField
          name={"lastName"}
          id="lastName"
          label="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.errors.lastName}
          helperText={formik.errors.lastName}
        />
        <GlobitsTextField
          label="Display "
          value={`${formik.values.firstName} ${formik.values.lastName}`}
          disabled
        />

        <FormControl variant="outlined" error={formik.errors.gender}>
          <InputLabel id="demo-simple-select-outlined-label">
            Giới tính
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            {gender.map((item) => (
              <MenuItem value={item.value}>{item.title}</MenuItem>
            ))}
          </Select>
          {formik.errors.gender && (
            <FormHelperText>{formik.errors.gender}</FormHelperText>
          )}
        </FormControl>

        <GlobitsDateTimePicker
          name="birthDate"
          id="birthDate"
          size="small"
          variant="outlined"
          value={formik.values.birthDate}
          onChange={formik.handleChange}
          error={!!formik.errors.birthDate}
          helperText={formik.errors.birthDate}
        />

        {/* //todo: birthPlace ====================== */}
        <GlobitsTextField
          name={"birthPlace"}
          id="birthPlace"
          label="birthPlace"
          value={formik.values.birthPlace}
          onChange={formik.handleChange}
          error={formik.errors.birthPlace}
          helperText={formik.errors.birthPlace}
        />
        {/* //todo: permanentResidence ====================== */}
        <GlobitsTextField
          name={"permanentResidence"}
          id="permanentResidence"
          label="permanentResidence"
          value={formik.values.permanentResidence}
          onChange={formik.handleChange}
          error={formik.errors.permanentResidence}
          helperText={formik.errors.permanentResidence}
        />
        {/* //todo: currentResidence ====================== */}
        <GlobitsTextField
          name={"currentResidence"}
          id="currentResidence"
          label="currentResidence"
          value={formik.values.currentResidence}
          onChange={formik.handleChange}
          error={formik.errors.currentResidence}
          helperText={formik.errors.currentResidence}
        />
        {/* //todo: email ====================== */}
        <GlobitsTextField
          name={"email"}
          id="email"
          label="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
          helperText={formik.errors.email}
        />
        {/* //todo: phoneNumber ====================== */}
        <GlobitsTextField
          name={"phoneNumber"}
          id="phoneNumber"
          label="phoneNumber"
          type="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={formik.errors.phoneNumber}
          helperText={formik.errors.phoneNumber}
        />
        {/* //todo: idNumber ====================== */}
        <GlobitsTextField
          name={"idNumber"}
          id="idNumber"
          label="idNumber"
          type="idNumber"
          value={formik.values.idNumber}
          onChange={formik.handleChange}
          error={formik.errors.idNumber}
          helperText={formik.errors.idNumber}
        />
        {/* //todo: country ======================== */}
        <Autocomplete
          id="nationality"
          // value={formik.values.nationality.id}
          onChange={(event, newValue) => {
            formik.setFieldValue("nationality.id", newValue.id);
          }}
          options={staffStore.countryList}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <GlobitsTextField
              {...params}
              label="Quốc tịch"
              variant="outlined"
              error={formik.errors.nationality?.id}
              helperText={formik.errors.nationality?.id}
            />
          )}
        />
        {/* //todo: ethnics ======================== */}
        <Autocomplete
          id="ethnics"
          // value={formik.values.nationality.id}
          onChange={(event, newValue) => {
            formik.setFieldValue("ethnics.id", newValue.id);
          }}
          options={staffStore.ethnicsList}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <GlobitsTextField
              {...params}
              label="Dân tộc"
              variant="outlined"
              error={formik.errors.ethnics?.id}
              helperText={formik.errors.ethnics?.id}
            />
          )}
        />
        {/* //todo: religion ======================== */}
        <Autocomplete
          id="religion"
          // value={formik.values.nationality.id}
          onChange={(event, newValue) => {
            formik.setFieldValue("religion.id", newValue.id);
          }}
          options={staffStore.religionList}
          getOptionLabel={(option) => (option.name ? option.name : "null")}
          renderInput={(params) => (
            <GlobitsTextField
              {...params}
              label="Tôn giáo"
              variant="outlined"
              error={formik.errors.religion?.id}
              helperText={formik.errors.religion?.id}
            />
          )}
        />
        <Button type="submit" variant="contained" color="secondary">
          Create
        </Button>
      </form>
    </div>
  );
});

export default StaffAdd;
