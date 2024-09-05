import {
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="question" validate={[required()]} label="Title" />
        <SelectInput
          source="type"
          validate={[required()]}
          label="Type"
          choices={[
            { id: "SELECT", name: "SELECT" },
            { id: "ASSIST", name: "ASSIST" },
          ]}
        />
        <NumberInput source="order" validate={[required()]} label="Order" />
        <ReferenceInput source="lessonId" reference="lessons" />
      </SimpleForm>
    </Edit>
  );
};
