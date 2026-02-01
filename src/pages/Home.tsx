import "./Home.css";
import { usePhotos } from "../hooks/usePhotos";
import { Box } from "@mui/material";

function Home() {
  const { data: photos, isLoading, isError } = usePhotos();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching photos.</div>;

  return (
    <div className="grid">
      {photos?.map((photo) => (
        <Box
          sx={{
            height: 800,
            width: "80%",
            objectFit: "cover",
            objectPosition: "center",
            paddingBottom: "2rem",
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
