import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import SettingsContent from "./SettingsContent";
import { SettingsHeader } from "./SettingsHeader";

const Settings = () => {
  const rootStore = useContext(RootStoreContext);
  const { setActiveTab } = rootStore.settingsStore;
  return (
    <Grid>
      <Grid.Column width={16}>
        <SettingsHeader />
        <SettingsContent setActiveTab={setActiveTab} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(Settings);
