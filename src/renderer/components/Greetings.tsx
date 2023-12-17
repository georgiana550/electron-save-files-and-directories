import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { extname, basename } from "path";
import { getLogoImage } from "./Utils";
import _ from "lodash";
import { grey, yellow } from "@mui/material/colors";
import styled from "styled-components";
import { FileData, ShortcutTypes } from "../../types";

const dropFileText = "Drop your files here";

const StyledListItem = styled(ListItem)`
  transition: background-color 0.2s;
  &:hover {
    background-color: ${grey[800]};
  }
`;

const StyledAvatar = styled(Avatar)`
   width: 20px, 
   height: 20px 
`;

const { ipcRenderer } = window.require("electron");

export const Greetings = () => {
  //filePaths of selectedFiles/selectedDirectories
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedDirectories, setSelectedDirectories] = useState<string[]>([]);
  const [logs, setLogs] = useState<any>();
  const [info, setInfo] = useState<string | undefined>();
  const [receivedData, setReceivedData] = useState<FileData>(); // Use the appropriate type for your data

  const handleInitial = async () => {
    try {
      const result = await ipcRenderer.invoke("read-initial-data");

      if (result) {
        setReceivedData(result);
      } else setReceivedData({ selectedDirectories: [], selectedFiles: [] });
    } catch (error) {
      setLogs(error);
    }
  };

  useEffect(() => {
    handleInitial();
  }, []);

  useEffect(() => {
    if (receivedData) {
      if (receivedData.selectedDirectories)
        setSelectedDirectories(receivedData.selectedDirectories);
      if (receivedData.selectedFiles)
        setSelectedFiles(receivedData.selectedFiles);
    }
  }, [receivedData]);

  useEffect(() => {
    if (selectedFiles.length > 0 || selectedDirectories.length > 0)
      ipcRenderer.send("save-data", { selectedFiles, selectedDirectories });
  }, [selectedFiles, selectedDirectories]);

  const handleDelete = (index: number, type: ShortcutTypes) => {
    if (type === ShortcutTypes.file) {
      selectedFiles.splice(index, 1);
      setSelectedFiles([...selectedFiles]);
    }

    if (type === ShortcutTypes.dir) {
      selectedDirectories.splice(index, 1);
      setSelectedDirectories([...selectedDirectories]);
    }
  };

  const handleOpen = async (type: ShortcutTypes) => {
    if (type === ShortcutTypes.file) {
      try {
        const result: Electron.OpenDialogReturnValue = await ipcRenderer.invoke(
          "open-file-dialog"
        );
        if (!result.canceled) {
          setSelectedFiles(_.uniq([...selectedFiles, result.filePaths[0]]));
        }
      } catch (error) {
        setLogs(error);
      }
    }

    if (type === ShortcutTypes.dir) {
      try {
        const result: Electron.OpenDialogReturnValue = await ipcRenderer.invoke(
          "open-directory-dialog"
        );
        if (!result.canceled) {
          setSelectedDirectories(
            _.uniq([...selectedDirectories, result.filePaths[0]])
          );
        }
      } catch (error) {
        setLogs(error);
      }
    }
  };

  const handleClick = (file: string) => {
    ipcRenderer.send("open-in-explorer", file);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    setInfo("Drop your files here");
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
    setInfo(undefined);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let directories: string[] = [];
    let files: string[] = [];
    Array.from(event.dataTransfer.files).forEach((file: any) => {
      const extension = extname(file.path);
      if (extension && ![".zip", ".exe"].includes(extension))
        files.push(file.path);
      else directories.push(file.path);
    });

    setSelectedFiles(_.uniq([...selectedFiles, ...files]));
    setSelectedDirectories(_.uniq([...selectedDirectories, ...directories]));

    setInfo(undefined);
  };

  return (
    <Container
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e: any) => handleDrop(e)}
      style={{
        height: "100vh",
        width: "100%",
        padding: "1rem",
      }}
    >
      <Grid
        container
        justifyContent={"space-between"}
        spacing={2}
        direction={"row"}
      >
        <Grid item>
          <Button
            onClick={() => handleOpen(ShortcutTypes.file)}
            style={{ border: "1px solid" }}
            color="primary"
            variant="contained"
          >
            Add shortcut file
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleOpen(ShortcutTypes.dir)}
            style={{ border: "1px solid", backgroundColor: yellow[200] }}
            variant="contained"
          >
            Add shortcut folder
          </Button>
        </Grid>
      </Grid>
      {info === dropFileText && (
        <Grid
          container
          style={{ cursor: "wait" }}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item>
            <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
              {info}
            </Typography>
          </Grid>
          <Grid item>
            <CircularProgress size={100} color="inherit" />
          </Grid>
        </Grid>
      )}
      {info !== dropFileText && (
        <Grid
          container
          justifyContent={"center"}
          columns={3}
          spacing={3}
          marginTop="2rem"
        >
          <Grid width={"48%"} item>
            {!info && selectedFiles.length > 0 && (
              <Grid item>
                <Tooltip title={"Click on file to open"}>
                  <Typography
                    style={{
                      cursor: "context-menu",
                      color: "black",
                      borderRadius: "5px",
                      background: `linear-gradient(to right, white, #5F9EA0)`,
                      padding: "6px",
                    }}
                  >
                    Selected files:
                  </Typography>
                </Tooltip>
              </Grid>
            )}
            {!info &&
              selectedFiles.map((file, index) => (
                <List key={index} style={{ cursor: "pointer" }} dense>
                  <StyledListItem
                    secondaryAction={
                      <IconButton
                        onClick={() => handleDelete(index, ShortcutTypes.file)}
                        edge="end"
                        aria-label="delete"
                      >
                        <Delete sx={{ color: grey[400] }} />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <StyledAvatar
                        onClick={() => handleClick(file)}
                        variant="square"
                        style={{ alignSelf: "flex-end" }}
                        src={getLogoImage(extname(file)) || " "}
                        alt="not found"
                      />
                    </ListItemAvatar>
                    <Tooltip
                      title={"Click to open in explorer (the file won`t open)"}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            align="left"
                            onClick={() => handleClick(file)}
                            sx={{
                              mt: 2,
                              overflowWrap: "break-word",
                              color: grey[400],
                            }}
                          >
                            {basename(file)}
                          </Typography>
                        }
                      />
                    </Tooltip>
                  </StyledListItem>
                </List>
              ))}
          </Grid>
          <Grid item>
            <Divider
              style={{
                backgroundColor: grey[400],
              }}
              orientation="vertical"
            />
          </Grid>
          <Grid width={"48%"} item>
            {!info && selectedDirectories.length > 0 && (
              <Tooltip title={"Click on directories to open"}>
                <Typography
                  style={{
                    cursor: "context-menu",
                    color: "black",
                    borderRadius: "5px",
                    background: `linear-gradient(to right, white, #DAA520)`,
                    padding: "6px",
                  }}
                >
                  Selected directories:
                </Typography>
              </Tooltip>
            )}
            {!info &&
              selectedDirectories.map((dir, index) => {
                const extension = extname(dir);

                return (
                  <List style={{ cursor: "pointer" }} dense>
                    <StyledListItem
                      secondaryAction={
                        <IconButton
                          onClick={() => handleDelete(index, ShortcutTypes.dir)}
                          edge="end"
                          aria-label="delete"
                        >
                          <Delete sx={{ color: grey[400] }} />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <StyledAvatar
                          onClick={() => handleClick(dir)}
                          variant="square"
                          style={{ alignSelf: "flex-end" }}
                          src={
                            extension && [".zip", ".exe"].includes(extension)
                              ? getLogoImage(extension)
                              : getLogoImage(".directory")
                          }
                          alt="not found"
                        />
                      </ListItemAvatar>
                      <Tooltip
                        title={
                          "Click to open in explorer (the file won`t open)"
                        }
                      >
                        <ListItemText
                          primary={
                            <Typography
                              onClick={() => handleClick(dir)}
                              variant="body2"
                              align="left"
                              sx={{
                                mt: 2,
                                overflowWrap: "break-word",
                                color: grey[400],
                              }}
                            >
                              {basename(dir)}
                            </Typography>
                          }
                        />
                      </Tooltip>
                    </StyledListItem>
                  </List>
                );
              })}
          </Grid>
        </Grid>
      )}
      {logs && (
        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          ! Logs: {logs}
        </Typography>
      )}
    </Container>
  );
};

export default Greetings;
