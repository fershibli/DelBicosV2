#!/usr/bin/env node

import { rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const rootDir = process.cwd();
const dirsToDelete = [
  'android/.gradle',
  'android/.kotlin',
  'android/build',
  'android/app/build',
  'android/app/.cxx',
];

for (const relPath of dirsToDelete) {
  const absPath = resolve(rootDir, relPath);
  rmSync(absPath, { recursive: true, force: true });
  console.log(`Removed ${relPath}`);
}

const runnerPath = resolve(rootDir, 'scripts/android/gradlew-runner.mjs');
const cleanResult = spawnSync(process.execPath, [runnerPath, 'clean'], {
  stdio: 'inherit',
  env: process.env,
});

if (cleanResult.error) {
  console.error(cleanResult.error.message);
  process.exit(1);
}

process.exit(cleanResult.status ?? 1);
