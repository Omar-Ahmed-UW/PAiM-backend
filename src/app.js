const router = require("express").Router();
const {
    CreateNotionPage: createNotionPage,
} = require("./services/NotionService");

async function HandleGeneratePage(req, res) {
    console.log("Notion key is", process.env.NOTION_KEY);
    console.log("request is", req.body);
    try {
        await createNotionPage();
        res.status(200).send("Page created successfully");
        return;
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while creating the page");
        return;
    }
}

router.post("/GeneratePage", HandleGeneratePage);

module.exports = router;
