const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });

async function CreateNotionPage(
    ideaName,
    functionalitySection,
    techStackSection,
    archDescSection,
    archDiagramSection,
    milestonesSection
) {
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
                            content: `🪄${ideaName}✨`,
                        },
                    },
                ],
            },
        },
        children: [
            {
                //...other keys excluded
                type: "heading_2",
                //...other keys excluded
                heading_2: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Functionality & Use Cases",
                                link: null,
                            },
                        },
                    ],
                    color: "default",
                    is_toggleable: false,
                },
            },
            {
                object: "block",
                type: "paragraph",
                paragraph: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content:
                                    functionalitySection ||
                                    "No functionality provided",
                            },
                        },
                    ],
                },
            },
            {
                //...other keys excluded
                type: "heading_2",
                //...other keys excluded
                heading_2: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Tech Stack",
                                link: null,
                            },
                        },
                    ],
                    color: "default",
                    is_toggleable: false,
                },
            },
            {
                object: "block",
                type: "paragraph",
                paragraph: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content:
                                    techStackSection ||
                                    "No tech stack provided",
                            },
                        },
                    ],
                },
            },
            {
                //...other keys excluded
                type: "heading_2",
                //...other keys excluded
                heading_2: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Architecture Description",
                                link: null,
                            },
                        },
                    ],
                    color: "default",
                    is_toggleable: false,
                },
            },
            {
                object: "block",
                type: "paragraph",
                paragraph: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content:
                                    archDescSection ||
                                    "No description provided",
                            },
                        },
                    ],
                },
            },
            {
                //...other keys excluded
                type: "heading_2",
                //...other keys excluded
                heading_2: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Architecture Diagram",
                                link: null,
                            },
                        },
                    ],
                    color: "default",
                    is_toggleable: false,
                },
            },
            {
                type: "code",
                //...other keys excluded
                code: {
                    caption: [],
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: archDiagramSection || "",
                            },
                        },
                    ],
                    language: "mermaid",
                },
            },
            {
                //...other keys excluded
                type: "heading_2",
                //...other keys excluded
                heading_2: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Milestones",
                                link: null,
                            },
                        },
                    ],
                    color: "default",
                    is_toggleable: false,
                },
            },
            {
                object: "block",
                type: "paragraph",
                paragraph: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content:
                                    milestonesSection ||
                                    "No milestones provided",
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
