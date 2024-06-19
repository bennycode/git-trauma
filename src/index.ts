import {simpleGit} from 'simple-git';
import {FATAL_LOOSE_OBJECT, fixFatalLooseObject} from './fix/fixFatalLooseObject.js';
import {SQUASH_ALL_COMMITS, squashAllCommits} from './fix/squashAllCommits.js';
import {TRIGGER_EMPTY_COMMIT, triggerEmptyCommit} from './fix/triggerEmptyCommit.js';

export async function gitTrauma(answer: string) {
  const git = simpleGit();

  switch (answer) {
    case FATAL_LOOSE_OBJECT:
      await fixFatalLooseObject(git);
      break;
    case SQUASH_ALL_COMMITS:
      await squashAllCommits(git);
      break;
    case TRIGGER_EMPTY_COMMIT:
      await triggerEmptyCommit(git);
      break;
  }
}
