import "./Home.css";
import { usePhotos } from "../hooks/usePhotos";
import { Box } from "@mui/material";

function Home() {
  const { data: photos, isLoading, isError } = usePhotos();

  if (isLoading) return <div>Loading your Ironman progress...</div>;
  if (isError) return <div>Error fetching photos.</div>;

  return (
    <div className="grid">
      {photos?.map((photo) => (
        <Box
          sx={{
            height: 800,
            width: "100%",
            objectFit: "cover",
          }}
          component="img"
          key={photo.id}
          src={photo.image_url}
          alt={photo.description}
        />
      ))}
    </div>
  );
}

export default Home;
