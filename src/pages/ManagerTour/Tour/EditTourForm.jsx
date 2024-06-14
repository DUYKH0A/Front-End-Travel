import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "reactstrap";
import { BASE_URL } from "../../../utils/config";
import moment from "moment-timezone";

export default function EditTourForm({ closeEvent, updateTourList, tourId }) {
  console.log(tourId)
    const {user} = useContext(AuthContext)
    const [formData, setFormData] = useState({
        userId: user && user._id,
        tieude: '',
        transport: '',
        hotel: '',
        departureDate: '',
        Placeofdeparture: '',
        photo: '',
        price: '',
        maxGroupSize: '',
        numberOfBookings: '',
        desc: '',
        itinerary: [],
      });

      useEffect(() => {
        const fetchTourData = async () => {
          try {
            const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            });
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data)
            
            setFormData(data.data);

          } catch (error) {
            console.error("Failed to fetch tour data", error);
          }
        };
    
        fetchTourData();
      }, [tourId]);

    const handleChange = (e) => { 
      console.log("aa")

        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleItineraryChange = (e, index, activityIndex) => {
        const newItinerary = [...formData.itinerary];
        if (e.target.name.startsWith("day")) {
          newItinerary[index].day = e.target.value;
        } else {
          newItinerary[index].activities[activityIndex][e.target.name] = e.target.value;
        }
        setFormData({ ...formData, itinerary: newItinerary });
      };
    
      const addDay = () => {
        console.log("aa")

        setFormData({
          ...formData,
          itinerary: [...formData.itinerary, { day: formData.itinerary.length + 1, activities: [{ activity: '', description: '' }] }],
        });
      };
    
      const addActivity = (index) => {
        console.log("aa")

        const newItinerary = [...formData.itinerary];
        newItinerary[index].activities.push({ activity: '', description: '' });
        setFormData({ ...formData, itinerary: newItinerary });
      };
    
      const  handleSubmit = async ()  => {
        console.log("aa")

        const formattedData = {
          ...formData,
            departureDate: moment.tz(formData.departureDate, 'Asia/Ho_Chi_Minh').utc().format()
        };
        console.log(formattedData);

        console.log(formData);
        try {
          console.log(formData);

            const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
              method:"PUT",
              headers: {
                'Content-Type': 'application/json'
              },
              credentials:'include',
              body: JSON.stringify(formattedData)
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const data = await response.json();
            console.log('Tour created successfully:', data);
            updateTourList();

            closeEvent(); // Đóng form sau khi gửi thành công
          } catch (error) {
            console.log(formData);

            console.error('There was an error creating the tour!', error);
          }
        };

  return (
    <>
    
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Edit Tour
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton> 
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="tieude"
            name="tieude"
            label="Tiêu đề"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={formData.tieude}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="transport"
            name="transport"
            label="Phương tiện di chuyển"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={formData.transport}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="hotel"
            name="hotel"
            label="Khách sạn"
            type="number"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={formData.hotel}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="Placeofdeparture"
            name="Placeofdeparture"
            label="Nơi khởi hành"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={formData.Placeofdeparture}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="departureDate"
            name="departureDate"
            label="Thời gian khởi hành"
            variant="outlined"
            type="datetime-local"
            size="small"
            sx={{ minWidth: "100%" }}
            InputLabelProps={{
              shrink: true,
            }}
            value={moment(formData.departureDate).format("YYYY-MM-DDTHH:mm")}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="photo"
            name="photo"
            label="Ảnh"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={formData.photo}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="price"
            name="price"
            label="Giá tiền"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={formData.price}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="maxGroupSize"
            name="maxGroupSize"
            label="Số chỗ"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={formData.maxGroupSize}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="numberOfBookings"
            name="numberOfBookings"
            label="Số người đã đặt"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={formData.numberOfBookings}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="desc"
            name="desc"
            label="Chi tiết"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={formData.desc}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Lịch trình</Typography>
          {formData.itinerary && formData.itinerary.map((day, index) => (
            <Box key={index} mb={2}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Ngày {index + 1}
              </Typography>
              {day.activities.map((activity, activityIndex) => (
                <Box key={activityIndex} mb={1}>
                  <TextField
                    id={`activity-${index}-${activityIndex}`}
                    name="activity"
                    label="Hoạt động"
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: "100%", mb: 1 }}
                    onChange={(e) => handleItineraryChange(e, index, activityIndex)}
                    value={activity.activity}
                  />
                  <TextField
                    id={`description-${index}-${activityIndex}`}
                    name="description"
                    label="Mô tả"
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: "100%" }}
                    onChange={(e) => handleItineraryChange(e, index, activityIndex)}
                    value={activity.description}
                  />
                </Box>
              ))}
              <Button variant="contained" onClick={() => addActivity(index)}>
                Thêm Hoạt Động
              </Button>
            </Box>
          ))}
          <Button variant="contained" onClick={addDay}>
            Thêm Ngày
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="container" onClick={handleSubmit}>
            Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
