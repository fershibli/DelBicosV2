#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    'Usage: node scripts/android/gradlew-runner.mjs <gradle-task> [args...]',
  );
  process.exit(1);
}

const androidDir = resolve(process.cwd(), 'android');
const wrapperName = process.platform === 'win32' ? 'gradlew.bat' : 'gradlew';
const wrapperPath = resolve(androidDir, wrapperName);

if (!existsSync(wrapperPath)) {
  console.error(`Gradle wrapper not found at: ${wrapperPath}`);
  process.exit(1);
}

const result = spawnSync(wrapperPath, args, {
  cwd: androidDir,
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: process.env,
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
