import {
  Create,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const ChallengeCreate = () => {
  return (
    <Create>
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
    </Create>
  );
};

//  <TextField source="id" />
//         <TextField source="order" />
//         <TextField source="question" />
//         <TextField source="type" />
//         {/* <TextField source="courseId" /> */}
//         <ReferenceField source="lessonId" reference="lessons" />
