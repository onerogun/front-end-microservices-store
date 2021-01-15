import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export const UploadProductImage = ({ itemId }) => {
  //Keep files in memory to between re-renders, access and set files with .current property
  const file = useRef([]);

  const onDrop = useCallback((acceptedFiles) => {
    file.current = acceptedFiles;
    console.log("file saved");
    // Do something with the files
  }, []);

  // When item saved to database and id retrieved, run Postfiles function
  useEffect(() => {
    //   console.log(itemId);
    if (file != null && itemId != null) {
      console.log(itemId + " not null");
      PostFiles(file.current, itemId);
    }
  }, [itemId]);

  const PostFiles = (fileArray, itemId) => {
    console.log(itemId);
    const formData = new FormData();
    formData.append("file", fileArray[0]);
    if (itemId != null) {
      axios
        .post(`http://localhost:9191/storage/save/${itemId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log("file sent"))
        .catch((err) => console.log(err));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="position-relative p-5 bg-secondary" {...getRootProps()}>
      <input className="bg-primary p-5 stretched-link" {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop product pictures here, or click to select files</p>
      )}
    </div>
  );
};
