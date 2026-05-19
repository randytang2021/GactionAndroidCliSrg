import * as core from '@actions/core';
import { setupAndroidCmdlineTools } from './setup.js';

async function run() {
  try {
    const version = core.getInput('cmdline-tools-version') || '11076708';
    const acceptLicensesStr = core.getInput('accept-licenses') || 'true';
    const acceptLicenses = acceptLicensesStr.toLowerCase() === 'true';

    await setupAndroidCmdlineTools(version, acceptLicenses);

    core.info('Android Command Line Tools setup successfully.');
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed(`Unknown error: ${error}`);
    }
  }
}

run();
