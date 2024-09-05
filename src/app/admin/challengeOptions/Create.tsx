import {
  BooleanInput,
  Create,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const OptionsCreate = () => {
  return (
    <Create>
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
    </Create>
  );
};
