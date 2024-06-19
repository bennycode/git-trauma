#!/usr/bin/env node

import select from '@inquirer/select';
import {ExitPromptError} from '@inquirer/core';
import {FATAL_LOOSE_OBJECT} from './fix/fixFatalLooseObject.js';
import {SQUASH_ALL_COMMITS} from './fix/squashAllCommits.js';
import {TRIGGER_EMPTY_COMMIT} from './fix/triggerEmptyCommit.js';
import {gitTrauma} from './index.js';

try {
  const answer = await select({
    choices: [
      {
        name: 'Trigger empty commit',
        value: TRIGGER_EMPTY_COMMIT,
      },
      {
        name: 'Fix error "fatal: loose object is corrupt"',
        value: FATAL_LOOSE_OBJECT,
      },
      {
        name: 'Squash all Git commits into one',
        value: SQUASH_ALL_COMMITS,
      },
    ],
    message: 'Which Git trauma would you like to resolve?',
  });
  await gitTrauma(answer);
} catch (error) {
  if (error instanceof ExitPromptError) {
    // Capturing "Ctrl + C" in "Inquirer" prompts
    console.log('Goodbye!');
  } else {
    throw error;
  }
}
