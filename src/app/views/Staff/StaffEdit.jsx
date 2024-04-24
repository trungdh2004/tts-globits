import { Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { useFormik, FormikProvider } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import FieldStaffArray from "./component/FieldArray";
import { createStaff, editStaff, getStaffById } from "./StaffService";
import { toast } from "react-toastify";
import { format } from "date-fns";
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

const StaffEdit = observer(({ history, match }) => {
  const { staffStore } = useStore();
  const [loading, setLoading] = useState(false);
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
      ),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        const newStaff = await editStaff({
          id: match.params.id,
          displayName: `${values.firstName} ${values.lastName}`,
          ...values,
        });
        toast.success("Chỉnh sửa nhân viên thành công");
        history.push("/category/staff");
      } catch (error) {
        toast.error("Chỉnh sửa nhân viên thất bại");
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

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getStaffById(match.params.id);
        formik.setValues({
          lastName: data.lastName,
          firstName: data.firstName,
          gender: data.gender,
          birthPlace: data.birthPlace,
          permanentResidence: data.permanentResidence,
          currentResidence: data.currentResidence,
          email: data.email,
          phoneNumber: data.phoneNumber,
          idNumber: data.idNumber,
          birthDate: format(new Date(data.birthDate), "yyyy-MM-dd"),
          nationality: {
            id: data.nationality.id,
          },
          ethnics: {
            id: data.ethnics.id,
          },
          religion: {
            id: data.religion.id,
          },
          department: {
            id: data.department.id,
          },
          familyRelationships: data.familyRelationships.map((item) => ({
            fullName: item.fullName,
            profession: item.profession,
            birthDate: format(new Date(item.birthDate), "yyyy-MM-dd"),
            familyRelationship: {
              id: item.familyRelationship.id,
            },
            address: item.address,
            description: item.description,
          })),
        });
        setLoading(true);
      } catch (error) {}
    })();
  }, []);

  if (!loading) {
    return null;
  }

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
        <h2>Sửa nhân viên</h2>
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
          <>
            <GlobitsSelectInput
              nameValue="title"
              keyValue={"value"}
              options={gender}
              name={"gender"}
              id={"gender"}
              value={formik.values.gender}
              handleChange={formik.handleChange}
              defaultValue={formik.values.gender}
            />
          </>

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

            <>
              <GlobitsSelectInput
                nameValue="name"
                keyValue={"id"}
                options={staffStore.countryList}
                name={"nationality"}
                id={"nationality"}
                handleChange={(e) => {
                  formik.setFieldValue("nationality.id", e.target.value);
                }}
                defaultValue={formik.values.nationality.id}
                error={formik.errors.nationality?.id}
                helperText={formik.errors.nationality?.id}
              />
            </>
            {/* //todo: ethnics ======================== */}

            <>
              <GlobitsSelectInput
                nameValue="name"
                keyValue={"id"}
                options={staffStore.ethnicsList}
                name={"ethnics"}
                id={"ethnics"}
                handleChange={(e) => {
                  formik.setFieldValue("ethnics.id", e.target.value);
                }}
                defaultValue={formik.values.ethnics.id}
              />
            </>
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

            <>
              <GlobitsSelectInput
                nameValue="name"
                keyValue={"id"}
                options={staffStore.religionList}
                name={"religion"}
                id={"religion"}
                handleChange={(e) => {
                  formik.setFieldValue("religion.id", e.target.value);
                }}
                defaultValue={formik.values.religion.id}
              />
            </>
            {/* //todo: departmentList ======================== */}

            <>
              <GlobitsSelectInput
                nameValue="text"
                keyValue={"id"}
                options={staffStore.departmentList}
                name={"department"}
                id={"department"}
                handleChange={(e) => {
                  formik.setFieldValue("department.id", e.target.value);
                }}
                defaultValue={formik.values.department.id}
              />
            </>
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
            Chỉnh sửa
          </Button>
        </form>
      </FormikProvider>
    </div>
  );
});

export default StaffEdit;
