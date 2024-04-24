import React, { useEffect, useState } from "react";
import { deleteDepartment, pagingAllDepartments } from "./DepartmentService";
import GlobitsTable from "app/common/GlobitsTable";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import { toast } from "react-toastify";
import { useStore } from "app/stores";
import { observer } from "mobx-react";

const DepartmentIndex = observer(({ history }) => {
  const { departmentStore } = useStore();

  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  useEffect(() => {
    departmentStore.handleDepartmentListInitial();
  }, []);

  const columns = [
    {
      field: "code",
      title: "Code",
      cellStyle: {
        padding: "0 10px",
      },
      headerStyle: {
        padding: "0 10px",
      },
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

  const actions = [
    (rowData) => ({
      icon: "edit",
      tooltip: "Edit ",
      onClick: (event, rowData) => {
        history.push(`/category/department/edit/${rowData.id}`);
      },
    }),
    (rowData) => ({
      icon: "delete",
      tooltip: "Delete",
      onClick: (event, rowData) => onOpenDelete(rowData.id),
    }),

    {
      icon: "add",
      tooltip: "Add Country",
      isFreeAction: true,
      onClick: (event) => {
        history.push("/category/department/add");
      },
    },
  ];

  const onOpenDelete = async (id) => {
    setOpenDelete(true);
    setIdDelete(id);
  };

  const pageSizeOption = [5, 10, 15, 20];

  const handleSelectList = () => {};
  const handleDelete = async () => {
    await departmentStore.handleDeleteDepartmentsById(idDelete);
    setOpenDelete(false);
    setIdDelete(null);
  };
  return (
    <div>
      <div
        style={{
          padding: "20px 10px",
        }}
      >
        <GlobitsTable
          data={departmentStore.departmentList}
          columns={columns}
          handleSelectList={handleSelectList}
          selection={false}
          totalPages={departmentStore.totalPages}
          handleChangePage={departmentStore.handleChangePage}
          setRowsPerPage={departmentStore.handlePageSize}
          pageSize={departmentStore.pageSize}
          pageSizeOption={pageSizeOption}
          totalElements={departmentStore.totalElements}
          page={departmentStore.page}
          title="Danh sách phòng ban"
          actions={actions}
        />
      </div>
      <GlobitsConfirmationDialog
        open={openDelete}
        title={"Bạn có chắc chắn muốn xóa không ??"}
        agree="Xóa"
        text={"Nếu bạn xóa giá trị sẽ bị mất và không khôi phục lại được"}
        cancel={"Hủy"}
        onConfirmDialogClose={() => {
          setOpenDelete(false);
          setIdDelete(null);
        }}
        onYesClick={() => handleDelete()}
      />
    </div>
  );
});

export default DepartmentIndex;
