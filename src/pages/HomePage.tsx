import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Card, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import JarCard from "../components/JarCard";
import APIService from "../services/APIService";
import { JarData } from "../utils/types";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [jars, setJars] = useState<JarData[]>([]);

  useEffect(() => {
    const getAndSetJars = async () => {
      await APIService.getJars(currentUser!, setJars);
    };

    getAndSetJars();
  }, [currentUser]);

  const renderJarCards = () => {
    console.log("render jar cards called");
    console.log(jars);
    if (jars.length === 0) {
      return null;
    }
    return jars.map((jar) => (
      <Grid item xs={4} key={jar.name}>
        <JarCard
          progress={(jar.current_amount / jar.goal_amount) * 100}
          name={jar.name}
          numMembers={Object.keys(jar.members).length}
          commonPurpose={jar.common_purpose}
        />
      </Grid>
    ));
  };

  return (
    <main>
      <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
        {currentUser?.displayName}'s Jars
      </Typography>

      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={4}>
          <JarCard
            progress={30}
            name="The Holy Trinity"
            numMembers={5}
            commonPurpose="Save up for Japan"
          />
        </Grid>
        {renderJarCards()}
        <Grid item xs={4}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <Button
              variant="text"
              sx={{ height: "100%", width: "100%" }}
              onClick={() => navigate("/jars/new")}
            >
              <AddIcon sx={{ color: green[500] }} fontSize="large" />
            </Button>
          </Card>
        </Grid>
      </Grid>
    </main>
  );
}

export default HomePage;
