import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadImage } from "../lib/uploadImage";
import { supabase } from "../lib/supabase";

export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];

      // Local preview logic
      setPreview(URL.createObjectURL(file));

      // 1. Upload to Supabase Storage
      const publicUrl = await uploadImage(file, "andariegos");

      // 2. Insert into your Postgres Table
      const { error } = await supabase
        .from("Images")
        .insert([{ image_url: publicUrl, description: "Ironman Training" }]);

      if (error) throw error;
      alert("Successfully uploaded!");
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, textAlign: "center", border: "2px dashed #ccc" }}>
      <Typography variant="h6" gutterBottom>
        Upload Photo
      </Typography>

      {preview && (
        <Box
          component="img"
          src={preview}
          sx={{ width: "100%", borderRadius: 2, mb: 2 }}
        />
      )}

      <Button
        component="label"
        variant="contained"
        startIcon={
          uploading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <CloudUploadIcon />
          )
        }
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Select Image"}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
    </Paper>
  );
}
