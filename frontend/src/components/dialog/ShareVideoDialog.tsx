import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import authService from "../../services/authService";

const useStyles = makeStyles({
  dialog: {
    minWidth: "480px",
  },
});

const ShareVideoDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors([]);
  };

  async function isValidYouTubeUrl(url: string) {
    const apiUrl = `https://noembed.com/embed?url=${encodeURIComponent(url)}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data.error) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  const handleShareVideo = async (event: React.FormEvent) => {
    event.preventDefault();

    if (await isValidYouTubeUrl(youtubeUrl)) {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        "Authentication-Token": authService.getJwt() || "",
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/videos`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          video: {
            url: youtubeUrl,
          },
        }),
      });
      await response.json();

      toast.success("Video shared successfully!");
      handleClose();
    } else {
      setErrors(["Url is not a valid youtube video"]);
    }
  };

  return (
    <>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Share video
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ className: classes.dialog }}
      >
        <DialogTitle>Share video</DialogTitle>
        <DialogContent>
          {errors.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
          <TextField
            autoFocus
            margin="dense"
            label="Youtube url"
            type="text"
            fullWidth
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleShareVideo} color="primary">
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShareVideoDialog;
