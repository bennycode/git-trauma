import {confirm} from '@inquirer/prompts';
import path from 'node:path';
import {rimrafSync} from 'rimraf';
import type {SimpleGit} from 'simple-git';
import {getBranchName} from '../inspect/getBranchName.js';
import {getRemoteOriginUrl} from '../inspect/getRemoteOriginUrl.js';

export const FATAL_LOOSE_OBJECT = 'FATAL_LOOSE_OBJECT';

export async function fixFatalLooseObject(git: SimpleGit) {
  const remoteOriginUrl = await getRemoteOriginUrl(git);

  const branchName = await getBranchName(git);

  const gitDir = await git.revparse(['--git-dir']);
  const localGitDirPath = path.resolve(gitDir);

  console.log(`To fix the issue we have to delete "${localGitDirPath}" to later reinitialize it.`);
  const confirmedDeletion = await confirm({default: true, message: 'Continue?'});
  if (!confirmedDeletion) {
    return;
  }
  console.log(`Deleting existing Git directory "${localGitDirPath}"...`);
  rimrafSync('./.git');
  console.log(`Deleted local Git directory: ${localGitDirPath}`);

  console.log('Initializing a new Git repository...');
  await git.init();
  console.log('Initialized a new Git repository.');

  console.log(`Adding remote origin url "${remoteOriginUrl}"...`);
  await git.addRemote('origin', remoteOriginUrl);
  console.log(`Added remote origin url: ${remoteOriginUrl}`);

  console.log('Fetching from remote...');
  await git.fetch();
  console.log('Fetched from remote.');

  const originBranch = `origin/${branchName}`;
  console.log(`Resetting Git repository to "${originBranch}"...`);
  await git.reset(['--mixed', originBranch]);
  console.log(`Reset to: ${originBranch}`);

  // Set upstream branch
  await git.branch([`--set-upstream-to=${originBranch}`, branchName]);
  console.log(`Set upstream branch to: ${originBranch}`);

  console.log('Git setup completed successfully.');
}
