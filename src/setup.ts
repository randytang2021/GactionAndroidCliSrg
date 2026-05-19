import * as os from 'os';
import * as path from 'path';
import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as exec from '@actions/exec';
import * as io from '@actions/io';

export async function setupAndroidCmdlineTools(version: string, acceptLicenses: boolean) {
  const osPlat = os.platform();
  const osArch = os.arch();
  
  let platform = '';
  if (osPlat === 'linux') {
    platform = 'linux';
  } else if (osPlat === 'darwin') {
    platform = 'mac';
  } else if (osPlat === 'win32') {
    platform = 'win';
  } else {
    throw new Error(`Unsupported platform: ${osPlat}`);
  }

  const downloadUrl = `https://dl.google.com/android/repository/commandlinetools-${platform}-${version}_latest.zip`;
  core.info(`Downloading Android command line tools from ${downloadUrl}`);

  // Download the archive
  const downloadedPath = await tc.downloadTool(downloadUrl);
  
  // Extract the archive
  let extractedPath = '';
  if (osPlat === 'win32') {
    extractedPath = await tc.extractZip(downloadedPath);
  } else {
    extractedPath = await tc.extractZip(downloadedPath);
  }

  const sdkRoot = path.join(extractedPath, 'android-sdk');
  const cmdlineToolsDir = path.join(sdkRoot, 'cmdline-tools');
  const latestDir = path.join(cmdlineToolsDir, 'latest');

  await io.mkdirP(cmdlineToolsDir);

  // The zip extracts to a folder named `cmdline-tools`.
  // We move it to `<sdkRoot>/cmdline-tools/latest`
  const originalCmdlineToolsDir = path.join(extractedPath, 'cmdline-tools');
  await io.mv(originalCmdlineToolsDir, latestDir);

  core.info(`Android SDK Root configured at: ${sdkRoot}`);

  // Export ANDROID_HOME and ANDROID_SDK_ROOT
  core.exportVariable('ANDROID_HOME', sdkRoot);
  core.exportVariable('ANDROID_SDK_ROOT', sdkRoot);

  // Add bin directory to PATH
  const binPath = path.join(latestDir, 'bin');
  core.addPath(binPath);
  core.info(`Added to PATH: ${binPath}`);

  if (acceptLicenses) {
    core.info('Accepting Android SDK licenses...');
    const sdkmanagerPath = path.join(binPath, 'sdkmanager');
    await exec.exec('bash', ['-c', `yes | "${sdkmanagerPath}" --licenses`]);
    core.info('Android SDK licenses accepted.');
  }

  return sdkRoot;
}
