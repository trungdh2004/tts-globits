import { Button, makeStyles } from "@material-ui/core";
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

const FieldTimeSheetArray = (props) => {
  const classes = useStyles();
  const { formik, sheetStaff } = props;

  return (
    <FieldArray
      name="details"
      render={(arrayHelpers) => (
        <div>
          <h6>Chi tiết công việc</h6>
          {formik.values.details.map((details, index) => {
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
                    name={`details.${index}.fullName`}
                    label="Tên công việc"
                    value={formik.values?.details[index]?.workingItemTitle}
                    onChange={formik.handleChange}
                    id={`details.${index}.workingItemTitle`}
                    error={
                      (formik.errors?.details &&
                        formik.errors?.details[index]?.workingItemTitle) ||
                      false
                    }
                    helperText={
                      (formik.errors?.details &&
                        formik.errors?.details[index]?.workingItemTitle) ||
                      ""
                    }
                  />

                  <GlobitsSelectInput
                    nameValue="displayName"
                    keyValue={"id"}
                    label="Nhân viên thực hiện"
                    options={sheetStaff}
                    disabled={!sheetStaff.length}
                    // defaultValue={
                    //   formik.values.details[index]
                    //     .familyRelationship.id
                    // }
                    value={formik.values?.details[index]?.employee?.id}
                    handleChange={(e) => {
                      formik.setFieldValue(
                        `details.${index}.employee.id`,
                        e.target.value
                      );
                    }}
                  />
                </div>
                {formik.values.details.length >= 2 && (
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
          })}

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
                  workingItemTitle: "",
                  employee: {
                    id: "",
                  },
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

export default FieldTimeSheetArray;
