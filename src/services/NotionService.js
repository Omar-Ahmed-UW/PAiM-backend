const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_KEY });

async function CreateNotionPage() {
  console.log("this is my notion api key", process.env.NOTION_KEY);
  const response = await notion.pages.create({
    parent: {
      page_id: process.env.NOTION_PAGE_ID,
    },
    properties: {
      title: {
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: "A note from your pals at Notion",
            },
          },
        ],
      },
    },
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "You made this page using the Notion API. Pretty cool, huh? We hope you enjoy building with us.",
              },
            },
          ],
        },
      },
    ],
  });
  console.log(response);
}

module.exports = { CreateNotionPage };
