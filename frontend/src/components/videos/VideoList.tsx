import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import Cable from "actioncable";

import { Video, Notification } from "../../types/index";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2, // number of lines to display
    WebkitBoxOrient: "vertical",
  },
});

const VideoList: React.FC = () => {
  const classes = useStyles();
  const [list, setList] = useState<Video[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (user) {
      const cable = Cable.createConsumer(
        process.env.REACT_APP_CABLE_ENDPOINT || ""
      );
      cable.subscriptions.create("NotificationsChannel", {
        received: async (data: Notification) => {
          setList((prevList: Video[]) => [data.notification, ...prevList]);
          if (data.notification.user.id !== user.id) {
            toast.success(
              `New video ${data.notification.title} shared by ${data.notification.user.username}`
            );
          }
        },
      });
    }
  }, [user]);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/videos?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.list.length === 0) {
        setHasMore(false);
      } else {
        setList((prevList: Video[]) => [...prevList, ...data.list]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const formatDescription = (description: string) => {
    return description
      .split("\n")
      .slice(0, 5)
      .map((paragraph, index) => (
        <Typography key={index} variant="body1" className={classes.text}>
          {paragraph}
        </Typography>
      ));
  };

  return (
    <Container maxWidth="md">
      {list.length > 0 ? (
        <InfiniteScroll
          dataLength={list.length}
          next={fetchVideos}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <List>
            {list.map((video: any) => (
              <ListItem key={video.id}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <ListItemAvatar
                      style={{
                        position: "relative",
                        paddingBottom: "56.25%",
                        height: 0,
                      }}
                    >
                      <iframe
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                        src={video.embed_url}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </ListItemAvatar>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      style={{ color: "red" }}
                      variant="h6"
                      className={classes.text}
                    >
                      {video.title}
                    </Typography>
                    <Typography variant="subtitle1">
                      Shared by {video.user.username}:
                    </Typography>
                    <Typography variant="h6">Description:</Typography>
                    {formatDescription(video.description)}
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </InfiniteScroll>
      ) : (
        <Typography variant="body1">No videos shared yet.</Typography>
      )}
    </Container>
  );
};

export default VideoList;
