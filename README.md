# Setup Android Command Line Tools

A GitHub Action to download, install, and configure the [Android Command Line Tools](https://developer.android.com/studio#command-line-tools-only) without requiring the full Android Studio. 
It sets up `sdkmanager`, `avdmanager`, and other CLI tools, placing them directly in your environment's PATH.

## Features

- **Cross-Platform:** Works seamlessly on Linux, macOS, and Windows runners.
- **Fast:** Only downloads the command line tools zip (typically ~100MB) rather than the entire Android SDK or Studio.
- **Licenses:** Automatically accepts Android SDK licenses out-of-the-box.
- **Configured Environment:** Exports `ANDROID_HOME` and `ANDROID_SDK_ROOT`, and adds `cmdline-tools/latest/bin` to the `PATH`.

## Usage

```yaml
steps:
  - name: Setup Android CLI
    uses: randy/GactionAndroidCliSrg@v1
    with:
      # (Optional) Version of the command line tools to install. Default is '11076708'.
      cmdline-tools-version: '11076708'
      
      # (Optional) Whether to automatically accept all Android SDK licenses. Default is 'true'.
      accept-licenses: 'true'

  - name: Install build tools and platform
    run: |
      sdkmanager "build-tools;34.0.0" "platforms;android-34"
```

## Inputs

| Input | Description | Default |
| --- | --- | --- |
| `cmdline-tools-version` | The version string of the tools to download from Google's repository. | `'11076708'` |
| `accept-licenses` | Automatically run `yes | sdkmanager --licenses` to accept all SDK licenses. | `'true'` |

## Development

1. Install dependencies: `npm install`
2. Make your changes in the `src/` directory.
3. Build the action: `npm run build`
4. Commit the changes, including the `dist/` directory.

## Example Usage

See the [TestGactionAndroidCliSrg](https://github.com/randytang2021/TestGactionAndroidCliSrg) repository for a live example of this action in use.
