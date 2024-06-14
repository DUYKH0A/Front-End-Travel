import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "reactstrap";
import { BASE_URL, REACT_APP_UPLOAD_ASSETS_NAME } from "../../../utils/config";
import moment from "moment-timezone";
import { apiUploadImages } from "../../../context/uploadAPI";
import resizer from "react-image-file-resizer"
export default function AddTourForm({ closeEvent, updateTourList }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: user && user._id,
    tieude: "",
    transport: "",
    hotel: "",
    departureDate: "",
    Placeofdeparture: "",
    photo: [],
    price: "",
    maxGroupSize: "",
    desc: "",
    itinerary: [{ day: 1, activities: [{ activity: "", description: "" }] }],
  });

  // Xử lý khi người dùng chọn ảnh
  // const handlePhotoSelect = (event) => {};
  const resizeFile = (file) => new Promise(resolve => {
    resizer.imageFileResizer(file, 1000, 666, 'JPEG', 100, 0,
    uri => {
      resolve(uri);
    }, 'base64' );
    });
  let handleFile = async (e) => {
    console.log("jdahahj", e.target.files)
    setIsLoading(true);
    e.stopPropagation();
    let files = e.target.files;
     //console.log("file",files)
    // const imagerisize = await resizeFile(files);
    // console.log("imagesresize",imagerisize)

    let images = [];
    let formData = new FormData();
    for (let i of files) {
        formData.append('file', i);
        formData.append('upload_preset', REACT_APP_UPLOAD_ASSETS_NAME);
        let response = await apiUploadImages(formData);
        if (response.status === 200) {
            images = [...images, response.data?.secure_url];
        }
        
    }
    setFormData((prev) => ({ ...prev, photo: [...prev.photo, ...images] }));
    console.log("image upload",images)
    console.log("setform",setFormData)
    setIsLoading(false);
};
  console.log(formData)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItineraryChange = (e, index, activityIndex) => {
    const newItinerary = [...formData.itinerary];

    if (e.target.name.startsWith("day")) {
      newItinerary[index].day = e.target.value;
    } else {
      newItinerary[index].activities[activityIndex][e.target.name] =
        e.target.value;
      console.log(e.target.value);
    }
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const addDay = () => {
    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        {
          day: formData.itinerary.length + 1,
          activities: [{ activity: "", description: "" }],
        },
      ],
    });
  };

  const addActivity = (index) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index].activities.push({ activity: "", description: "" });
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const handleSubmit = async () => {
    const formattedData = {
      ...formData,
        departureDate: moment.tz(formData.departureDate, 'Asia/Ho_Chi_Minh').utc().format()
    };

    console.log(formattedData);
    try {
      console.log(formattedData);

      const response = await fetch(`${BASE_URL}/tours`, {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Tour created successfully:", data);
      updateTourList();

      closeEvent(); // Đóng form sau khi gửi thành công
    } catch (error) {
      console.log(formData);

      console.error("There was an error creating the tour!", error);
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Add Tour
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
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Ảnh </Typography>

          <input
            id="photo"
            name="photo"
            label="Ảnh"
            variant="outlined"
            size="small"
            type="file"
            sx={{ minWidth: "100%" }}
            inputProps={{ accept: "image/*" }}
            onChange={handleFile}
            multiple
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
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Lịch trình</Typography>
          {formData.itinerary.map((day, index) => (
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
                    onChange={(e) =>
                      handleItineraryChange(e, index, activityIndex)
                    }
                    value={activity.activity}
                  />
                  <TextField
                    id={`description-${index}-${activityIndex}`}
                    name="description"
                    label="Mô tả"
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: "100%" }}
                    onChange={(e) =>
                      handleItineraryChange(e, index, activityIndex)
                    }
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