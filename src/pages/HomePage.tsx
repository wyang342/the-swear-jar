import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Card, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import JarCard from "../components/JarCard";
import APIService from "../services/APIService";
import { JarModel } from "../models/JarModel";
import {
  useDatabase,
  useDatabaseListData,
  useDatabaseObjectData,
} from "reactfire";
import { equalTo, ref } from "firebase/database";
import { query } from "firebase/database";
import JarCardTest from "../components/JarCardTest";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const database = useDatabase();
  const userJarsRef = ref(database, `users/${currentUser?.uid}/jars`);
  const { status, data: jarIds } = useDatabaseObjectData(userJarsRef);
  // const [jars, setJars] = useState<JarModel[]>([]);
  // const jarRef = ref(database, "jars");
  // const jarsQuery = query(jarRef, equalTo({}));
  // const { status: jarStatus, data: jarData } = useDatabaseListData();

  // const renderJarCards = () => {
  //   console.log("render jar cards called");
  //   console.log(jars);
  //   if (jars.length === 0) {
  //     return null;
  //   }
  //   return jars.map((jar) => (
  //     <Grid item xs={4} key={jar.name}>
  //       <JarCard
  //         progress={(jar.current_amount / jar.goal_amount) * 100}
  //         name={jar.name}
  //         numMembers={Object.keys(jar.members).length}
  //         commonPurpose={jar.common_purpose}
  //       />
  //     </Grid>
  //   ));
  // };

  // if (status === "success") {
  //   console.log(jarIds);

  //   for (const jarId of Object.keys(jarIds)) {
  //     const jarRef = ref(database, `jars/${jarId}`);
  //     const { status: jarStatus, data: jarData } =
  //       useDatabaseObjectData(jarRef);
  //     console.log(jarData);
  //   }
  // }

  const renderJarCards = () => {
    const jarCards = [];

    for (const jarId of Object.keys(jarIds as object)) {
      if (jarId === "NO_ID_FIELD") continue;
      jarCards.push(<JarCardTest jarId={jarId} key={jarId} />);
    }

    return jarCards;
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
        {status === "success" ? renderJarCards() : null}
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
