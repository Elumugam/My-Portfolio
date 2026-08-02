import { portfolioStore, CMS_BUILD_VERSION, DEFAULT_SECTION_ANNOUNCEMENTS, DEFAULT_HERO_TEXT } from "./portfolioStore";

export function runPortfolioStoreTests(): { passed: boolean; log: string[] } {
    const log: string[] = [];
    let passed = true;

    try {
        log.push(`[Test 1] Build Version Verification: ${CMS_BUILD_VERSION}`);
        if (!CMS_BUILD_VERSION) {
            log.push("FAIL: CMS_BUILD_VERSION is undefined.");
            passed = false;
        } else {
            log.push("PASS: CMS_BUILD_VERSION is valid.");
        }

        log.push("[Test 2] Hero Announcement Button & Theme Parity");
        const announcement = portfolioStore.getSectionAnnouncement("hero");
        if (announcement.buttonText !== "LEARN MORE" || announcement.bgColor !== "#ffffff" || announcement.textColor !== "#000000") {
            log.push(`FAIL: Announcement attributes mismatch (${announcement.buttonText}, ${announcement.bgColor}, ${announcement.textColor})`);
            passed = false;
        } else {
            log.push(`PASS: Hero announcement matches Admin settings ('${announcement.buttonText}', bg: ${announcement.bgColor}, text: ${announcement.textColor})`);
        }

        log.push("[Test 3] Hero Text Content Verification");
        const heroText = portfolioStore.getHeroText();
        if (!heroText.name || !heroText.role1) {
            log.push("FAIL: Hero text missing required fields.");
            passed = false;
        } else {
            log.push(`PASS: Hero text loaded cleanly (${heroText.name})`);
        }

        log.push("[Test 4] Single Source of Truth for Hero Transforms");
        const desktopTransform = portfolioStore.getHeroTransform();
        const mobileTransform = portfolioStore.getMobileHeroTransform();
        if (JSON.stringify(desktopTransform) !== JSON.stringify(mobileTransform)) {
            log.push("FAIL: Desktop and Mobile hero transforms diverge.");
            passed = false;
        } else {
            log.push("PASS: Desktop and Mobile hero transforms are identical.");
        }

    } catch (err) {
        log.push(`ERROR: Test execution thrown error: ${err}`);
        passed = false;
    }

    return { passed, log };
}

// Auto-execute if in test runner mode
if (typeof window !== "undefined" && (window as any).__RUN_TESTS__) {
    console.log(runPortfolioStoreTests());
}
