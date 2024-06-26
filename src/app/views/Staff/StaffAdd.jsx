import { Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { useFormik, FormikProvider } from "formik";
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
import TextField from "@material-ui/core/TextField";
import FieldStaffArray from "./component/FieldArray";
import { createStaff } from "./StaffService";
import { toast } from "react-toastify";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";

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
      lastName: "",
      firstName: "",
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
      department: {
        id: "",
      },
      familyRelationships: [
        {
          fullName: "",
          profession: "",
          birthDate: "",
          familyRelationship: {
            id: "",
          },
          address: "",
          description: "",
        },
      ],
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
      department: Yup.object({
        id: Yup.string().required("Required"),
      }),
      birthDate: Yup.date().required("Required!"),
      familyRelationships: Yup.array().of(
        Yup.object({
          fullName: Yup.string().required("Required"),
          profession: Yup.string().required("Required"),
          birthDate: Yup.date().required("Required"),
          familyRelationship: Yup.object({
            id: Yup.string().required("Required"),
          }),
          address: Yup.string().required("Required"),
          description: Yup.string().required("Required"),
        })
        // .shape({
        //   fullName: Yup.string().required("Required"),
        //   // profession: Yup.string().required("Required"),
        //   // birthDate: Yup.string().required("Required"),
        //   // familyRelationship: Yup.object({
        //   //   id: Yup.string().required("Required"),
        //   // }),
        //   // address: Yup.string().required("Required"),
        //   // description: Yup.string().required("Required"),
        // })
      ),
    }),
    onSubmit: async (values) => {
      try {
        const newStaff = await createStaff({
          displayName: `${values.firstName} ${values.lastName}`,
          ...values,
        });
        toast.success("Tạo nhân viên thành công");
        history.push("/category/staff");
      } catch (error) {
        toast.error("Tạo nhân viên thất bại");
      }
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
    if (!staffStore.familyRelationsList.length) {
      staffStore.handleFamilyRelationInitial();
    }
    if (!staffStore.departmentList.length) {
      staffStore.handleDepartmentListInitial();
    }
  }, []);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
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
          </div>

          <GlobitsTextField
            label="Display "
            value={`${formik.values.firstName} ${formik.values.lastName}`}
            disabled
          />

          {/* //todo: gender ======================== */}
          <GlobitsSelectInput
            nameValue="title"
            keyValue={"value"}
            options={gender}
            label="Giới tính"
            name={"gender"}
            id={"gender"}
            value={formik.values.gender}
            handleChange={formik.handleChange}
            error={formik.errors.gender}
            helperText={formik.errors.gender}
          />
          {/* //todo: birthDate ======================== */}
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
            label="Nơi sinh"
            value={formik.values.birthPlace}
            onChange={formik.handleChange}
            error={formik.errors.birthPlace}
            helperText={formik.errors.birthPlace}
          />
          {/* //todo: permanentResidence ====================== */}
          <GlobitsTextField
            name={"permanentResidence"}
            id="permanentResidence"
            label="Nơi cư trú"
            value={formik.values.permanentResidence}
            onChange={formik.handleChange}
            error={formik.errors.permanentResidence}
            helperText={formik.errors.permanentResidence}
          />
          {/* //todo: currentResidence ====================== */}
          <GlobitsTextField
            name={"currentResidence"}
            id="currentResidence"
            label="Nơi cư trú hiện tại"
            value={formik.values.currentResidence}
            onChange={formik.handleChange}
            error={formik.errors.currentResidence}
            helperText={formik.errors.currentResidence}
          />
          {/* //todo: email ====================== */}
          <GlobitsTextField
            name={"email"}
            id="email"
            label="Email"
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
            label="Số điện thoại"
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
            label="Số ID"
            type="idNumber"
            value={formik.values.idNumber}
            onChange={formik.handleChange}
            error={formik.errors.idNumber}
            helperText={formik.errors.idNumber}
          />
          <div
            style={{
              display: "flex",
              // justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* //todo: country ======================== */}

            <GlobitsSelectInput
              nameValue="name"
              keyValue={"id"}
              options={staffStore.countryList}
              label="Quốc tịch"
              name={"nationality"}
              id={"nationality"}
              handleChange={(e) => {
                formik.setFieldValue("nationality.id", e.target.value);
              }}
              error={formik.errors.nationality?.id}
              helperText={formik.errors.nationality?.id}
            />

            {/* //todo: ethnics ======================== */}

            <GlobitsSelectInput
              nameValue="name"
              keyValue={"id"}
              options={staffStore.ethnicsList}
              name={"ethnics"}
              id={"ethnics"}
              handleChange={(e) => {
                formik.setFieldValue("ethnics.id", e.target.value);
              }}
              label="Dân tộc"
              error={formik.errors.ethnics?.id}
              helperText={formik.errors.ethnics?.id}
            />
          </div>
          <div
            style={{
              display: "flex",
              // justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* //todo: religion ======================== */}

            <GlobitsSelectInput
              nameValue="name"
              keyValue={"id"}
              options={staffStore.religionList}
              name={"religion"}
              id={"religion"}
              handleChange={(e) => {
                formik.setFieldValue("religion.id", e.target.value);
              }}
              label="Tôn giáo "
              error={formik.errors.religion?.id}
              helperText={formik.errors.religion?.id}
            />

            {/* //todo: departmentList ======================== */}
            <GlobitsSelectInput
              nameValue="text"
              keyValue={"id"}
              options={staffStore.departmentList}
              name={"department"}
              id={"department"}
              handleChange={(e) => {
                formik.setFieldValue("department.id", e.target.value);
              }}
              label="Phòng ban"
              error={formik.errors.department?.id}
              helperText={formik.errors.department?.id}
            />
          </div>

          {/*  */}
          <FieldStaffArray
            formik={formik}
            familyRelationData={staffStore.familyRelationsList}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{
              color: "white",
            }}
          >
            Thêm nhân viên
          </Button>
        </form>
      </FormikProvider>
    </div>
  );
});

export default StaffAdd;
