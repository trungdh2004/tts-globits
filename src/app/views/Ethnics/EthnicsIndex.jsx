import React, { useEffect, useState } from "react";
import GlobitsTable from "app/common/GlobitsTable";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import { observer } from "mobx-react-lite";

import { useStore } from "app/stores";
export default observer(function EthnicsIndex({ history }) {
  const { ethnicsStore } = useStore();

  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  useEffect(() => {
    ethnicsStore.handleEthnicsInitial();
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
      tooltip: "Sửa",
      onClick: (event, rowData) =>
        history.push(`/category/ethnics/edit/${rowData.id}`),
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
        history.push("/category/ethnics/add");
      },
    },
  ];

  const pageSizeOption = [5, 10, 15];

  const handleSelectList = (id) => {
    console.log(id);
  };

  const onOpenDelete = async (id) => {
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
          data={ethnicsStore.ethnicsList}
          columns={columns}
          handleSelectList={handleSelectList}
          selection={false}
          totalPages={ethnicsStore.totalPages}
          handleChangePage={ethnicsStore.handleChangePage}
          setRowsPerPage={ethnicsStore.handlePageSize}
          pageSize={ethnicsStore.pageSize}
          pageSizeOption={pageSizeOption}
          totalElements={ethnicsStore.totalElements}
          page={ethnicsStore.page}
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
          ethnicsStore.handleDeleteEthnicsById(idDelete);
          setOpenDelete(false);
          setIdDelete(null);
        }}
      />
    </div>
  );
});
