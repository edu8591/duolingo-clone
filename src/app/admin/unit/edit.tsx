import {
  Edit,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

export const UnitEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput
          source="description"
          validate={[required()]}
          label="Description"
        />
        <TextInput source="order" validate={[required()]} label="Order" />
        <ReferenceInput source="courseId" reference="courses" />
      </SimpleForm>
    </Edit>
  );
};
