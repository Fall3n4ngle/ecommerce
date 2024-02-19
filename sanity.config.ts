import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { myStructure } from "./deskStructure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool({
      structure: myStructure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
