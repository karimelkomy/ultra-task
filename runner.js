(async () => {
  const createTestCafe = require("testcafe");
  const testcafe = await createTestCafe();
  const { exec } = require("child_process");
  const args = require("minimist")(process.argv.slice(2));
  const customTest = args.customTest;
  const browser = args.headless
    ? "chrome:headless --window-size=1680,1050"
    : "chrome --window-size=1680,1050";

  try {
    const runner = testcafe
      .createRunner()
      .src(`tests/*.js`)
      .browsers(browser)
      .reporter(["spec", "allure-expanded"])
      .screenshots({
        path: "Screenshots",
        takeOnFails: true,
        pathPattern:
          "${DATE}_${TIME}/${TEST}/${USERAGENT}/${QUARANTINE_ATTEMPT}.png",
      })
      .video("Videos", {
        singleFile: false,
        failedOnly: false,
        pathPattern: "${DATE}_${TIME}/${TEST}/${USERAGENT}/${FILE_INDEX}.mp4",
      });

    runner.filter(
      async (testName, fixtureName, fixturePath, testMeta, fixtureMeta) => {
        if (customTest) {
          return testMeta.customTest === customTest;
        } else {
          return true;
        }
      }
    );

    await runner.run({
      skipJsErrors: true,
      skipUncaughtErrors: true,
      disableMultipleWindows: true,
      disableDevShmUsage: true,
    });
  } catch (err) {
    console.log("Error:", err);
  } finally {
    await testcafe.close();
  }
})();
