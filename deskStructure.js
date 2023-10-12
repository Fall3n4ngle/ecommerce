export const myStructure = (S) =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Showcase Products")
        .child(
          S.document().schemaType("showcaseProducts").documentId("showcaseProducts"),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !["showcaseProducts"].includes(listItem.getId()),
      ),
    ]);
