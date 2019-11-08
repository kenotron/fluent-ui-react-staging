import { task, copyInstructionsTask, copyInstructions } from '@fluentui/scripts';
import path from 'path';

task(
  'build',
  copyInstructionsTask({
    copyInstructions: [
      ...copyInstructions.copyFilesInDirectory('../react/dist', 'dist/fluentui/react'),
      ...copyInstructions.copyFilesInDirectory('../stardust-ui/react-docs/dist', 'dist/stardust-ui/react'),
      ...copyInstructions.copyFilesToDestinationDirectory('index.html', 'dist')
    ]
  })
);
