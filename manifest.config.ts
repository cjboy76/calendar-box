import { defineManifest } from '@crxjs/vite-plugin'
// @ts-ignore
import packageJson from './package.json'

const { version, name, description, displayName } = packageJson
// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  name: env.mode === 'staging' ? `[INTERNAL] ${name}` : displayName || name,
  description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  // key: 'ekgmcbpgglflmgcfajnglpbcbdccnnje',
  action: {
    default_popup: 'src/popup/index.html',
  },
  background: {
    service_worker: 'src/background/index.ts',
  },
  content_scripts: [
    {
      all_frames: false,
      js: ['src/content-script/index.ts'],
      matches: ['*://*/*'],
      run_at: 'document_end',
    },
  ],
  host_permissions: ['*://*/*'],
  key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwo1YEzGrpQE81PQfLS7qJbYJ+WWcG3k8/0Sqa8lcEh/rHnHsfLlDTumymNmNobvnx4ZBgPXXGr6lo6OiBpHiYdGimoxNAUey/BrRAlv2IeAqqoE+gAZZbtG59Dm10OX1F4qMgqkl3iznuC6u+jpdBeyj7vJQJSF53d1uXV36ePj6Kif/CRtbUyc+wdI8QjOMlfoE0AYVKxlNjRkr6DZEUrcGNJm2JbFp1H5CofzXcXzZxCEv9m6Th0GRMtB5M1H8Fu8LNPn2K4StWSPthy+1UB55JRyt1amoNUQbVDmRBPpkzjECeOg0AAxSZxXqOQJLE/LUanz+yScP7dxjjwxIfQIDAQAB",
  options_page: 'src/options/index.html',
  permissions: ['storage', 'activeTab', 'identity'],
  web_accessible_resources: [
    {
      matches: ['*://*/*'],
      resources: ['src/content-script/index.ts'],
    },
    {
      matches: ['*://*/*'],
      resources: ['src/content-script/iframe/index.html'],
    },
  ],
  "oauth2": {
    "client_id": "875490864345-l9cc8npntim6kn8igq2ihgjt65qcpo5b.apps.googleusercontent.com",
    "scopes": [
      "openid profile email",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/calendar.readonly"
    ]
  },
}))
