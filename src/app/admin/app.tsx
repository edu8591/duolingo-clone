"use client";
import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseList } from "./course/List";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";
import { UnitList } from "./unit/List";
import { UnitCreate } from "./unit/Create";
import { UnitEdit } from "./unit/edit";
import { LessonList } from "./lesson/List";
import { LessonCreate } from "./lesson/Create";
import { LessonEdit } from "./lesson/Edit";
import { ChallengeList } from "./challenge/List";
import { ChallengeCreate } from "./challenge/Create";
import { ChallengeEdit } from "./challenge/Edit";
import { OptionsList } from "./challengeOptions/List";
import { OptionsCreate } from "./challengeOptions/Create";
import { OptionsEdit } from "./challengeOptions/Edit";

const dataProvider = simpleRestProvider("/api");

export default function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        recordRepresentation="title"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
      />
      <Resource
        name="units"
        recordRepresentation="title"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
      />
      <Resource
        name="lessons"
        recordRepresentation="title"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
      />
      <Resource
        name="challenges"
        recordRepresentation="question"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
      />
      <Resource
        options={{ label: "Challenge Options" }}
        name="challengeOptions"
        recordRepresentation="title"
        list={OptionsList}
        create={OptionsCreate}
        edit={OptionsEdit}
      />
    </Admin>
  );
}
