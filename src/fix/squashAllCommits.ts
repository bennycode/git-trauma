import type {SimpleGit} from 'simple-git';
import {getBranchName} from '../inspect/getBranchName.js';
import {input} from '@inquirer/prompts';

export const SQUASH_ALL_COMMITS = 'SQUASH_ALL_COMMITS';

export async function squashAllCommits(git: SimpleGit) {
  const branchName = await getBranchName(git);

  const commitMessage = await input({
    default: 'Initial commit',
    message: 'What should be the squashed commit message?',
  });

  const commitTree = await git.raw(['commit-tree', 'HEAD^{tree}', '-m', commitMessage]);
  const commitHash = commitTree.trim();

  console.log(`Reset to the new commit "${commitHash}"...`);
  await git.reset(['--hard', commitHash]);
  console.log(`Reset to new commit: ${commitHash}`);

  console.log(`Force push to the remote "${branchName}" branch...`);
  await git.push('origin', branchName, ['-f']);
  console.log(`Successfully forced pushed to: origin/${branchName}`);
}
