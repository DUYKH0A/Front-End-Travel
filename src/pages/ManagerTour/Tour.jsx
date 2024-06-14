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
import AddTourForm from "./Tour/AddTourForm";
import EditTourForm from "./Tour/EditTourForm";
import moment from 'moment';
import 'moment/locale/vi'; // Import Vietnamese locale

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
export default function Tour() {
  const { user } = useContext(AuthContext);
  const [tours, setTours] = useState([]); // Sử dụng mảng rỗng làm giá trị khởi tạo
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date()); // Lấy thời gian hiện tại

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = (tourId) => {
    console.log("tourid",tourId);
    setSelectedTour(tourId);
  
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${BASE_URL}/tours`, {
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
      setTours(data.data || []); // Đảm bảo rằng bookings luôn là mảng
    } catch (error) {
      console.error("Failed to fetch profile data", error);
      setTours([]); // Đảm bảo rằng bookings luôn là mảng ngay cả khi có lỗi
    }
  };
  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  //const itineraryDays = tours?.itinerary?.map((day) => day.day) || [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const updateTourList = () => {
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
          const res = await fetch(`${BASE_URL}/tours/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          // Xóa tour đã xóa khỏi trạng thái
          fetchProfile();
          //setTours(tours.filter((tour) => tour._id !== id));
          Swal.fire("Đã xóa!", "Tour đã được xóa.", "success");
        } catch (error) {
          console.error("Failed to delete tour", error);
          Swal.fire("Lỗi!", "Không thể xóa tour.", "error");
        }
      }
    });
  };
  const filterData = (v) => {
    if (v) {
      setTours([v]);
    } else {
      fetchProfile();
    }
  };

  const isAdmin = () => {
  
    return user && user.role.toLowerCase() === "admin";
  };
  const isManager = () => {

  

    return user && user.role.toLowerCase() === "tourmanager";
  };
  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('HH:mm DD/MM/YYYY');
  }
  const isTourValid = (tour) => {
    // Lấy thời gian khởi hành của tour
    const tourDepartureTime = new Date(tour.departureDate);
    // Tính thời gian cách thời gian hiện tại
    const timeDiff = tourDepartureTime.getTime() - currentTime.getTime();
    // Chuyển đổi thời gian thành đơn vị ngày
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    // Kiểm tra xem tour có cách thời gian hiện tại ít nhất 2 ngày và còn chỗ để đặt tour không
    return daysDiff >= 2 && tour.maxGroupSize - tour.numberOfBookings > 0;
  };
const validTours = tours.filter(isTourValid); // Lọc ra các tour hợp lệ
const validToursLength = validTours.length; // Độ dài của mảng sau khi lọc
  return (
    <>
      <Navbar />
      <Box height={40} />
      <Box sx={{ display: "flex" }}>
        {isAdmin() && (
          <>
            <Admin />
          </>
        )}
        {isManager() && (
          <>
            <ManagerTour />
          </>
        )}

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
                <AddTourForm
                  closeEvent={handleClose}
                  updateTourList={updateTourList}
                />
              </Box>
            </Modal>
            <Modal
              open={editopen}
              //onClose={handleEditClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <EditTourForm
                  closeEvent={handleEditClose}
                  updateTourList={updateTourList}
                  tourId={selectedTour}  // truyền dữ liệu của tour vào form

                />
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
              Quản Lý Tours
            </Typography>
            <Divider />

            <Box height={10} />
            <Stack direction="row" spacing={2} className="my-2 mb-2">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={tours}
                sx={{ width: 300 }}
                onChange={(e, v) => filterData(v)}
                getOptionLabel={(tours) => tours.tieude || ""}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Search Products" />
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
                    <TableCell
                      align="left"
                      style={{ minWidth: "100px" }}
                      key="title"
                    >
                      Tiêu đề
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ minWidth: "100px" }}
                      key="place-of-departure"
                    >
                      Nơi khởi hành
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ minWidth: "100px" }}
                      key="departure-date"
                    >
                      Thời gian khởi hành
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ minWidth: "100px" }}
                      key="remaining-seats"
                    >
                      Số chổ còn nhận
                    </TableCell>
                    
                    <TableCell
                      align="left"
                      style={{ minWidth: "100px" }}
                      key="actions"
                    >
                      Chức năng
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tours
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((tour) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1}>
                          <TableCell key={tour.id} align="left">
                            {tour.tieude}
                          </TableCell>
                          <TableCell key={tour.id} align="left">
                            {tour.Placeofdeparture}
                          </TableCell>
                          <TableCell key={tour.id} align="left">
                          {formatDateTime(tour.departureDate)}
                          </TableCell>
                          <TableCell key={tour.id} align="left">
                            {tour.maxGroupSize - tour.numberOfBookings}
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
                                onClick={() => handleEditOpen(tour._id)}
                                />
                              <DeleteIcon
                                style={{
                                  fontSize: "20px",
                                  color: "darkred",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  deleteUser(tour._id);
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
              count={tours.length}
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
