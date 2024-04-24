import { Button, makeStyles } from "@material-ui/core";
import { Opacity } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { FieldArray } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 0",
    gap: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderBottom: "1px solid gray",
  },
  delete: {
    backgroundColor: "red",
    color: "white",
    "& hover": {
      backgroundColor: "red",
      Opacity: "0.8",
    },
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

const FieldStaffArray = (props) => {
  const classes = useStyles();
  const { formik, familyRelationData } = props;
  return (
    <FieldArray
      name="familyRelationships"
      render={(arrayHelpers) => (
        <div>
          <h6>Chọn gia đình</h6>
          {formik.values.familyRelationships.map(
            (familyRelationship, index) => {
              return (
                <div key={index} className={classes.root}>
                  <div
                    style={{
                      gap: "10px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                    }}
                  >
                    <GlobitsTextField
                      name={`familyRelationships.${index}.fullName`}
                      label="Họ và tên"
                      value={
                        formik.values?.familyRelationships[index]?.fullName
                      }
                      onChange={formik.handleChange}
                      id={`familyRelationships.${index}.fullName`}
                      error={
                        (formik.errors?.familyRelationships &&
                          formik.errors?.familyRelationships[index]
                            ?.fullName) ||
                        false
                      }
                      helperText={
                        (formik.errors?.familyRelationships &&
                          formik.errors?.familyRelationships[index]
                            ?.fullName) ||
                        ""
                      }
                    />

                    <GlobitsTextField
                      name={`familyRelationships.${index}.profession`}
                      label="Nghề nghiệp"
                      value={
                        formik.values.familyRelationships[index].profession
                      }
                      onChange={formik.handleChange}
                      id={`familyRelationships.${index}.profession`}
                      error={
                        (formik.errors?.familyRelationships &&
                          formik.errors?.familyRelationships[index]
                            ?.profession) ||
                        false
                      }
                      helperText={
                        (formik.errors?.familyRelationships &&
                          formik.errors?.familyRelationships[index]
                            ?.profession) ||
                        ""
                      }
                    />
                    <GlobitsTextField
                      name={`familyRelationships.${index}.address`}
                      label="Địa chỉ"
                      value={formik.values.familyRelationships[index].address}
                      onChange={formik.handleChange}
                      id={`familyRelationships.${index}.address`}
                      error={
                        (formik.errors?.familyRelationships &&
                          formik.errors?.familyRelationships[index]?.address) ||
                        false
                      }
                      helperText={
                        (formik.errors?.familyRelationships &&
                          formik.errors?.familyRelationships[index]?.address) ||
                        ""
                      }
                    />
                    <GlobitsTextField
                      name={`familyRelationships.${index}.description`}
                      label="Mô tả"
                      value={
                        formik.values.familyRelationships[index].description
                      }
                      id={`familyRelationships.${index}.description`}
                      onChange={formik.handleChange}
                      error={
                        (formik.errors?.familyRelationships &&
                          formik.errors?.familyRelationships[index]
                            ?.description) ||
                        false
                      }
                      helperText={
                        (formik.errors?.familyRelationships &&
                          formik.errors?.familyRelationships[index]
                            ?.description) ||
                        ""
                      }
                    />

                    <GlobitsDateTimePicker
                      name={`familyRelationships.${index}.birthDate`}
                      id={`familyRelationships.${index}.birthDate`}
                      size="small"
                      variant="outlined"
                      value={formik.values.familyRelationships[index].birthDate}
                      onChange={formik.handleChange}
                      error={
                        (formik.errors?.familyRelationships &&
                          formik.errors?.familyRelationships[index]
                            ?.birthDate) ||
                        false
                      }
                      helperText={
                        (formik.errors?.familyRelationships &&
                          formik.errors?.familyRelationships[index]
                            ?.birthDate) ||
                        ""
                      }
                    />
                    <GlobitsSelectInput
                      nameValue="name"
                      keyValue={"id"}
                      label="Mối quan hệ gia đình"
                      options={familyRelationData}
                      handleChange={(e) => {
                        formik.setFieldValue(
                          `familyRelationships.${index}.familyRelationship.id`,
                          e.target.value
                        );
                      }}
                      defaultValue={
                        formik.values.familyRelationships[index]
                          .familyRelationship.id
                      }
                      error={
                        (formik.errors?.familyRelationships &&
                          formik.errors?.familyRelationships[index]
                            ?.familyRelationship?.id) ||
                        false
                      }
                      helperText={
                        (formik.errors?.familyRelationships &&
                          formik.errors?.familyRelationships[index]
                            ?.familyRelationship?.id) ||
                        ""
                      }
                    />
                  </div>
                  {formik.values.familyRelationships.length >= 2 && (
                    <div className={classes.footer}>
                      <Button
                        variant="contained"
                        className={classes.delete}
                        onClick={() => arrayHelpers.remove(index)}
                        size="small"
                        color="secondary"
                      >
                        Xóa
                      </Button>
                    </div>
                  )}
                </div>
              );
            }
          )}

          <div
            style={{
              paddingTop: "10px",
            }}
          >
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() =>
                arrayHelpers.push({
                  fullName: "",
                  profession: "",
                  birthDate: "",
                  familyRelationship: {
                    id: "",
                  },
                  address: "",
                  description: "",
                })
              }
              size="small"
            >
              +
            </Button>
          </div>
        </div>
      )}
    />
  );
};

export default FieldStaffArray;
