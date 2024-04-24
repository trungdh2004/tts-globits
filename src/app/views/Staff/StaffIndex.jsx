import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import GlobitsTable from "app/common/GlobitsTable";
import { useStore } from "app/stores";
import { format } from "date-fns";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

const StaffIndex = observer(({ history }) => {
  const { staffStore } = useStore();

  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  useEffect(() => {
    staffStore.handleStaffInitial();
  }, []);

  const columns = [
    {
      field: "displayName",
      title: "Tên",
      cellStyle: {
        padding: "0 10px",
      },
      headerStyle: {
        padding: "0 10px",
      },
    },
    {
      field: "birthPlace",
      title: "Nơi sinh",
    },
    {
      field: "birthDate",
      title: "Ngày sinh",
      render: (rowData) => {
        return format(new Date(rowData.birthDate), "dd-MM-yyyy");
      },
    },
    {
      field: "nationality",
      title: "Quốc tịch",
      render: (rowData) => {
        return <span>{rowData.nationality?.name}</span>;
      },
    },
    {
      field: "department",
      title: "Phòng ban",
      render: (rowData) => {
        return <span>{rowData.department?.name}</span>;
      },
    },
  ];

  const actions = [
    (rowData) => ({
      icon: "edit",
      tooltip: "Sửa",
      onClick: (event, rowData) =>
        history.push(`/category/staff/edit/${rowData.id}`),
    }),
    (rowData) => ({
      icon: "delete",
      tooltip: "Xóa",
      onClick: (event, rowData) => onOpenDelete(rowData.id),
    }),

    {
      icon: "add",
      tooltip: "Thêm",
      isFreeAction: true,
      onClick: (event) => {
        history.push("/category/staff/add");
      },
    },
  ];

  const pageSizeOption = [5, 10, 15];

  const handleSelectList = (id) => {
    console.log(id);
  };

  const onOpenDelete = async (id) => {
    console.log("id: " + id);
    setOpenDelete(true);
    setIdDelete(id);
  };

  return (
    <div
      style={{
        padding: "10px 20px",
        // overflowX: "hidden",
      }}
    >
      <div>
        <GlobitsTable
          data={staffStore.staffList}
          columns={columns}
          handleSelectList={handleSelectList}
          selection={false}
          totalPages={staffStore.totalPages}
          handleChangePage={staffStore.handleChangePage}
          setRowsPerPage={staffStore.handlePageSize}
          pageSize={staffStore.pageSizeStaff}
          pageSizeOption={pageSizeOption}
          totalElements={staffStore.totalElements}
          page={staffStore.page}
          actions={actions}
          title="Danh sách dân tộc"
        />
      </div>
      <GlobitsConfirmationDialog
        open={openDelete}
        title={"Bạn có chắc chắn muốn xóa không??"}
        agree="Xóa"
        text={"Nếu bạn xóa giá trị sẽ bị mất và không khôi phục lại được !"}
        cancel={"Hủy"}
        onConfirmDialogClose={() => {
          setOpenDelete(false);
          setIdDelete(null);
        }}
        onYesClick={async () => {
          staffStore.handleDeleteStaffById(idDelete);
          setOpenDelete(false);
          setIdDelete(null);
        }}
      />
    </div>
  );
});

export default StaffIndex;
