"use client";

import { useState, createContext, useRef, useContext } from "react";
import { Camera, CameraType } from "react-camera-pro";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "@/components/styles.css";

export const CameraContext = createContext<{
  cameraOpen: boolean;
  setCameraOpen: React.Dispatch<React.SetStateAction<boolean>>;
  image: string | ImageData;
  setImage: React.Dispatch<React.SetStateAction<string | ImageData>>;
}>({
  cameraOpen: false,
  setCameraOpen: () => {},
  image: "",
  setImage: () => {},
});

export function CameraProvider({ children }: { children: React.ReactNode }) {
  const camera = useRef<CameraType>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [image, setImage] = useState<string | ImageData>("");
  const [numberOfCameras, setNumberOfCameras] = useState(0);

  return (
    <CameraContext.Provider
      value={{ cameraOpen, setCameraOpen, image, setImage }}
    >
      {cameraOpen && (
        <Box
          sx={{
            zIndex: 1000,
          }}
        >
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
          <Box
            sx={{
              width: "100%",
              position: "absolute",
              padding: 4,
              bottom: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              className="close-camera-button"
              variant="contained"
              onClick={() => {
                setCameraOpen(false);
              }}
            >
              Close Camera
            </Button>
            {/* <Image
              src={image || "/headphonePlush.jpg"}
              alt="cam"
              className="image-preview"
              width={500}
              height={500}
            /> */}
            <Button
              variant="contained"
              disabled={numberOfCameras <= 1}
              onClick={() => {
                if (camera.current) {
                  const result = camera.current.switchCamera();
                  // console.log(result);
                }
              }}
            >
              Flip Camera
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (camera.current) {
                  const photo = camera.current.takePhoto();
                  // console.log(photo);
                  setImage(photo);
                  setCameraOpen(false);
                }
              }}
            >
              Take Photo
            </Button>
          </Box>
        </Box>
      )}
      {children}
    </CameraContext.Provider>
  );
}

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (context === undefined) {
    throw new Error("useCamera must be used within a CameraProvider");
  }
  return context;
};