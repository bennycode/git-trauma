import {input} from '@inquirer/prompts';
import type {SimpleGit} from 'simple-git';

export async function getBranchName(git: SimpleGit): Promise<string> {
  const branchSummary = await git.branch();
  const currentBranch = branchSummary.branches[branchSummary.current]?.name;

  const answer = await input({
    default: currentBranch ? currentBranch : 'main',
    message: 'Which branch would you like to use?',
  });

  console.log(`Using branch: ${answer}`);
  return answer;
}
