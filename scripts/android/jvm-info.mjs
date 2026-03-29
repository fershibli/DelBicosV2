#!/usr/bin/env node

import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

function runStep(label, command, args = []) {
  console.log(`\n=== ${label} ===`);
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
  });

  if (result.error) {
    console.error(result.error.message);
    return false;
  }

  return (result.status ?? 1) === 0;
}

console.log('Android/JVM diagnostics');
console.log(`JAVA_HOME=${process.env.JAVA_HOME ?? '(not set)'}`);

const javaOk = runStep('Java version', 'java', ['-version']);
const nodeOk = runStep('Node version', 'node', ['-v']);
const gradleOk = runStep('Gradle wrapper version', process.execPath, [
  resolve(process.cwd(), 'scripts/android/gradlew-runner.mjs'),
  '-version',
]);

if (!javaOk || !nodeOk || !gradleOk) {
  process.exit(1);
}
