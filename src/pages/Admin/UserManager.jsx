/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import ManagerTour from "../../components/Navbar/ManagerTour";
import Admin from "../../components/Navbar/Admin";
import Navbar from "../../components/Navbar/Navbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../utils/config";
import Button from "@mui/material/Button";
import { AuthContext } from "../../context/AuthContext";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Swal from "sweetalert2";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function UserManager() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]); // Sử dụng mảng rỗng làm giá trị khởi tạo
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editopen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const handleEditOpen = (userId) => {
    console.log(userId);
    setSelectedUser(userId);
    console.log(setSelectedUser);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Response data:", data);
      setUsers(data.data || []); // Đảm bảo rằng bookings luôn là mảng
    } catch (error) {
      console.error("Failed to fetch profile data", error);
      setUsers([]); // Đảm bảo rằng bookings luôn là mảng ngay cả khi có lỗi
    }
  };
  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const updateUserList = () => {
    fetchProfile(); // Hoặc bất kỳ hàm nào để cập nhật danh sách tour
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.value) {
        try {
          const res = await fetch(`${BASE_URL}/users/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          console.log(id);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          // Xóa user đã xóa khỏi trạng thái
          fetchProfile();
          //setUsers(users.filter((tour) => tour._id !== id));
          Swal.fire("Đã xóa!", "User đã được xóa.", "success");
        } catch (error) {
          console.error("Failed to delete tour", error);
          Swal.fire("Lỗi!", "Không thể xóa user.", "error");
        }
      }
    });
  };
  const filterData = (v) => {
    if (v) {
      setUsers([v]);
    } else {
      fetchProfile();
    }
  };
  return (
    <>
      <Navbar />
      <Box height={40} />
      <Box sx={{ display: "flex" }}>
          <Admin />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* <ShowTour/> */}
          <div>
            <Modal
              open={open}
              //onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <AddUserForm closeEvent={handleClose} updateUserList={updateUserList} />
              </Box>
            </Modal>
            <Modal
              open={editopen}
              //onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <EditUserForm closeEvent={handleEditClose} updateUserList={updateUserList} userId={selectedUser} />
              </Box>
            </Modal>
          </div>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ padding: "20px" }}
            >
              Quản Lý Tài Khoản
            </Typography>
            <Divider />

            <Box height={10} />
            <Stack direction="row" spacing={2} className="my-2 mb-2">
              <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={users}
              sx={{ width: 300 }}
               onChange={(e, v) => filterData(v)}
              getOptionLabel={(users) => users.username || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Tìm kiếm tài khoản" />
              )}
            />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
              <Button
                variant="contained"
                endIcon={<AddCircleIcon />}
                onClick={handleOpen}
              >
                Add
              </Button>
            </Stack>
            <Box height={10} />

            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow key="rowww">
                    <TableCell align="left" style={{ minWidth: "100px" }} key="title">
                      UserName
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }} key="place-of-departure">
                      Email
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }} key="departure-date">
                      Số điện thoại
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }} key="remaining-seats">
                      Role
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }} key="actions">
                      Chức năng
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1}>
                          <TableCell key={user.id} align="left">
                            {user.username}
                          </TableCell>
                          <TableCell key={user.id} align="left">
                            {user.email}
                          </TableCell>
                          <TableCell key={user.id} align="left">
                            {user.mobile}
                          </TableCell>
                          <TableCell key={user.id} align="left">
                            {user.role}
                          </TableCell>
                          <TableCell align="left">
                            <Stack spacing={2} direction="row">
                              <EditIcon
                                style={{
                                  fontSize: "20px",
                                  color: "blue",
                                  cursor: "pointer",
                                }}
                                className="cursor-pointer"
                                onClick={() => handleEditOpen(user._id)}
                              />
                              <DeleteIcon
                                style={{
                                  fontSize: "20px",
                                  color: "darkred",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  deleteUser(user._id);
                                }}
                              />
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
}
