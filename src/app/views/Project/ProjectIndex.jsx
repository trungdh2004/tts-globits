import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import GlobitsTable from "app/common/GlobitsTable";
import { useStore } from "app/stores";
import { format } from "date-fns";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

const StaffIndex = observer(({ history }) => {
  const { projectStore } = useStore();

  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  useEffect(() => {
    projectStore.handleProjectInitial();
  }, []);

  const columns = [
    {
      field: "name",
      title: "Tên",
      cellStyle: {
        padding: "0 10px",
      },
      headerStyle: {
        padding: "0 10px",
      },
    },
    {
      field: "code",
      title: "Mã",
    },
    {
      field: "description",
      title: "Mô tả",
    },
    {
      field: "projectStaff",
      title: "Các nhân viên",
      render: (rowData) => {
        return (
          <span>
            {rowData.projectStaff?.map((staff) => staff.displayName).join(",")}
          </span>
        );
      },
    },
  ];

  const actions = [
    (rowData) => ({
      icon: "edit",
      tooltip: "Sửa",
      onClick: (event, rowData) =>
        history.push(`/category/project/edit/${rowData.id}`),
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
        history.push("/category/project/add");
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
          data={projectStore.projectList}
          columns={columns}
          handleSelectList={handleSelectList}
          selection={false}
          totalPages={projectStore.totalPages}
          handleChangePage={projectStore.handleChangePage}
          setRowsPerPage={projectStore.handlePageSize}
          pageSize={projectStore.pageSizeStaff}
          pageSizeOption={pageSizeOption}
          totalElements={projectStore.totalElements}
          page={projectStore.page}
          actions={actions}
          title="Danh sách dự án"
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
          projectStore.handleDeleteById(idDelete);
          setOpenDelete(false);
          setIdDelete(null);
        }}
      />
    </div>
  );
});

export default StaffIndex;
