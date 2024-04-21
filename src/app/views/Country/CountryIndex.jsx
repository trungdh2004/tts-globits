import React, { useEffect, useState } from "react";
import { deleteCountry } from "./CountryService";
import GlobitsTable from "app/common/GlobitsTable";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import { useStore } from "app/stores";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";

export default observer(function CountryIndex({ history }) {
  const { countryStore } = useStore();

  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  useEffect(() => {
    countryStore.handleCountryInitial();
  }, []);

  const columns = [
    {
      field: "code",
      title: "Mã",
      cellStyle: {
        padding: "0 10px",
      },
      headerStyle: {
        padding: "0 10px",
      },
    },
    {
      field: "name",
      title: "Tên",
    },
    {
      field: "description",
      title: "Mô tả",
    },
  ];

  const actions = [
    (rowData) => ({
      icon: "edit",
      tooltip: "Sửa quốc gia",
      onClick: (event, rowData) =>
        history.push(`/category/country/edit/${rowData.id}`),
    }),
    (rowData) => ({
      icon: "delete",
      tooltip: "Xóa",
      onClick: (event, rowData) => onOpenDelete(rowData.id),
    }),

    {
      icon: "add",
      tooltip: "Thêm quốc gia",
      isFreeAction: true,
      onClick: (event) => {
        history.push("/category/country/add");
      },
    },
  ];

  const pageSizeOption = [5, 10, 15, 20];

  const handleSelectList = (id) => {
    console.log(id);
  };

  const onOpenDelete = async (id) => {
    setOpenDelete(true);
    setIdDelete(id);
  };

  const handleDelete = async () => {
    try {
      if (!idDelete) throw new Error();
      await deleteCountry(idDelete);

      toast.success("Delete country successfully");
      setOpenDelete(false);
      setIdDelete(null);
    } catch (error) {
      alert("Delete country error");
    }
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
          data={countryStore.countryList}
          columns={columns}
          handleSelectList={handleSelectList}
          selection={false}
          totalPages={countryStore.totalPages}
          handleChangePage={countryStore.handleChangePage}
          setRowsPerPage={countryStore.handlePageSize}
          pageSize={countryStore.pageSize}
          pageSizeOption={pageSizeOption}
          totalElements={countryStore.totalElements}
          page={countryStore.page}
          actions={actions}
          title={"Quốc gia"}
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
          countryStore.handleDeleteCountryById(idDelete);
          setOpenDelete(false);
          setIdDelete(null);
        }}
      />
    </div>
  );
});
