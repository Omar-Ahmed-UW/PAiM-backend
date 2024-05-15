const router = require("express").Router();
const {
    CreateNotionPage: createNotionPage,
} = require("./services/NotionService");
const { GenerateText: generateText } = require("./services/GeminiService");
const {
    FunctionalityUsecasesPrompt: functionalityUsecasesPrompt,
    TechStackPrompt: techStackPrompt,
    ArchDescPrompt: archDescPrompt,
    ArchDiagramPrompt: archDiagramPrompt,
    MilestonesPrompt: milestonesPrompt,
} = require("../prompts");

// ideaName: 'rr',
//   ideaDescription: 're',
//   ideaUsers: '',
//   timeline: { number: '3', unit: 'days' },
//   techStack: []

async function HandleGeneratePage(req, res) {
    console.log("Notion key is", process.env.NOTION_KEY);
    console.log("request is", req.body);

    // generate the functionality and use cases section
    const functionalityUsecaseSection = await generateText(
        functionalityUsecasesPrompt +
            "\nidea description:\n" +
            req.body.ideaDescription +
            "\nusers of this idea:\n" +
            req.body.ideaUsers +
            "\nfeatures of idea:\n" +
            req.body.featuresOfIdea +
            "\nuse cases of idea:\n" +
            req.body.useCasesOfIdea
    );
    console.log("Generated functionality and usecases section");

    // generate the tech stack section
    const techStackSection = await generateText(
        techStackPrompt +
            "\nfunctionality and usecases:\n" +
            functionalityUsecaseSection +
            "\nidea description:\n" +
            req.body.ideaDescription +
            "\nusers of this idea:\n" +
            req.body.ideaUsers +
            "\npreferred techstack:\n" +
            req.body.techStack.join(", ")
    );
    console.log("Generated tech stack section");

    // generate the architecture description section
    const archDescSection = await generateText(
        archDescPrompt +
            "\nidea description:\n" +
            req.body.ideaDescription +
            "\n techstack:\n" +
            techStackSection +
            "\nfunctionality and usecases:\n" +
            functionalityUsecaseSection
    );
    console.log("Generated architecture description section");

    const archDiagramSection = await generateText(
        archDiagramPrompt +
            "\narchitecture description:\n" +
            archDescSection +
            "\nfunctionality and usecases:\n" +
            functionalityUsecaseSection +
            "\n techstack:\n" +
            techStackSection
    );
    console.log("Generated architecture diagram section");

    const milestonesSection = await generateText(
        milestonesPrompt +
            "\nfunctionality and usecases:\n" +
            functionalityUsecaseSection +
            "\n techstack:\n" +
            techStackSection +
            "\narchitecture description:\n" +
            archDescSection +
            "\nproject timeline:\n" +
            req.body.timeline.number +
            " " +
            req.body.timeline.unit
    );

    console.log("Generated milestones section");
    try {
        await createNotionPage(
            req.body.ideaName,
            functionalityUsecaseSection,
            techStackSection,
            archDescSection,
            archDiagramSection,
            "milestonesSection"
        );
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
