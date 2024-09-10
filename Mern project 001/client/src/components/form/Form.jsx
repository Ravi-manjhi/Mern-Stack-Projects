import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { usePostContext } from "../../context/postContext.js";
import "./style.css";

function Form() {
  const {
    initalValue,
    setCurrentId,
    message,
    formData,
    setFormData,
    handleSubmit,
    handleChange,
    user,
  } = usePostContext();

  if (!user?.result?.name) {
    return (
      <Paper className="paper">
        <Typography variant="h6" align="center">
          Please Login to create Your own Posts and like other's posts
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className="paper">
      <form autoComplete="off" className="form" onSubmit={handleSubmit}>
        <Typography variant="h6">Create a Post</Typography>
        {/* <TextField
          name="creator"
          label="Creator"
          fullWidth
          required
          value={formData.creator}
          onChange={handleChange}
        /> */}
        <TextField
          name="title"
          label="Title"
          fullWidth
          required
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          name="message"
          label="Message"
          fullWidth
          required
          value={formData.message}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          label="Tags"
          fullWidth
          value={formData.tags}
          onChange={handleChange}
        />
        <div className="fileInput">
          <FileBase
            type="file"
            multiple={false}
            required
            onDone={({ base64 }) => {
              setFormData({ ...formData, selectedFile: base64 });
            }}
          />
        </div>
        <Typography variant="p" className="field_alert">
          {message}
        </Typography>
        <Button fullWidth variant="contained" color="success" type="submit">
          Submit
        </Button>
        <Button
          className="clear_btn"
          variant="contained"
          color="error"
          fullWidth
          onClick={() => {
            setFormData(initalValue);
            setCurrentId(null);
          }}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
