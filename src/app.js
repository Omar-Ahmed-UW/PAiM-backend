const router = require("express").Router();
const { CreateNotionPage: CreatePage } = require("./services/NotionService");

async function HandleCreatePage(req, res) {
  console.log("Notion key is", process.env.NOTION_KEY);
  try {
    await CreatePage();
    res.status(200).send("Page created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the page");
  }
}

router.get("/", HandleCreatePage);

module.exports = router;
