import { CommandModule } from 'yargs';

import { log } from '../../utilities';
import { addConnectors, addOfficialConnectors, inquireInstancePath } from './utils';

const add: CommandModule<unknown, { packages: string[]; path?: string; official: boolean }> = {
  command: ['add [packages...]', 'a', 'install', 'i'],
  describe: 'Add specific Logto connectors',
  builder: (yargs) =>
    yargs
      .positional('packages', {
        describe: 'The additional connector package names',
        type: 'string',
        array: true,
        default: [],
      })
      .option('official', {
        alias: 'o',
        type: 'boolean',
        default: false,
        describe:
          'Add all official connectors.\n' +
          "If it's true, the specified package names will be ignored.",
      })
      .option('path', { alias: 'p', type: 'string', describe: 'The path to your Logto instance' }),
  handler: async ({ packages: packageNames, path, official }) => {
    const instancePath = await inquireInstancePath(path);

    if (official) {
      await addOfficialConnectors(instancePath);
    }

    await addConnectors(instancePath, packageNames);

    log.info('Restart your Logto instance to get the changes reflected.');
  },
};

export default add;
