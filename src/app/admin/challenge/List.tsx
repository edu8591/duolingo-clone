import { units } from "@/db";
import {
  Datagrid,
  List,
  ReferenceField,
  SelectField,
  TextField,
} from "react-admin";

export const ChallengeList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="order" />
        <TextField source="question" />
        <SelectField
          source="type"
          choices={[
            { id: "SELECT", name: "SELECT" },
            { id: "ASSIST", name: "ASSIST" },
          ]}
        />
        <ReferenceField source="lessonId" reference="lessons" />
      </Datagrid>
    </List>
  );
};
