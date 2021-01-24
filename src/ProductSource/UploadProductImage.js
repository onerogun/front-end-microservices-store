import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export const UploadProductImage = ({ itemId, newItemSaved, rerender }) => {
  //Keep files in memory to between re-renders, access and set files with .current property
  const file = useRef([]);
  //To trigger re-render
  const [pics, setPics] = useState([]);
  //Convert files to images and store
  const savedPics = useRef([]);

  const onDrop = useCallback((acceptedFiles) => {
    file.current = acceptedFiles;
    console.log("file saved");

    /**
     * Each file needs a new FileReader for asynchronous converting.
     * After conversion destructure savedPics Ref and add newly converted image
     * change setPic to trigger re-render
     */
    file.current.forEach((eachfile) => {
      let reader = new FileReader();
      reader.readAsDataURL(eachfile);
      reader.onload = () => {
        savedPics.current = [...savedPics.current, reader.result];
        console.log(savedPics.current);
        setPics([reader.result]);
      };
    });

    // Do something with the files
  }, []);

  // When item saved to database and id retrieved, run Postfiles function
  useEffect(() => {
    //   console.log(itemId);
    if (file != null && itemId != null) {
      console.log(itemId + " not null");
      PostFiles(file.current, itemId);
    }
  }, [newItemSaved]);

  const PostFiles = (fileArray, itemId) => {
    console.log(itemId);
    fileArray.forEach((eachFileInArray) => {
      const formData = new FormData();
      formData.append("file", eachFileInArray);
      if (itemId != null) {
        axios
          .post(`http://localhost:9191/storage/save/${itemId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("file sent");

            rerender((prev) => [...prev, 1]);
          })
          .catch((err) => console.log(err));
        file.current = [];
        savedPics.current = [];
      }
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="container">
      <div className="row row-cols-3 carousel slide">
        {savedPics.current.map((p, index) => {
          return (
            <div className="col" key={index}>
              <div className="card">
                <div className="img-container">
                  <img alt="Product" className="card-img-top" src={p} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row row-cols-1 pb-2">
        <div className="position-relative p-5 bg-secondary" {...getRootProps()}>
          <input
            className="bg-primary p-5 stretched-link"
            {...getInputProps()}
          />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop product pictures here, or click to select files</p>
          )}
        </div>
      </div>
    </div>
  );
};
