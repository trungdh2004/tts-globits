import { makeStyles } from "@material-ui/core";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import { format } from "date-fns";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { getProjectAll } from "./TimeSheetService";
import GlobitsTable from "app/common/GlobitsTable";
import SideProject from "./components/SideProject";
import { useStore } from "app/stores";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 20px",
    display: "grid",
    gridTemplateColumns: "2fr 10fr",
    gap: "10px",
    width: "100%",
    flex: "1",
    height: "580px",
  },

  boxProject: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    scrollbarWidth: "5px",
  },
  boxTable: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
  },
}));
const priorityList = [
  {
    value: "1",
    name: "Thấp",
    bg: "#9ACD32",
  },
  {
    value: "2",
    name: "Trung bình",
    bg: "#FFD700",
  },
  {
    value: "3",
    name: "Cao ",
    bg: "#FFA500",
  },
  {
    value: "4",
    name: "Cấp bách",
    bg: "#FF0000",
  },
];

const TimeSheetIndex = observer(({ history }) => {
  const { timeSheetStore } = useStore();
  const classes = useStyles();
  const [project, setProject] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [projectAction, setProjectAction] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await getProjectAll();
      setListProject(data.content);
      setProject(data.content);
    })();
  }, []);

  useEffect(() => {
    if (!projectAction) {
      (async () => {
        await timeSheetStore.handleTimeSheetInitial();
      })();
      return;
    } else {
      (async () => {
        await timeSheetStore.handleTimeSheetByProjectId(projectAction);
      })();
      return;
    }
  }, [projectAction]);

  const columns = [
    {
      field: "details",
      title: "Công việc",
      cellStyle: {
        padding: "0 10px",
      },
      headerStyle: {
        padding: "0 10px",
      },
      render: (rowData) => {
        const text = rowData.details
          .map((item) => item.workingItemTitle)
          .join(",");
        return (
          <span
            style={{
              fontWeight: "500",
            }}
          >
            {text}
          </span>
        );
      },
    },
    {
      field: "date",
      title: "Thời gian ",
      render: (rowData) => {
        const date = format(new Date(rowData.workingDate), "yyyy-MM-dd");
        return (
          <ul
            style={{
              padding: 0,
            }}
          >
            <li>
              Thời gian bắt đầu :{" "}
              <span
                style={{
                  color: "#01c0c8",
                }}
              >{`${rowData.startTime} ${date}`}</span>
            </li>
            <li>
              Thời gian kêt thúc :{" "}
              <span
                style={{
                  color: "#01c0c8",
                }}
              >{`${rowData.endTime} ${date}`}</span>
            </li>
            <li>
              Tổng :{" "}
              <span
                style={{
                  color: "#01c0c8",
                }}
              >
                {rowData.endTime - rowData.startTime}
              </span>
            </li>
          </ul>
        );
      },
    },
    {
      field: "priority",
      title: "Ưu tiên",

      render: (rowData) => {
        const priority = priorityList.find(
          (item) => item.value == rowData.priority
        );

        return (
          <span
            style={{
              padding: "5px 10px",
              backgroundColor: priority.bg,
              borderRadius: "5px",
            }}
          >
            {priority.name}
          </span>
        );
      },
    },
    {
      field: "staff",
      title: "Người thực hiện",
      render: (rowData) => {
        const staff = rowData.details.map((item) => item.employee.displayName);
        return (
          <ul
            style={{
              padding: 0,
            }}
          >
            {Array.from(new Set(staff)).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      },
    },
  ];

  const actions = [
    (rowData) => ({
      icon: "edit",
      tooltip: "Sửa",
      onClick: (event, rowData) =>
        history.push(`/category/timeSheet/edit/${rowData.id}`),
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
        history.push("/category/timeSheet/add");
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

  const handleProjectAction = async (id) => {
    setProjectAction(id);
    timeSheetStore.projectId = id;
  };

  const handleSearch = (value) => {
    if (!value) {
      setListProject(project);
      return;
    }
    const searchProject = project.filter((item) => {
      const projectName = removeAccent(item.project.toLowerCase());
      const valueSearch = removeAccent(value.toLowerCase());
      return projectName.includes(valueSearch);
    });
    setListProject(searchProject);
  };

  const handleChangePage = () => {};

  return (
    <div className={classes.root}>
      <SideProject
        classes={classes}
        setProjectAction={setProjectAction}
        handleSearch={handleSearch}
        setListProject={setListProject}
        listProject={listProject}
        projectAction={projectAction}
        handleProjectAction={handleProjectAction}
      />

      <div className={classes.boxTable}>
        <div>
          <GlobitsTable
            data={timeSheetStore.timeSheet}
            columns={columns}
            handleSelectList={handleSelectList}
            selection={false}
            totalPages={timeSheetStore.totalPages}
            handleChangePage={timeSheetStore.handleChangePage}
            setRowsPerPage={timeSheetStore.handlePageSize}
            pageSize={timeSheetStore.pageSize}
            pageSizeOption={pageSizeOption}
            totalElements={timeSheetStore.totalElements}
            page={timeSheetStore.page}
            actions={actions}
            title="Danh sách thời gian"
            isNotSearch
          />
        </div>
        {idDelete}

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
            timeSheetStore.handleDeleteById(idDelete);
            setOpenDelete(false);
            setIdDelete(null);
          }}
        />
      </div>
    </div>
  );
});

export default TimeSheetIndex;

function removeAccent(inputString) {
  var diacriticsMap = {
    á: "a",
    à: "a",
    ả: "a",
    ã: "a",
    ạ: "a",
    ă: "a",
    ắ: "a",
    ằ: "a",
    ẳ: "a",
    ẵ: "a",
    ặ: "a",
    â: "a",
    ấ: "a",
    ầ: "a",
    ẩ: "a",
    ẫ: "a",
    ậ: "a",
    đ: "d",
    é: "e",
    è: "e",
    ẻ: "e",
    ẽ: "e",
    ẹ: "e",
    ê: "e",
    ế: "e",
    ề: "e",
    ể: "e",
    ễ: "e",
    ệ: "e",
    í: "i",
    ì: "i",
    ỉ: "i",
    ĩ: "i",
    ị: "i",
    ó: "o",
    ò: "o",
    ỏ: "o",
    õ: "o",
    ọ: "o",
    ô: "o",
    ố: "o",
    ồ: "o",
    ổ: "o",
    ỗ: "o",
    ộ: "o",
    ơ: "o",
    ớ: "o",
    ờ: "o",
    ở: "o",
    ỡ: "o",
    ợ: "o",
    ú: "u",
    ù: "u",
    ủ: "u",
    ũ: "u",
    ụ: "u",
    ư: "u",
    ứ: "u",
    ừ: "u",
    ử: "u",
    ữ: "u",
    ự: "u",
    ý: "y",
    ỳ: "y",
    ỷ: "y",
    ỹ: "y",
    ỵ: "y",
  };

  return inputString.replace(/[^\x00-\x7F]/g, function (char) {
    return diacriticsMap[char] || char;
  });
}
