import { startStorybookTask, buildStorybookTask, storybookConfigExists } from './storybookTask';
import {
  task,
  series,
  parallel,
  condition,
  apiExtractorUpdateTask,
  apiExtractorVerifyTask,
  webpackTask,
  tscTask,
  eslintTask,
  jestTask,
  cleanTask
} from 'just-scripts';
import { publishPrepareTask } from './publishPrepareTask';
import { autoProjectRefsTask, autoProjectRefsVerifyTask } from './autoProjectRefsTask';

task('storybook:start', startStorybookTask);
task('storybook:build', buildStorybookTask);

task('webpack', webpackTask());
task('ts', tscTask({ build: 'tsconfig.json' }));
task('eslint', eslintTask());
task('jest', jestTask());
task('jest:snapshots', jestTask({ updateSnapshot: true }));
task('jest:watch', jestTask({ watch: true }));

task(
  'api-extractor:verify',
  apiExtractorVerifyTask({
    fixNewlines: true
  })
);

task(
  'api-extractor:update',
  apiExtractorUpdateTask({
    fixNewlines: true
  })
);

task(
  'clean',
  cleanTask({
    paths: ['lib', 'dist', 'tsconfig.tsbuildinfo']
  })
);

task('publish:prepare', publishPrepareTask);

task('build', parallel('ts', condition('storybook:build', storybookConfigExists)));
task('bundle', series('webpack'));
task('test', series('jest'));
task('test:watch', series('jest:watch'));
task('lint', series('eslint'));
task('start', series('storybook:start'));

task('projrefs', autoProjectRefsTask);
task('projrefs:verify', autoProjectRefsVerifyTask);
