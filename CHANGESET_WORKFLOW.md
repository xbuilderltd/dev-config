# Changesets Workflow

This project now uses [Changesets](https://github.com/changesets/changesets) for version management and publishing.

## How it works:

1. **Making changes**: When you make changes that should trigger a release, create a changeset:

   ```bash
   pnpm changeset
   ```

   This will prompt you to select the type of change (patch, minor, major) and write a description.

2. **Release Process**:
   - When you push changeset files to main, the GitHub Action will create a "Release PR"
   - This PR will update the version in `package.json` and generate a `CHANGELOG.md`
   - When you merge the Release PR, it will automatically publish to npm

## Commands:

- `pnpm changeset` - Create a new changeset
- `pnpm changeset:version` - Update versions locally (usually done by the Release PR)
- `pnpm changeset:publish` - Publish to npm (usually done by GitHub Actions)

## Example changeset types:

- **patch**: Bug fixes, small improvements
- **minor**: New features, non-breaking changes
- **major**: Breaking changes

## GitHub Secrets Required:

Make sure these secrets are configured in your GitHub repository:

- `NPM_TOKEN` - Your npm access token for publishing
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions
