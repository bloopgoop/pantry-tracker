"use client";

import React, { useState, useRef } from "react";
import { Camera, CameraType } from "react-camera-pro";
import Box from "@mui/material/Box";
import Image from "next/image";
import Button from "@mui/material/Button";
import "./styles.css";

function CameraComponent({
  closeCamera,
}: {
  closeCamera: () => void;
}) {
  const camera = useRef(null);
  const [image, setImage] = useState("");
  const [numberOfCameras, setNumberOfCameras] = useState(0);

  return (
    <Box className="wrapper">
      <Camera
        ref={camera}
        aspectRatio="cover"
        numberOfCamerasCallback={setNumberOfCameras}
        errorMessages={{
          noCameraAccessible: "No camera device accessible.",
          permissionDenied: "Camera permission denied.",
          switchCamera: "Switch camera failed.",
          canvas: "Canvas error.",
        }}
      />
      <Box className="control">
        <Button
          className="close-camera-button"
          onClick={closeCamera}
        >
          Close Camera
        </Button>

        <Image
          src={image || "/headphonePlush.jpg"}
          alt="cam"
          className="image-preview"
          width={500}
          height={500}
        />
        <Button
          className="take-photo-button"
          onClick={() => {
            if (camera.current) {
              const photo = camera.current.takePhoto();
              // console.log(photo);
              setImage(photo);
            }
          }}
        />
        <Button
          className="change-facing-camera-button"
          disabled={numberOfCameras <= 1}
          onClick={() => {
            if (camera.current) {
              const result = camera.current.switchCamera();
              // console.log(result);
            }
          }}
        />
      </Box>
    </Box>
  );
}

export { CameraComponent };
