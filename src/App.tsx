import { useRef, useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState<number>(0);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Helper to convert file to base64 (with data:image prefix)
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result); // Keep full data:image/...;base64,...
        } else {
          reject("Failed to read file");
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Axios upload function (send base64 with data:image prefix)
  const uploadPhoto = async () => {
    if (!photo) return;
    const base64 = await fileToBase64(photo);
    setUploading(true);

    try {
      const response = await axios.post(
        "http://localhost:3030/uploads", // Change to your backend endpoint
        { uri: base64 }, // Send as JSON, now includes data:image prefix
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Upload successful!");
      // Optionally handle response
    } catch (error) {
      console.error("Upload failed:", base64);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-4">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="text-3xl font-bold text-center">Vite + React</h1>
        <div className="text-center">
          <Button
            className="bg-black text-white py-2 px-4 rounded mb-4"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </Button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        {/* Photo Upload Section */}
        <div className="text-center mt-4">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
          <Button
            className="bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleUploadClick}
          >
            Upload Photo
          </Button>
          {preview && (
            <div className="mt-4 flex flex-col items-center">
              <img
                src={preview}
                alt="Preview"
                className="max-w-xs max-h-60 rounded shadow mb-2"
              />
              <Button
                className="bg-green-600 text-white py-2 px-4 rounded"
                onClick={uploadPhoto}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Send to Backend"}
              </Button>
            </div>
          )}
        </div>
        <p className="text-center text-gray-500">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
