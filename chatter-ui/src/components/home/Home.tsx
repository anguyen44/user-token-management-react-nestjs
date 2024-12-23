import { Button } from "@mui/material";
import { useLogout } from "../../hooks/useLogout";
import { onLogout } from "../../utils/logout";

const Home = () => {
  const { logout } = useLogout();

  return (
    <>
      <div>Home</div>
      <Button
        variant="contained"
        onClick={async () => {
          await logout();
          onLogout();
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default Home;
