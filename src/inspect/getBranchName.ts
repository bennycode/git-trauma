import {input} from '@inquirer/prompts';
import type {SimpleGit} from 'simple-git';

async function getCurrentBranchName(git: SimpleGit) {
  try {
    const branchSummary = await git.branch();
    const currentBranch = branchSummary.branches[branchSummary.current]?.name;
    return currentBranch ?? 'main';
  } catch {
    // We catch errors because when Git files are corrupt the branch name won't be retrieved successfully
    return 'main';
  }
}

export async function getBranchName(git: SimpleGit): Promise<string> {
  console.log(`Detecting current branch name...`);
  const currentBranch = await getCurrentBranchName(git);

  const answer = await input({
    default: currentBranch,
    message: 'Which branch would you like to use?',
  });

  console.log(`Using branch: ${answer}`);
  return answer;
}
