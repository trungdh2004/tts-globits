import React, { useEffect, useState } from "react";
import GlobitsTable from "app/common/GlobitsTable";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import { observer } from "mobx-react-lite";

import { toast } from "react-toastify";
import {
  deleteFamilyRelationship,
  pagingFamilyRelationship,
} from "./FamilyRelationshipService";
import { useStore } from "app/stores";
export default observer(function FamilyRelationshipIndex({ history }) {
  const { familyRelationship } = useStore();

  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  useEffect(() => {
    familyRelationship.handleFamilyRelationshipInitial();
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
        history.push(`/category/familyRelationship/edit/${rowData.id}`),
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
        history.push("/category/familyRelationship/add");
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
          data={familyRelationship.familyRelationshipList}
          columns={columns}
          handleSelectList={handleSelectList}
          selection={false}
          totalPages={familyRelationship.totalPages}
          handleChangePage={familyRelationship.handleChangePage}
          setRowsPerPage={familyRelationship.handlePageSize}
          pageSize={familyRelationship.pageSize}
          pageSizeOption={pageSizeOption}
          totalElements={familyRelationship.totalElements}
          page={familyRelationship.page}
          actions={actions}
          title="Danh sách quan hệ gia đình"
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
        onYesClick={() => {
          setOpenDelete(false);
          setIdDelete(null);
          familyRelationship.handleDeleteFamilyRelationshipById(idDelete);
        }}
      />
    </div>
  );
});
