import {input} from '@inquirer/prompts';
import type {SimpleGit} from 'simple-git';

export async function getRemoteOriginUrl(git: SimpleGit): Promise<string> {
  console.log(`Detecting remote origin...`);
  const remotes = await git.getRemotes(true);
  const origin = remotes.find(remote => remote.name === 'origin');
  if (origin) {
    console.log(`Successfully detected remote origin: ${origin.refs.fetch}`);
    return origin.refs.fetch;
  }
  const answer = await input({
    message:
      "Couldn't detect remote origin url. Please enter it (Example: git@github.com:your-username/your-project.git):",
  });
  console.log(`Using remote origin: ${answer}`);
  return answer;
}
