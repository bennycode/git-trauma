import type {SimpleGit} from 'simple-git';
import {getBranchName} from '../inspect/getBranchName.js';
import {input} from '@inquirer/prompts';

export const TRIGGER_EMPTY_COMMIT = 'TRIGGER_EMPTY_COMMIT';

export async function triggerEmptyCommit(git: SimpleGit) {
  const branchName = await getBranchName(git);

  const commitMessage = await input({
    default: 'Trigger commit',
    message: 'What should be the commit message?',
  });
  await git.commit(commitMessage, undefined, {'--allow-empty': null});
  console.log(`Committed with message: ${commitMessage}`);

  console.log(`Pushing to the remote "${branchName}" branch...`);
  await git.push('origin', branchName);
  console.log(`Pushed to: origin/${branchName}`);
}
