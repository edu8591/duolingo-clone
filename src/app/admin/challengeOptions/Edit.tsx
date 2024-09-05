import {
  BooleanInput,
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

export const OptionsEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="text" validate={[required()]} label="Text" />
        <BooleanInput
          source="correct"
          validate={[required()]}
          label="Correct"
        />
        <ReferenceInput source="challengeId" reference="challenges" />
        <TextInput source="imageSrc" validate={[required()]} label="ImageSrc" />
        <TextInput source="audioSrc" validate={[required()]} label="AudioSrc" />
      </SimpleForm>
    </Edit>
  );
};
