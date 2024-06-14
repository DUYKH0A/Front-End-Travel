import { useState, useEffect, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "reactstrap";
import { BASE_URL } from "../../utils/config";
import moment from "moment-timezone";

export default function EditUserForm({ closeEvent, updateTourList, userId }) {
  console.log(userId)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobile: '',
        password: '',
        role: '',
      });

      useEffect(() => {
        const fetchTourData = async () => {
          try {
            const response = await fetch(`${BASE_URL}/users/${userId}`, {
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
      }, [userId]);

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

            const response = await fetch(`${BASE_URL}/users/${userId}`, {
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
        Edit User
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
            id="username"
            name="username"
            label="UserName"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={formData.username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="mobile"
            name="mobile"
            label="Số điện thoại"
            type="number"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={formData.mobile}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="role"
            name="role"
            label="Quyền"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={formData.role}
            onChange={handleChange}
          />
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
