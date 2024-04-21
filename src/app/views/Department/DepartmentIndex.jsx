import React, { useEffect, useState } from "react";
import { deleteDepartment, pagingAllDepartments } from "./DepartmentService";
import GlobitsTable from "app/common/GlobitsTable";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import { toast } from "react-toastify";

const DepartmentIndex = ({ history }) => {
  const [data, setData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  useEffect(() => {
    (async () => {
      let searchObject = {
        pageIndex: 1,
        pageSize: pageSize,
      };
      let data = await pagingAllDepartments(searchObject);
      setData(data.data.content);
      setTotalElements(data.data.totalElements);
      setTotalPages(data.data.totalPages);
      setPage(data.data.number + 1);
    })();
  }, [pageSize]);

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

  const handleChangePage = async (event, page) => {
    let searchObject = {
      pageIndex: page,
      pageSize: pageSize,
    };
    let data = await pagingAllDepartments(searchObject);
    setData(data);
    setPage(data.data.number + 1);
  };

  const handleSelectList = () => {};
  const handleDelete = async () => {
    try {
      try {
        if (!idDelete) throw new Error();
        await deleteDepartment(idDelete);
        setData((prev) => {
          return prev.filter((item) => item.id !== idDelete);
        });
        toast.success("Delete country successfully");
        setOpenDelete(false);
        setIdDelete(null);
      } catch (error) {
        toast.error("Delete country error");
      }
    } catch (error) {
      alert("Delete country error");
    }
  };
  return (
    <div>
      <div
        style={{
          padding: "20px 10px",
        }}
      >
        <GlobitsTable
          data={data}
          columns={columns}
          handleSelectList={handleSelectList}
          selection={false}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
          setRowsPerPage={setPageSize}
          pageSize={pageSize}
          pageSizeOption={pageSizeOption}
          totalElements={totalElements}
          page={page}
          maxHeight="600px"
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
};

export default DepartmentIndex;
