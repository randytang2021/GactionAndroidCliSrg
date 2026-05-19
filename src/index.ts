import * as core from '@actions/core';
import { setupAndroidCmdlineTools } from './setup';

async function run() {
  try {
    const version = core.getInput('cmdline-tools-version') || '11076708';
    const acceptLicensesStr = core.getInput('accept-licenses') || 'true';
    const acceptLicenses = acceptLicensesStr.toLowerCase() === 'true';

    const sdkRoot = await setupAndroidCmdlineTools(version, acceptLicenses);

    core.info('Android Command Line Tools setup successfully.');

    await core.summary
      .addHeading('Android CLI Setup Completed 🚀')
      .addTable([
        [{data: 'Component', header: true}, {data: 'Details', header: true}],
        ['SDK Root Path', sdkRoot],
        ['Tools Version', version],
        ['Licenses Accepted', acceptLicenses ? 'Yes' : 'No']
      ])
      .write();
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed(`Unknown error: ${error}`);
    }
  }
}

run();
